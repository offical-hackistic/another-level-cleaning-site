import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <section id="about" className="section">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="card">
            <h2 className="text-3xl font-bold text-hackerBlue mb-2">Clean you can feel.</h2>
            <p className="opacity-90">
              We're a local Jonesboro crew delivering spotless results across Northeast Arkansas.
              Fully insured, detail-obsessed, and customer-first. Try our AI estimator to get
              a fast, realistic price—then book with confidence.
            </p>
            <a href="/estimator" className="btn btn-primary mt-6 w-max">Get AI Estimate</a>
          </div>
          <div className="card">
            <ul className="list-disc pl-6 space-y-2">
              <li>Soft wash & pressure wash experts</li>
              <li>Eco-friendly detergents & safe methods</li>
              <li>Flexible scheduling and reminders</li>
              <li>Transparent pricing with photo review</li>
            </ul>
          </div>
        </div>
      </section>
      <Testimonials />
      <Footer />
    </main>
  );
}
