export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-semibold">Another Level Cleaning Services</p>
        <div className="text-sm opacity-90">
          <p>Phone: <a href="tel:18705200650" className="text-hackerGreen">870-520-0650</a></p>
          <p>Email: <a href="mailto:fosterdustin59022@gmail.com" className="text-hackerGreen">fosterdustin59022@gmail.com</a></p>
          <p>Address: <span className="text-hackerGreen">4804 Antosh Cir, Jonesboro, AR 72404</span></p>
        </div>
        <p className="text-xs opacity-70">© {new Date().getFullYear()} Another Level Cleaning • NE Arkansas</p>
      </div>
    </footer>
  );
}
