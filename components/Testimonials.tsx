export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Amazing work on our house wash! The team was professional and the results exceeded our expectations.",
      rating: 5
    },
    {
      name: "Mike R.",
      text: "Fast, reliable service. Our windows have never looked cleaner. Highly recommend!",
      rating: 5
    },
    {
      name: "Jennifer L.",
      text: "The AI estimator was spot-on and made scheduling so easy. Great communication throughout.",
      rating: 5
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow mb-12 text-center tracking-tight">
          Don't take our word for it here what our customers have to say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-hackerGreen">★</span>
                ))}
              </div>
              <p className="opacity-90 mb-3">"{testimonial.text}"</p>
              <p className="text-hackerBlue font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
