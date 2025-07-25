import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    "Astronomy Picture of the Day",
    "Mars Rover Pictures", 
    "Earth Images",
    "Asteroid Tracking",
    "Space Weather"
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center px-6 py-3 glass rounded-xl">
      {/* Vinland Logo */}
      <Link to="/" className="text-xl font-bold tracking-wider hover:text-nebula-teal">
        Vinland
      </Link>

      {/* Navigation */}
      <nav className="flex gap-8 items-center">
        {/* Services Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setServicesOpen(!servicesOpen)}
            className="hover:text-nebula-teal transition-colors"
          >
            Services ▾
          </button>
          
          {servicesOpen && (
            <div className="absolute right-0 mt-2 glass rounded-lg p-3 space-y-2 min-w-48">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={`#service-${index}`}
                  onClick={() => setServicesOpen(false)}
                  className="block hover:text-nebula-teal transition-colors text-sm"
                >
                  {service}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* About Link */}
        <Link to="/about" className="hover:text-nebula-teal transition-colors">
          About
        </Link>
      </nav>
    </header>
  );
}
