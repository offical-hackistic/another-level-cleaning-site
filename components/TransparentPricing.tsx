export default function TransparentPricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow mb-8 text-center tracking-tight">TRANSPARENT PRICING</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl md:text-2xl text-hackerGreen mb-6 leading-relaxed">
            No hidden fees. No surprises. Just honest pricing for quality service.
          </p>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Get a free instant estimate simply Tap on the GET AI ESTIMATE button, Upload a few photos of the property and your done. Its that easy!
          </p>
        </div>
        
        {/* Large AI Estimate Button */}
        <div className="flex justify-center">
          <a 
            href="/estimator" 
            className="btn btn-primary text-xl md:text-2xl px-12 py-6 w-full max-w-2xl text-center font-bold hover:brightness-110 transition-all duration-300 shadow-2xl"
          >
            🎯 GET AI ESTIMATE
          </a>
        </div>
      </div>
    </section>
  );
}
