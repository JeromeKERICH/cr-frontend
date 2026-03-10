import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Menu,
  X,
  Scale,
  Gavel,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPracticeAreasOpen, setIsPracticeAreasOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { 
      label: "Practice Areas", 
      hasDropdown: true,
      dropdownItems: [
        { path: "/practice-areas/corporate", label: "Corporate Law" },
        { path: "/practice-areas/litigation", label: "Litigation" },
        { path: "/practice-areas/property", label: "Property Law" },
        { path: "/practice-areas/family", label: "Family Law" },
        { path: "/practice-areas/employment", label: "Employment Law" },
        { path: "/practice-areas/intellectual-property", label: "Intellectual Property" },
      ]
    },
    { path: "/products", label: "Marketplace" },
    { path: "/insights", label: "Insights" },
    { path: "/contact", label: "Contact" },
  ];

  const practiceAreas = [
    { path: "/practice-areas/corporate-law", label: "Corporate Law", icon: Briefcase },
    { path: "/practice-areas/business-advisory", label: "Business Advisory", icon: Gavel },
    { path: "/practice-areas/intellectual-property", label: "Property Law", icon: FileText },
    { path: "/practice-areas/employment-law", label: "Employment Law", icon: FileText },
    { path: "/practice-areas/intellectual-property", label: "Intellectual Property", icon: FileText },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsPracticeAreasOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'shadow-lg' : 'shadow-md'}
      `}
      style={{ 
        backgroundColor: '#FAFAF8',
        borderBottom: isScrolled ? '2px solid #CA9D52' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
           
            <div>
              <img src="/assets/logo.jpg" alt="CR Advocates" className="h-10 transition-opacity group-hover:opacity-80" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsPracticeAreasOpen(true)}
                    onMouseLeave={() => setIsPracticeAreasOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-[#CA9D52]"
                      style={{ color: location.pathname.includes('/practice-areas') ? '#CA9D52' : '#00124E' }}
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${isPracticeAreasOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Practice Areas Dropdown */}
                    {isPracticeAreasOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{ 
                          backgroundColor: '#FAFAF8',
                          border: '1px solid #E5E5E5'
                        }}
                      >
                        {practiceAreas.map((area) => {
                          const Icon = area.icon;
                          return (
                            <Link
                              key={area.path}
                              to={area.path}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              style={{ color: '#00124E' }}
                            >
                              <Icon size={16} style={{ color: '#CA9D52' }} />
                              <span className="text-sm">{area.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="py-2 text-sm font-medium transition-colors hover:text-[#CA9D52]"
                  style={{ color: isActive(item.path) ? '#CA9D52' : '#00124E' }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CA9D52' }}>
                    <User size={14} style={{ color: '#00124E' }} />
                  </div>
                  <span className="text-sm">{user?.name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown */}
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ 
                      backgroundColor: '#FAFAF8',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    <Link
                      to={user?.role === 'admin' ? '/admin' : user?.role === 'lawyer' ? '/lawyer' : '/dashboard'}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      style={{ color: '#00124E' }}
                    >
                      <LayoutDashboard size={16} style={{ color: '#CA9D52' }} />
                      <span className="text-sm">Dashboard</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      style={{ color: '#DC2626' }}
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#00124E', color: '#00124E' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ backgroundColor: isMobileMenuOpen ? '#CA9D52' : 'transparent' }}
          >
            {isMobileMenuOpen ? (
              <X size={24} style={{ color: isMobileMenuOpen ? '#00124E' : '#00124E' }} />
            ) : (
              <Menu size={24} style={{ color: '#00124E' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-16 z-40 animate-in slide-in-from-top duration-300"
          style={{ 
            backgroundColor: '#FAFAF8',
            borderTop: '1px solid #E5E5E5'
          }}
        >
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="space-y-2">
                      <button
                        onClick={() => setIsPracticeAreasOpen(!isPracticeAreasOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors"
                        style={{ backgroundColor: isPracticeAreasOpen ? 'rgba(202, 157, 82, 0.1)' : 'transparent' }}
                      >
                        <span style={{ color: '#00124E' }}>{item.label}</span>
                        <ChevronDown size={16} style={{ color: '#CA9D52' }} />
                      </button>
                      
                      {isPracticeAreasOpen && (
                        <div className="pl-4 space-y-1">
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.path}
                              to={area.path}
                              className="block px-4 py-3 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                              style={{ color: '#666' }}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {area.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: isActive(item.path) ? 'rgba(202, 157, 82, 0.1)' : 'transparent',
                      color: isActive(item.path) ? '#CA9D52' : '#00124E'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                    <p className="text-sm font-medium" style={{ color: '#00124E' }}>{user?.name}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{user?.email}</p>
                  </div>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : user?.role === 'lawyer' ? '/lawyer' : '/dashboard'}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
                    style={{ color: '#00124E' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} style={{ color: '#CA9D52' }} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 w-full"
                    style={{ color: '#DC2626' }}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full px-4 py-3 text-center font-medium rounded-lg border transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#00124E', color: '#00124E' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-4 py-3 text-center font-medium rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#666' }}>
                <Phone size={16} style={{ color: '#CA9D52' }} />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#666' }}>
                <Mail size={16} style={{ color: '#CA9D52' }} />
                <span>info@cradvocates.co.ke</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#666' }}>
                <MapPin size={16} style={{ color: '#CA9D52' }} />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .slide-in-from-top {
          animation-name: slide-in-from-top;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
      `}</style>
    </header>
  );
}