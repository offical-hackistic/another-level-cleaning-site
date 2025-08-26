export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center bg-darkBg">
      {/* Simple content without animations or particles */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow mb-6">
          Another Level Cleaning Services
        </h1>

        <p className="text-lg md:text-xl text-hackerGreen mb-8 leading-relaxed">
          Professional Exterior Cleaning Services in Northeast Arkansas. Get instant AI-powered estimates by uploading photos of your property.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#services" className="btn btn-primary">
            Our Services
          </a>

          <a href="/estimator" className="btn btn-outline">
            AI Estimator
          </a>
        </div>
      </div>
    </section>
  );
}
