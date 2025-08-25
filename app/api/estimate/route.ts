import { NextRequest, NextResponse } from "next/server";
import { SERVICE_RATES_PER_SQFT, MIN_JOB_FEE, COMPLEXITY_MULTIPLIER } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fallback estimation when OpenAI is unavailable
function getFallbackEstimate(service: string, imageCount: number, totalFileSize: number) {
  // Base area estimation based on typical residential properties
  const baseAreaByService = {
    house: 2000,      // Typical house exterior
    windows: 800,     // Window area for average home
    roof: 1500,       // Roof surface area
    driveway: 600,    // Typical driveway size
    gutters: 200      // Linear gutters converted to area
  };

  // Estimate area based on number of images (more images = larger property)
  const areaMultiplier = Math.min(2.0, 0.5 + (imageCount * 0.3));
  const baseArea = baseAreaByService[service as keyof typeof baseAreaByService] || baseAreaByService.house;
  const estimatedArea = Math.round(baseArea * areaMultiplier);

  // Estimate complexity based on file sizes (larger files often mean more detailed photos)
  const avgFileSize = totalFileSize / imageCount;
  let complexity = 2.5; // Default medium complexity
  
  if (avgFileSize > 3 * 1024 * 1024) { // > 3MB suggests high detail
    complexity = 3.5;
  } else if (avgFileSize > 1.5 * 1024 * 1024) { // > 1.5MB suggests medium-high detail
    complexity = 3.0;
  } else if (avgFileSize < 500 * 1024) { // < 500KB suggests simple property
    complexity = 2.0;
  }

  return {
    area_sqft: estimatedArea,
    complexity: Math.min(5, Math.max(1, complexity)),
    notes: "Estimated using property analysis (AI temporarily unavailable)",
    fallback: true
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const service = String(formData.get("service") || "house");
    const images: File[] = formData.getAll("images") as any;

    if (!images || images.length === 0) {
      return NextResponse.json({ error: "No images uploaded" }, { status: 400 });
    }

    // Calculate total file size
    const totalFileSize = images.reduce((sum, file) => sum + file.size, 0);
    let estimateData;
    let usedFallback = false;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    // Try OpenAI first if API key is available
    if (OPENAI_API_KEY) {
      try {
        // Convert images to base64 data URLs
        const dataUrls: string[] = [];
        for (const f of images) {
          const arrayBuffer = await f.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const mime = f.type || "image/jpeg";
          dataUrls.push(`data:${mime};base64,${base64}`);
        }

        const systemPrompt = `You are an estimator for an exterior cleaning company in Jonesboro, Arkansas.
Analyze residential/exterior property photos and output a conservative, *numeric* estimate of:
- VISIBLE exterior surface area in square feet (house siding/windows/roof or concrete depending on service)
- Complexity score from 1 (very simple) to 5 (very complex). Complexity increases with multiple stories, architectural details, obstructions, steep roof pitch, heavy staining, etc.
Return STRICT JSON like: {"area_sqft": <number>, "complexity": <number>, "notes": "<short reason>"}.
If the scene is not a property exterior, use best judgment from visible context.`;

        const userPrompt = `Service type: ${service}.
From ALL provided images, estimate total *cleanable* area in square feet visible (do not overestimate) and a complexity 1-5.
Keep JSON short. Do not include anything else.`;

        const messages: any[] = [
          { role: "system", content: systemPrompt },
          { role: "user", content: [
            { type: "text", text: userPrompt },
            ...dataUrls.map((u) => ({ type: "image_url", image_url: { url: u } }))
          ] }
        ];

        const body = {
          model: "gpt-4o-mini", 
          messages,
          temperature: 0.2,
          response_format: { type: "json_object" }
        };

        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify(body)
        });

        if (r.ok) {
          const out = await r.json();
          const content = out.choices?.[0]?.message?.content || "{}";
          let parsed: any = {};
          try { 
            parsed = JSON.parse(content); 
          } catch { 
            parsed = {}; 
          }

          estimateData = {
            area_sqft: Math.max(0, Number(parsed.area_sqft || 0)),
            complexity: Math.min(5, Math.max(1, Number(parsed.complexity || 2.5))),
            notes: String(parsed.notes || "AI-analyzed from uploaded photos"),
            fallback: false
          };
        } else {
          // OpenAI failed, use fallback
          throw new Error("OpenAI API error");
        }
      } catch (openaiError) {
        console.log("OpenAI unavailable, using fallback estimation:", openaiError);
        estimateData = getFallbackEstimate(service, images.length, totalFileSize);
        usedFallback = true;
      }
    } else {
      // No API key, use fallback
      console.log("No OpenAI API key, using fallback estimation");
      estimateData = getFallbackEstimate(service, images.length, totalFileSize);
      usedFallback = true;
    }

    const { area_sqft, complexity, notes } = estimateData;
    
    const rate = SERVICE_RATES_PER_SQFT[service] ?? 0.15;
    const complexity_factor = COMPLEXITY_MULTIPLIER(complexity);
    const subtotal = Math.max(MIN_JOB_FEE, area_sqft * rate * complexity_factor);
    const total = Math.round(subtotal * 100) / 100;

    return NextResponse.json({
      service, 
      area_sqft, 
      complexity, 
      rate, 
      complexity_factor,
      total, 
      notes: usedFallback ? `${notes} (Demo mode)` : notes,
      images_analyzed: images.length,
      estimation_method: usedFallback ? "fallback" : "ai"
    });
  } catch (e: any) {
    console.error("API Error:", e);
    return NextResponse.json({ 
      error: "Estimation failed", 
      message: "Please try again or contact support if the issue persists"
    }, { status: 500 });
  }
}
