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
        <h2 className="text-3xl md:text-4xl font-bold text-hackerBlue mb-6 text-center">What Our Customers Say</h2>
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
