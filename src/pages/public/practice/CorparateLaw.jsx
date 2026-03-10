import { Link } from "react-router-dom";
import { 
  Building2, 
  Scale, 
  Briefcase, 
  FileText, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  Award,
  Clock,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CorporateLaw() {
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
      title: "Company Formation",
      description: "Complete business registration and incorporation services across Kenya and East Africa.",
      icon: <Building2 size={24} />,
      features: ["Business registration", "Tax registration", "Licensing assistance"]
    },
    {
      title: "Corporate Governance",
      description: "Advisory on board structures, shareholder relations, and corporate compliance.",
      icon: <Users size={24} />,
      features: ["Board advisory", "Shareholder agreements", "Policy development"]
    },
    {
      title: "Mergers & Acquisitions",
      description: "Strategic guidance through every stage of M&A transactions.",
      icon: <TrendingUp size={24} />,
      features: ["Due diligence", "Transaction structuring", "Integration support"]
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure your business meets all legal and regulatory requirements.",
      icon: <Shield size={24} />,
      features: ["Compliance audits", "Regulatory filings", "Risk management"]
    },
    {
      title: "Commercial Contracts",
      description: "Drafting and reviewing all types of commercial agreements.",
      icon: <FileText size={24} />,
      features: ["Service agreements", "Supply contracts", "NDAs and MOUs"]
    },
    {
      title: "Cross-Border Advisory",
      description: "Legal support for businesses operating across multiple jurisdictions.",
      icon: <Globe size={24} />,
      features: ["Market entry", "International compliance", "Trade regulations"]
    }
  ];

  const stats = [
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "200+", label: "Corporate Clients", icon: Building2 },
    { value: "98%", label: "Success Rate", icon: Award },
    { value: "24/7", label: "Client Support", icon: Calendar }
  ];

  const industries = [
    "Technology & Startups",
    "Financial Services",
    "Manufacturing",
    "Real Estate",
    "Healthcare",
    "Energy & Natural Resources"
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative md:py-30 py-20 overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
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
            <Building2 size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <Scale size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 left-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <Briefcase size={80} style={{ color: '#CA9D52' }} />
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
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#FAFAF8' }}>
                Corporate Law
              </h1>
              
              <p className="text-l md:text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                CR Advocates LLP provides comprehensive corporate legal services
                to startups, SMEs, and established businesses. Our team assists
                clients in navigating complex regulatory environments while
                ensuring their businesses remain compliant and strategically
                positioned for growth.
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
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#CA9D52' }}>Need Legal Assistance?</h3>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Speak with one of our corporate law specialists about your business legal needs.
              </p>
              <div className="space-y-4">
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
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              >
                Book Consultation
                <ArrowRight size={18} />
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
              Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive legal solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}
                >
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00124E' }}>{service.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#666' }}>{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} style={{ color: '#CA9D52' }} />
                      <span style={{ color: '#666' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Industries We Serve
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              <p className="text-lg mb-8" style={{ color: '#666' }}>
                Our corporate law expertise spans across multiple industries, 
                allowing us to provide specialized legal solutions tailored to 
                your sector's unique challenges and opportunities. 
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {industries.map((industry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle size={14} style={{ color: '#CA9D52' }} />
                    <span style={{ color: '#666' }}>{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-lg h-full col-span-2">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern office"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
          
              
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Why Choose Us
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expertise & Experience",
                description: "Our team brings decades of combined experience in corporate law across East Africa.",
                icon: <Award size={32} />
              },
              {
                title: "Client-Focused Approach",
                description: "We take time to understand your business goals and provide practical legal solutions.",
                icon: <Users size={32} />
              },
              {
                title: "Strategic Partnership",
                description: "We don't just advise - we partner with you to drive your business forward.",
                icon: <Briefcase size={32} />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                    <div style={{ color: '#CA9D52' }}>{item.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#00124E' }}>{item.title}</h3>
                <p style={{ color: '#666' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10" style={{ backgroundColor: '#00124E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
            Ready to Work With Us?
          </h2>
          <p className="text-l md:text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Schedule a consultation with our corporate law team to discuss your business legal needs.
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