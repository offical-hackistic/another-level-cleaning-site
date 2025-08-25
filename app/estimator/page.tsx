"use client";
import { useState } from "react";

const services = [
  { key: "house", label: "House Wash" },
  { key: "windows", label: "Window Cleaning" },
  { key: "roof", label: "Roof Wash" },
  { key: "driveway", label: "Driveway / Concrete" },
  { key: "gutters", label: "Gutters" },
];

export default function EstimatorPage() {
  const [selected, setSelected] = useState("house");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const submit = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const form = new FormData();
      form.append("service", selected);
      files.forEach((f) => form.append("images", f));
      const r = await fetch("/api/estimate", { method: "POST", body: form });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setResult(data);
    } catch (e:any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container section">
      <h1 className="text-4xl font-bold text-hackerBlue mb-4">AI-Powered Estimate</h1>
      <p className="opacity-90 mb-6">Upload a few exterior photos and select a service. Our AI analyzes surface area and complexity to price your clean.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-1">
          <label className="block text-sm mb-2">Service</label>
          <select value={selected} onChange={(e)=>setSelected(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-xl p-3">
            {services.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>

          <label className="block text-sm mt-4 mb-2">Upload Photos (2-6 recommended)</label>
          <input type="file" multiple accept="image/*" onChange={onFiles} className="w-full" />

          <button onClick={submit} disabled={loading || files.length===0} className="btn btn-primary mt-4">
            {loading ? "Analyzing..." : "Get Estimate"}
          </button>
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>

        <div className="card md:col-span-2">
          <h2 className="text-2xl font-bold text-hackerGreen">Result</h2>
          {!result && <p className="opacity-70 mt-2">Your price and breakdown will appear here.</p>}
          {result && (
            <div className="mt-3 space-y-2">
              <p>Estimated Price: <span className="text-hackerGreen font-bold">${result.total.toFixed(2)}</span></p>
              <p className="text-sm opacity-90">Avg. Estimated Area: {Math.round(result.area_sqft)} sqft</p>
              <p className="text-sm opacity-90">Complexity (1-5): {result.complexity.toFixed(1)}</p>
              <div className="text-sm opacity-80">
                <p>Service rate applied: ${result.rate.toFixed(2)}/sqft</p>
                <p>Complexity factor: x{result.complexity_factor.toFixed(2)}</p>
                <p>Photos analyzed: {result.images_analyzed}</p>
              </div>
              <p className="opacity-80">{result.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-6">
        <p className="text-sm opacity-80">
          Estimates are based on visible exterior area and complexity. Final price may vary after on-site confirmation.
          Call <a className="text-hackerGreen" href="tel:18705200650">870-520-0650</a> to lock in a booking.
        </p>
      </div>
    </main>
  );
}
