import { NextRequest, NextResponse } from "next/server";
import { SERVICE_RATES_PER_SQFT, MIN_JOB_FEE, COMPLEXITY_MULTIPLIER } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const service = String(formData.get("service") || "house");
    const images: File[] = formData.getAll("images") as any;

    if (!images || images.length === 0) {
      return NextResponse.json({ error: "No images uploaded" }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY on server" }, { status: 500 });
    }

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

    // Call OpenAI API with images
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

    if (!r.ok) {
      const txt = await r.text();
      return NextResponse.json({ error: "AI error", details: txt }, { status: 500 });
    }

    const out = await r.json();
    const content = out.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try { 
      parsed = JSON.parse(content); 
    } catch { 
      parsed = {}; 
    }

    const area_sqft = Math.max(0, Number(parsed.area_sqft || 0));
    const complexity = Math.min(5, Math.max(1, Number(parsed.complexity || 2.5)));
    const notes = String(parsed.notes || "AI-computed from uploaded photos.");

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
      notes, 
      images_analyzed: dataUrls.length
    });
  } catch (e: any) {
    console.error("API Error:", e);
    return NextResponse.json({ error: e.message || "Unexpected error" }, { status: 500 });
  }
}
