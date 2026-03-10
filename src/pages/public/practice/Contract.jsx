import { Link } from "react-router-dom";
import {
  FileText,
  Scale,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  Users,
  Briefcase,
  Award,
  PenTool,
  FileCheck,
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  Sparkles
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ContractDrafting() {
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
      title: "Commercial Agreements",
      description: "Drafting and review of all types of commercial contracts for businesses of all sizes.",
      icon: <Briefcase size={24} />,
      features: ["Sales agreements", "Supply contracts", "Distribution agreements"]
    },
    {
      title: "Non-Disclosure Agreements",
      description: "Protect your confidential information with professionally drafted NDAs.",
      icon: <Shield size={24} />,
      features: ["Mutual NDAs", "One-way NDAs", "Employee NDAs"]
    },
    {
      title: "Employment Contracts",
      description: "Clear and compliant employment agreements for your workforce.",
      icon: <Users size={24} />,
      features: ["Employment contracts", "Consultancy agreements", "Independent contractor agreements"]
    },
    {
      title: "Partnership Agreements",
      description: "Formalize business partnerships with comprehensive partnership contracts.",
      icon: <Handshake size={24} />,
      features: ["General partnerships", "Joint ventures", "Strategic alliances"]
    },
    {
      title: "Service Level Agreements",
      description: "Define service standards and expectations with detailed SLAs.",
      icon: <Clock size={24} />,
      features: ["Service standards", "Performance metrics", "Remedies and penalties"]
    },
    {
      title: "Shareholder Agreements",
      description: "Protect shareholder interests with well-structured agreements.",
      icon: <Users size={24} />,
      features: ["Shareholder rights", "Share transfer provisions", "Dispute resolution"]
    },
    {
      title: "Vendor & Supplier Contracts",
      description: "Manage supplier relationships with comprehensive procurement contracts.",
      icon: <FileText size={24} />,
      features: ["Procurement terms", "Quality standards", "Delivery schedules"]
    },
    {
      title: "Contract Review & Audit",
      description: "Expert review of existing contracts to identify risks and opportunities.",
      icon: <Eye size={24} />,
      features: ["Risk assessment", "Compliance review", "Negotiation support"]
    }
  ];

  const benefits = [
    {
      title: "Legal Compliance",
      description: "Ensure your contracts comply with Kenyan and international laws.",
      icon: <Scale size={20} />
    },
    {
      title: "Risk Mitigation",
      description: "Identify and address potential legal risks before they become problems.",
      icon: <Shield size={20} />
    },
    {
      title: "Clarity & Certainty",
      description: "Clear terms that prevent misunderstandings and disputes.",
      icon: <FileCheck size={20} />
    },
    {
      title: "Enforceability",
      description: "Contracts that hold up in court and protect your interests.",
      icon: <Award size={20} />
    }
  ];

  const stats = [
    { value: "500+", label: "Contracts Drafted", icon: FileText },
    { value: "98%", label: "Client Satisfaction", icon: Award },
    { value: "24h", label: "Typical Turnaround", icon: Clock },
    { value: "100%", label: "Confidential", icon: Shield }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative lg:py-30 md:py-25 py-10 overflow-hidden"
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
            <FileText size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <PenTool size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 left-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <Scale size={80} style={{ color: '#CA9D52' }} />
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#FAFAF8' }}>
                Contract Drafting & Review
              </h1>
              
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Contracts are the foundation of business relationships.  
                CR Advocates LLP provides professional contract drafting and
                review services to ensure agreements are legally sound,
                clear, and aligned with your interests.
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
                <Sparkles size={24} style={{ color: '#CA9D52' }} />
                <h3 className="text-2xl font-bold" style={{ color: '#CA9D52' }}>Need a Contract?</h3>
              </div>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Get your contract drafted or reviewed by our experienced legal team.
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
                Browse Templates
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
              Contract Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive contract solutions tailored to your business needs
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

      {/* Why Professional Contract Drafting Matters */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Why Professional Contract Drafting Matters
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              
              <p className="text-lg mb-6" style={{ color: '#666' }}>
                Poorly drafted contracts often lead to disputes, financial
                losses, or unenforceable obligations. Our lawyers ensure that
                your agreements clearly define responsibilities, protect your
                rights, and minimize legal risks.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1">{benefit.icon}</div>
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
                  <strong>Did you know?</strong> Over 60% of business disputes arise from poorly drafted contracts.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#00124E' }}>Common Contract Pitfalls</h3>
              <ul className="space-y-4">
                {[
                  "Vague or ambiguous language",
                  "Missing essential clauses",
                  "Unclear payment terms",
                  "Inadequate dispute resolution",
                  "Non-compliance with laws",
                  "Unenforceable provisions"
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

      {/* Process Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Our Contract Drafting Process
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We discuss your specific contract needs and requirements."
              },
              {
                step: "02",
                title: "Drafting",
                description: "Our lawyers draft a comprehensive contract tailored to your situation."
              },
              {
                step: "03",
                title: "Review",
                description: "You review the draft and provide feedback for revisions."
              },
              {
                step: "04",
                title: "Finalization",
                description: "We deliver the final contract ready for execution."
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div 
                  className="md:w-16 md:h-16 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-l md:text-xl font-bold"
                  style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}
                >
                  {item.step}
                </div>
                {index < 3 && (
                  <div 
                    className="hidden md:block absolute top-8 left-[60%] w-full h-0.5"
                    style={{ backgroundColor: '#E5E5E5' }}
                  />
                )}
                <h3 className="font-semibold mb-2" style={{ color: '#00124E' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10" style={{ backgroundColor: '#00124E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
            Need a Contract Drafted or Reviewed?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Speak with our legal team to ensure your contracts provide
            the protection and clarity your business needs.
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
              Browse Legal Documents
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

// Note: Handshake icon isn't in lucide-react by default, so we'll create a simple one
function Handshake({ size = 24, ...props }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L16 10M4 6L8 10M2 18L6 14M22 18L18 14M12 2L12 6M12 12L12 22M8 8L16 16M16 8L8 16" />
    </svg>
  );
}