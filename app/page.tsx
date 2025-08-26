export default function Home() {
  return (
    <main>
      {/* Simple Hero Section */}
      <section className="h-screen bg-darkBg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-hackerBlue mb-4">Another Level Cleaning Services</h1>
          <p className="text-xl text-hackerGreen">Professional Exterior Cleaning Services</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-panel">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-hackerBlue text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-darkBg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-hackerGreen mb-2">House Wash</h3>
              <p className="text-white opacity-90">Low-pressure soft wash that lifts algae and grime without damage.</p>
            </div>
            <div className="bg-darkBg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-hackerGreen mb-2">Window Cleaning</h3>
              <p className="text-white opacity-90">Crystal-clear windows inside & out, frames and tracks included.</p>
            </div>
            <div className="bg-darkBg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-hackerGreen mb-2">Roof Wash</h3>
              <p className="text-white opacity-90">Gentle treatment removes dark streaks and extends shingle life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section className="py-20 bg-darkBg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-hackerBlue text-center mb-8">TRANSPARENT PRICING</h2>
          <div className="text-center mb-12">
            <p className="text-xl text-hackerGreen mb-6">No hidden fees. No surprises. Just honest pricing for quality service.</p>
            <p className="text-lg opacity-90">Get a free instant estimate simply Tap on the GET AI ESTIMATE button, Upload a few photos of the property and your done. Its that easy!</p>
          </div>
          <div className="flex justify-center">
            <a href="/estimator" className="bg-hackerGreen text-black text-2xl px-12 py-6 rounded-lg font-bold hover:brightness-110 transition-all duration-300 shadow-2xl">
              🎯 GET AI ESTIMATE
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-panel">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-hackerBlue text-center mb-12">Don't take our word for it, hear what our customers have to say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-darkBg p-6 rounded-lg">
              <div className="flex mb-2">
                <span className="text-hackerGreen">★★★★★</span>
              </div>
              <p className="opacity-90 mb-3">"Amazing work on our house wash! The team was professional and the results exceeded our expectations."</p>
              <p className="text-hackerBlue font-semibold">- Sarah M.</p>
            </div>
            <div className="bg-darkBg p-6 rounded-lg">
              <div className="flex mb-2">
                <span className="text-hackerGreen">★★��★★</span>
              </div>
              <p className="opacity-90 mb-3">"Fast, reliable service. Our windows have never looked cleaner. Highly recommend!"</p>
              <p className="text-hackerBlue font-semibold">- Mike R.</p>
            </div>
            <div className="bg-darkBg p-6 rounded-lg">
              <div className="flex mb-2">
                <span className="text-hackerGreen">★★★★★</span>
              </div>
              <p className="opacity-90 mb-3">"The AI estimator was spot-on and made scheduling so easy. Great communication throughout."</p>
              <p className="text-hackerBlue font-semibold">- Jennifer L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-darkBg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-hackerBlue text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-panel p-6 rounded-lg">
              <h3 className="text-xl font-bold text-hackerGreen mb-2">How accurate is the AI estimate feature?</h3>
              <p className="opacity-90">Our AI estimation tool has 95% accuracy for window counting and provides estimates within 10% of final pricing.</p>
            </div>
            <div className="bg-panel p-6 rounded-lg">
              <h3 className="text-xl font-bold text-hackerGreen mb-2">What areas do you serve?</h3>
              <p className="opacity-90">We serve Jonesboro, Paragould, Blytheville, Newport, and surrounding areas within a 50-mile radius.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
