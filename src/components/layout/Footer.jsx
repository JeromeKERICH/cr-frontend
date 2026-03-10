import { Link } from "react-router-dom";
import {
  Scale,
  Gavel,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Shield,
  Award,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const practiceAreas = [
    { name: "Corporate Law", path: "/practice-areas/corporate" },
    { name: "Litigation", path: "/practice-areas/litigation" },
    { name: "Property Law", path: "/practice-areas/property" },
    { name: "Family Law", path: "/practice-areas/family" },
    { name: "Employment Law", path: "/practice-areas/employment" },
    { name: "Intellectual Property", path: "/practice-areas/intellectual-property" },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Practice Areas", path: "/practice-areas" },
    { name: "Marketplace", path: "/products" },
    { name: "Book Consultation", path: "/book" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CA9D52' }}>
                <Scale size={24} style={{ color: '#00124E' }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#FAFAF8' }}>CR Advocates</h2>
            </div>
            
            <p className="text-sm leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
              Modern legal solutions for businesses and individuals across Africa. 
              Excellence in legal counsel since 2010.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)', color: '#CA9D52' }}>
                <Award size={12} />
                <span>ISO 9001</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)', color: '#CA9D52' }}>
                <Shield size={12} />
                <span>Licensed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#CA9D52' }}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
                    style={{ color: '#FAFAF8', opacity: 0.8, textDecoration: 'none' }}
                  >
                    <ChevronRight size={14} style={{ color: '#CA9D52' }} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#CA9D52' }}>Practice Areas</h3>
            <ul className="space-y-2">
              {practiceAreas.slice(0, 4).map((area) => (
                <li key={area.path}>
                  <Link
                    to={area.path}
                    className="text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
                    style={{ color: '#FAFAF8', opacity: 0.8, textDecoration: 'none' }}
                  >
                    <Gavel size={14} style={{ color: '#CA9D52' }} />
                    {area.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/practice-areas"
                  className="text-sm flex items-center gap-2 mt-2"
                  style={{ color: '#CA9D52' }}
                >
                  View all areas
                  <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#CA9D52' }}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} style={{ color: '#CA9D52', flexShrink: 0, marginTop: '2px' }} />
                <span className="text-sm" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} style={{ color: '#CA9D52', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                  +254 700 000 000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} style={{ color: '#CA9D52', flexShrink: 0 }} />
                <a 
                  href="mailto:info@cradvocatesllp.co.ke"
                  className="text-sm hover:underline"
                  style={{ color: '#FAFAF8', opacity: 0.9 }}
                >
                  info@cradvocatesllp.co.ke
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} style={{ color: '#CA9D52', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                  Mon-Fri: 8:00 AM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social Links */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(202, 157, 82, 0.2)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Newsletter */}
            <div className="flex-1 max-w-md">
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#CA9D52' }}>Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-sm"
                  style={{ 
                    backgroundColor: 'rgba(250, 250, 248, 0.1)',
                    border: '1px solid rgba(202, 157, 82, 0.3)',
                    color: '#FAFAF8',
                    outline: 'none'
                  }}
                />
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)', color: '#CA9D52' }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ backgroundColor: '#00124E', borderTop: '1px solid rgba(202, 157, 82, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p style={{ color: '#FAFAF8', opacity: 0.7 }}>
              © {currentYear} CR Advocates LLP. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {quickLinks.slice(4, 7).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:underline"
                  style={{ color: '#FAFAF8', opacity: 0.7 }}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 hover:underline"
                style={{ color: '#CA9D52' }}
              >
                Back to top
                <ArrowRight size={14} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}