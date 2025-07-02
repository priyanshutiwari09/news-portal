import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-12 border-t border-zinc-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            <img
              src="/logo.png"
              alt="Last24Hrs Logo"
              className="max-w-[60px] h-auto object-contain"
            />

            <span className="font-bold text-lg">Last24Hrs News</span>
          </div>
          <p className="text-sm leading-relaxed">
            Trusted news source delivering updates 24/7 since 2024.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/advertise" className="hover:underline">
                Advertise
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div>
          <h4 className="text-md font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; 2024 Last24Hrs Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
