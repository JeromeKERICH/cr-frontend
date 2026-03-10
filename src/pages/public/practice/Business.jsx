import { Link } from "react-router-dom";
import {
  Briefcase,
  TrendingUp,
  Shield,
  Scale,
  Building2,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  Award,
  Globe,
  FileText,
  Mail,
  Phone,
  Calendar,
  Zap,
  Target,
  PieChart,
  Rocket,
  Handshake,
  Lightbulb
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function BusinessAdvisory() {
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
      title: "Business Formation",
      description: "Expert guidance on choosing the right legal structure for your business.",
      icon: <Building2 size={24} />,
      features: ["Company registration", "Partnership agreements", "Sole proprietorship", "LLC formation"]
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure your business meets all legal and regulatory requirements.",
      icon: <Shield size={24} />,
      features: ["Licensing & permits", "Industry regulations", "Tax compliance", "Reporting requirements"]
    },
    {
      title: "Corporate Governance",
      description: "Establish robust governance frameworks for sustainable growth.",
      icon: <Users size={24} />,
      features: ["Board advisory", "Shareholder agreements", "Policy development", "Compliance programs"]
    },
    {
      title: "Risk Management",
      description: "Identify and mitigate legal risks in your business operations.",
      icon: <AlertCircle size={24} />,
      features: ["Risk assessments", "Legal audits", "Insurance review", "Crisis management"]
    },
    {
      title: "Commercial Transactions",
      description: "Strategic advice on business deals and commercial agreements.",
      icon: <Handshake size={24} />,
      features: ["Contract negotiation", "M&A advisory", "Joint ventures", "Strategic alliances"]
    },
    {
      title: "Business Expansion",
      description: "Legal support for scaling your business across markets.",
      icon: <Rocket size={24} />,
      features: ["Market entry", "Cross-border expansion", "Franchising", "Distribution networks"]
    },
    {
      title: "Intellectual Property Strategy",
      description: "Protect and monetize your business assets and innovations.",
      icon: <Lightbulb size={24} />,
      features: ["IP portfolio management", "Brand protection", "Technology transfer", "Licensing"]
    },
    {
      title: "Employment Advisory",
      description: "Strategic HR and employment law guidance for growing teams.",
      icon: <Users size={24} />,
      features: ["Employment contracts", "HR policies", "Workplace compliance", "Dispute prevention"]
    }
  ];

  const benefits = [
    {
      title: "Strategic Partnership",
      description: "We work alongside you as trusted advisors, not just legal counsel.",
      icon: <Handshake size={20} />
    },
    {
      title: "Practical Solutions",
      description: "Legal advice that considers your business goals and commercial reality.",
      icon: <Target size={20} />
    },
    {
      title: "Risk Mitigation",
      description: "Proactive identification and management of legal risks.",
      icon: <Shield size={20} />
    },
    {
      title: "Growth Focused",
      description: "Legal strategies designed to support sustainable business growth.",
      icon: <TrendingUp size={20} />
    }
  ];

  const stats = [
    { value: "300+", label: "Business Clients", icon: Building2 },
    { value: "98%", label: "Client Retention", icon: Users },
    { value: "15+", label: "Industry Sectors", icon: Globe },
    { value: "24h", label: "Response Time", icon: Clock }
  ];

  const businessStages = [
    {
      stage: "Startup",
      description: "Business formation, founder agreements, initial compliance",
      icon: <Rocket size={24} />
    },
    {
      stage: "Growth",
      description: "Contract negotiation, hiring, expansion strategies",
      icon: <TrendingUp size={24} />
    },
    {
      stage: "Established",
      description: "Governance, M&A, risk management, succession planning",
      icon: <Briefcase size={24} />
    },
    {
      stage: "Enterprise",
      description: "Complex transactions, multi-jurisdictional compliance",
      icon: <Globe size={24} />
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-10 md:py-25 lg:py-30 overflow-hidden"
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
            <Briefcase size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <TrendingUp size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 left-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <Building2 size={80} style={{ color: '#CA9D52' }} />
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
                Business Advisory Services
              </h1>
              
              <p className="text-l md:text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                CR Advocates LLP provides strategic legal advisory services to
                entrepreneurs, startups, and established businesses. Our team
                works closely with clients to ensure their operations remain
                legally compliant while supporting sustainable business growth.
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
                
                <h3 className="text-2xl font-bold" style={{ color: '#CA9D52' }}>Strategic Business Advice</h3>
              </div>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Get the legal guidance you need to make confident business decisions.
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
                to="/retainers"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                style={{ borderColor: '#CA9D52', color: '#FAFAF8' }}
              >
                View Retainer Plans
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
              Our Business Advisory Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive legal solutions tailored to your business needs
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

      {/* Business Lifecycle Section */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Supporting Businesses at Every Stage
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Tailored legal guidance for every phase of your business journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {businessStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                    <div style={{ color: '#CA9D52' }}>{stage.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#00124E' }}>{stage.stage}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Why Choose Our Business Advisory Team
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              
              <p className="text-lg mb-6" style={{ color: '#666' }}>
                Businesses face legal challenges at every stage of growth. Our
                business advisory services help organizations identify risks,
                structure transactions effectively, and make informed decisions
                that support long-term success.
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
                  <strong>Did you know?</strong> Businesses with proactive legal advisors grow 30% faster.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#00124E' }}>Key Business Challenges We Address</h3>
              <ul className="space-y-4">
                {[
                  "Regulatory compliance complexity",
                  "Contract disputes and risks",
                  "Intellectual property protection",
                  "Employment law compliance",
                  "Corporate governance gaps",
                  "Cross-border legal issues"
                ].map((challenge, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={12} style={{ color: '#CA9D52' }} />
                      <span style={{ color: '#666' }}>{challenge}</span>
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
            Need Strategic Legal Guidance?
          </h2>
          <p className="text-l md:text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Our legal team can help you navigate complex business decisions
            and regulatory requirements with confidence.
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
              to="/retainers"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ 
                border: '1px solid #CA9D52',
                color: '#FAFAF8'
              }}
            >
              View Retainer Plans
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