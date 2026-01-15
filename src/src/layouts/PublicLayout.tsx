import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Toppnavigasjon */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">
            VitalityBoost
          </Link>

          <nav className="flex gap-6 text-base">
            <Link to="/" className="hover:underline">
              Hjem
            </Link>
            <Link to="/shop" className="hover:underline">
              Nettbutikk
            </Link>
          </nav>
        </div>
      </header>

      {/* Hovedinnhold */}
      <main className="max-w-5xl mx-auto px-4 py-8 text-lg leading-relaxed">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} VitalityBoost – Sunn aldring, naturlig styrke
        </div>
      </footer>
    </div>
  );
}
