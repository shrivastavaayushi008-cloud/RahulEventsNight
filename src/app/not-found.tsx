import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gradient-gold mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-gold-gradient text-white font-bold shadow-gold"
        >
          Go to Homepage
        </Link>
        <div className="mt-8">
          <a href="tel:+919709954777" className="text-gold font-semibold hover:underline">
            📞 Call: +91 97099 54777
          </a>
          <br />
          <a
            href="https://wa.me/917979962408"
            target="_blank"
            rel="noreferrer"
            className="text-whatsapp font-semibold hover:underline"
          >
            💬 WhatsApp: +91 79799 62408
          </a>
        </div>
      </div>
    </div>
  );
}
