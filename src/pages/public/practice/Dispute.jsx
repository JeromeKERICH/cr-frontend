import { Link } from "react-router-dom";
import {
  Scale,
  Gavel,
  Handshake,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Users,
  Briefcase,
  FileText,
  Mail,
  Phone,
  Calendar,
  Zap,
  TrendingUp,
  BookOpen,
  Star,
  Heart,
  Target,
  Weight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DisputeResolution() {
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
      title: "Commercial Disputes",
      description: "Resolution of business-to-business conflicts and commercial disagreements.",
      icon: <Briefcase size={24} />,
      features: ["Breach of contract", "Partnership disputes", "Shareholder conflicts", "Business torts"]
    },
    {
      title: "Contractual Disputes",
      description: "Expert handling of disputes arising from contractual agreements.",
      icon: <FileText size={24} />,
      features: ["Contract interpretation", "Performance issues", "Termination disputes", "Damages claims"]
    },
    {
      title: "Employment Disputes",
      description: "Representation in workplace conflicts and employment claims.",
      icon: <Users size={24} />,
      features: ["Unfair termination", "Discrimination claims", "Harassment cases", "Wage disputes"]
    },
    {
      title: "Debt Recovery",
      description: "Effective strategies for recovering outstanding debts and enforcement.",
      icon: <TrendingUp size={24} />,
      features: ["Debt collection", "Insolvency proceedings", "Asset tracing", "Enforcement actions"]
    },
    {
      title: "Mediation Services",
      description: "Facilitated negotiations to reach mutually acceptable solutions.",
      icon: <Handshake size={24} />,
      features: ["Neutral facilitation", "Settlement agreements", "Confidential process", "Cost-effective"]
    },
    {
      title: "Arbitration",
      description: "Binding dispute resolution outside of court proceedings.",
      icon: <Scale size={24} />,
      features: ["Arbitration clauses", "Tribunal representation", "Award enforcement", "International arbitration"]
    },
    {
      title: "Litigation Support",
      description: "Strong court representation when litigation becomes necessary.",
      icon: <Gavel size={24} />,
      features: ["Court proceedings", "Evidence gathering", "Witness preparation", "Appeals"]
    },
    {
      title: "Negotiation",
      description: "Skilled negotiation to achieve favorable outcomes without court.",
      icon: <Target size={24} />,
      features: ["Settlement negotiations", "Commercial mediation", "Conflict resolution", "Deal facilitation"]
    }
  ];

  const benefits = [
    {
      title: "Cost-Effective",
      description: "We prioritize efficient resolution to minimize legal costs.",
      icon: <Zap size={20} />
    },
    {
      title: "Strategic Approach",
      description: "Tailored strategies based on your specific situation and goals.",
      icon: <Target size={20} />
    },
    {
      title: "Experienced Team",
      description: "Seasoned litigators and negotiators with proven track records.",
      icon: <Award size={20} />
    },
    {
      title: "Client Focus",
      description: "Your interests and objectives guide our approach.",
      icon: <Heart size={20} />
    }
  ];

  const stats = [
    { value: "500+", label: "Cases Handled", icon: Gavel },
    { value: "85%", label: "Settled Before Trial", icon: Handshake },
    { value: "98%", label: "Success Rate", icon: Award },
    { value: "24h", label: "Initial Response", icon: Clock }
  ];

  const resolutionMethods = [
    {
      method: "Negotiation",
      description: "Direct discussions to reach mutually acceptable agreement",
      duration: "2-4 weeks",
      cost: "$",
      icon: <Handshake size={24} />
    },
    {
      method: "Mediation",
      description: "Facilitated negotiation with neutral third party",
      duration: "1-3 months",
      cost: "$$",
      icon: <Weight size={24} />
    },
    {
      method: "Arbitration",
      description: "Binding decision by independent arbitrator",
      duration: "3-6 months",
      cost: "$$$",
      icon: <Scale size={24} />
    },
    {
      method: "Litigation",
      description: "Court proceedings with judge or jury",
      duration: "6-18 months",
      cost: "$$$$",
      icon: <Gavel size={24} />
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
            <Scale size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <Gavel size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 left-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <Handshake size={80} style={{ color: '#CA9D52' }} />
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
                Dispute Resolution
              </h1>
              
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Disputes can arise in business relationships, commercial
                transactions, employment matters, and contractual agreements.
                CR Advocates LLP assists clients in resolving disputes efficiently
                through negotiation, mediation, arbitration, or litigation where
                necessary.
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
                <AlertCircle size={24} style={{ color: '#CA9D52' }} />
                <h3 className="text-2xl font-bold" style={{ color: '#CA9D52' }}>Facing a Legal Dispute?</h3>
              </div>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Get expert guidance on resolving disputes effectively and protecting your rights.
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
                  <span style={{ color: '#FAFAF8' }}>disputes@cradvocates.co.ke</span>
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
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Dispute Resolution Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive dispute resolution tailored to your specific needs
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

      {/* Resolution Methods Comparison */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Our Resolution Methods
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Choose the approach that best suits your situation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {resolutionMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                    <div style={{ color: '#CA9D52' }}>{method.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#00124E' }}>{method.method}</h3>
                <p className="text-sm text-center mb-4" style={{ color: '#666' }}>{method.description}</p>
                <div className="flex justify-between text-xs border-t pt-4" style={{ borderColor: '#E5E5E5' }}>
                  <span style={{ color: '#666' }}>Duration: {method.duration}</span>
                  <span style={{ color: '#CA9D52' }}>Cost: {method.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Approach */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Strategic Approach to Resolving Disputes
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              
              <p className="text-lg mb-6" style={{ color: '#666' }}>
                Our approach focuses on resolving disputes in a practical and
                cost-effective manner. Whenever possible, we seek amicable
                solutions through negotiation or alternative dispute resolution.
                Where litigation is required, our lawyers provide strong
                representation to protect our clients' interests.
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
                <Star size={24} style={{ color: '#CA9D52' }} />
                <p className="text-sm" style={{ color: '#00124E' }}>
                  <strong>85% of our disputes</strong> are resolved through negotiation or mediation, saving clients time and costs.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#00124E' }}>Our Dispute Resolution Process</h3>
              <ul className="space-y-4">
                {[
                  "Initial case assessment and strategy",
                  "Evidence gathering and analysis",
                  "Pre-action correspondence",
                  "Negotiation and settlement attempts",
                  "Alternative dispute resolution",
                  "Litigation if necessary",
                  "Enforcement of judgments"
                ].map((step, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}>
                      {index + 1}
                    </div>
                    <span style={{ color: '#666' }}>{step}</span>
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
            Facing a Legal Dispute?
          </h2>
          <p className="text-l md:text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Consult our legal team for advice on resolving disputes effectively and protecting your rights.
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