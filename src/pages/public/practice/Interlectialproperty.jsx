import { Link } from "react-router-dom";
import {
  Shield,
  Award,
  FileText,
  Scale,
  Globe,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Lock,
  Eye,
  PenTool,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  Zap,
  TrendingUp
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function IntellectualProperty() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Trademark Registration",
      description: "Secure your brand identity with comprehensive trademark protection across Kenya and internationally.",
      icon: <Award size={24} />,
      features: ["Trademark searches", "Registration filing", "Renewal management", "International registration"]
    },
    {
      title: "Copyright Protection",
      description: "Protect your creative works including literary, artistic, and digital content.",
      icon: <BookOpen size={24} />,
      features: ["Copyright registration", "Moral rights protection", "Digital rights management", "Licensing"]
    },
    {
      title: "IP Licensing Agreements",
      description: "Monetize your intellectual property through professionally drafted licensing contracts.",
      icon: <FileText size={24} />,
      features: ["License drafting", "Royalty agreements", "Technology transfer", "Franchise agreements"]
    },
    {
      title: "IP Portfolio Management",
      description: "Strategic management of your intellectual property assets for maximum value.",
      icon: <Briefcase size={24} />,
      features: ["Portfolio audit", "Asset valuation", "Renewal strategies", "Competitive monitoring"]
    },
    {
      title: "Brand Protection",
      description: "Comprehensive strategies to protect your brand from infringement and misuse.",
      icon: <Shield size={24} />,
      features: ["Brand monitoring", "Anti-counterfeiting", "Domain protection", "Social media protection"]
    },
    {
      title: "IP Dispute Resolution",
      description: "Expert representation in IP infringement cases and disputes.",
      icon: <Scale size={24} />,
      features: ["Infringement claims", "Opposition proceedings", "Court representation", "Settlement negotiations"]
    },
    {
      title: "Patent Advisory",
      description: "Guidance on patent protection for inventions and innovations.",
      icon: <Zap size={24} />,
      features: ["Patentability searches", "Patent drafting", "Provisional patents", "International filing"]
    },
    {
      title: "Trade Secrets Protection",
      description: "Safeguard your confidential business information and trade secrets.",
      icon: <Lock size={24} />,
      features: ["Confidentiality agreements", "Security protocols", "Employee training", "Enforcement strategies"]
    }
  ];

  const benefits = [
    {
      title: "Exclusive Rights",
      description: "Prevent others from using your intellectual property without permission.",
      icon: <Shield size={20} />
    },
    {
      title: "Asset Value",
      description: "IP assets can significantly increase your company's valuation.",
      icon: <TrendingUp size={20} />
    },
    {
      title: "Competitive Advantage",
      description: "Secure your market position with protected innovations and brands.",
      icon: <Award size={20} />
    },
    {
      title: "Revenue Generation",
      description: "Monetize your IP through licensing and commercialization.",
      icon: <Globe size={20} />
    }
  ];

  const stats = [
    { value: "1000+", label: "IP Rights Registered", icon: Award },
    { value: "98%", label: "Success Rate", icon: Shield },
    { value: "50+", label: "Countries Covered", icon: Globe },
    { value: "24h", label: "Emergency Response", icon: Clock }
  ];

  const ipTypes = [
    {
      type: "Trademarks",
      description: "Protect brand names, logos, and slogans",
      examples: "Brand names, logos, product names"
    },
    {
      type: "Copyright",
      description: "Protect original creative works",
      examples: "Books, music, software, art"
    },
    {
      type: "Patents",
      description: "Protect inventions and innovations",
      examples: "Products, processes, technologies"
    },
    {
      type: "Trade Secrets",
      description: "Protect confidential business information",
      examples: "Formulas, methods, customer lists"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-10 md:py-25 lg:py-30 overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay with Gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0,18,78,0.95) 0%, rgba(202,157,82,0.4) 100%)'
          }}
        />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 animate-float-slow">
            <Award size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <Shield size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 left-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <FileText size={80} style={{ color: '#CA9D52' }} />
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full animate-particle"
              style={{
                backgroundColor: '#CA9D52',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-0.5" style={{ backgroundColor: '#CA9D52' }}></div>
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#CA9D52' }}>
                  Practice Area
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#FAFAF8' }}>
                Intellectual Property Law
              </h1>
              
              <p className="text-l md:text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Intellectual property is one of the most valuable assets of any
                business or creator. CR Advocates LLP provides legal services
                designed to help individuals and companies protect their ideas,
                brands, and innovations.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold" style={{ color: '#CA9D52' }}>{stat.value}</p>
                      <p className="text-xs" style={{ color: '#FAFAF8', opacity: 0.8 }}>{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Content - CTA Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border" style={{ borderColor: 'rgba(202, 157, 82, 0.3)' }}>
              <div className="flex items-center gap-2 mb-4">
                
                <h3 className="text-2xl font-bold" style={{ color: '#CA9D52' }}>Protect Your IP</h3>
              </div>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Secure your intellectual property rights with our expert legal team.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)' }}>
                    <Phone size={18} style={{ color: '#CA9D52' }} />
                  </div>
                  <span style={{ color: '#FAFAF8' }}>+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)' }}>
                    <Mail size={18} style={{ color: '#CA9D52' }} />
                  </div>
                  <span style={{ color: '#FAFAF8' }}>info@cradvocates.co.ke</span>
                </div>
              </div>
              <Link
                to="/book"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl mb-3"
                style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              >
                Book Consultation
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/products"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                style={{ borderColor: '#CA9D52', color: '#FAFAF8' }}
              >
                Browse IP Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Our Intellectual Property Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive IP protection tailored to your creative and business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`
                  group bg-white rounded-xl p-6 transition-all duration-700 transform
                  hover:-translate-y-2 hover:shadow-xl
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  border: '1px solid #E5E5E5'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}
                >
                  {service.icon}
                </div>
                
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#00124E' }}>{service.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#666' }}>{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle size={12} style={{ color: '#CA9D52' }} />
                      <span style={{ color: '#666' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Gradient Line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ 
                    background: 'linear-gradient(90deg, #CA9D52, #00124E)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of IP Section */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Types of Intellectual Property
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {ipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#00124E' }}>{type.type}</h3>
                <p className="text-sm mb-4" style={{ color: '#666' }}>{type.description}</p>
                <p className="text-xs italic" style={{ color: '#999' }}>{type.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why IP Protection Matters */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Why Intellectual Property Protection Matters
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              
              <p className="text-lg mb-6" style={{ color: '#666' }}>
                Without proper legal protection, businesses risk losing control
                over their brands, creative work, or innovations. Our legal team
                helps clients secure their intellectual property rights and
                develop strategies that safeguard their competitive advantage.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1" style={{ color: '#CA9D52' }}>{benefit.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#00124E' }}>{benefit.title}</h4>
                      <p className="text-xs" style={{ color: '#666' }}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                <AlertCircle size={24} style={{ color: '#CA9D52' }} />
                <p className="text-sm" style={{ color: '#00124E' }}>
                  <strong>Did you know?</strong> Intellectual property accounts for over 80% of most company's value.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#00124E' }}>IP Protection Checklist</h3>
              <ul className="space-y-4">
                {[
                  "Register trademarks for your brand",
                  "Copyright your creative works",
                  "File patents for innovations",
                  "Protect trade secrets with NDAs",
                  "Monitor for infringement",
                  "Renew IP registrations on time"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                     <CheckCircle size={12} style={{ color: '#CA9D52' }} />
                      <span style={{ color: '#666' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10" style={{ backgroundColor: '#00124E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
            Protect Your Intellectual Property
          </h2>
          <p className="text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Speak with our lawyers about securing trademarks, copyrights,
            and other intellectual property rights.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
            >
              Book a Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ 
                border: '1px solid #CA9D52',
                color: '#FAFAF8'
              }}
            >
              Browse IP Documents
            </Link>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-80px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
      `}</style>
    </div>
  );
}