import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  FileText,
  Shield,
  Scale,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  Award,
  UserCheck,
  UserX,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Heart,
  Gavel,
  Handshake
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function EmploymentLaw() {
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
      title: "Employment Contracts",
      description: "Drafting comprehensive employment agreements that protect both employers and employees.",
      icon: <FileText size={24} />,
      features: ["Permanent contracts", "Fixed-term agreements", "Probation periods", "Key terms and conditions"]
    },
    {
      title: "Workplace Policies",
      description: "Development of HR policies and employee handbooks ensuring legal compliance.",
      icon: <BookOpen size={24} />,
      features: ["HR manuals", "Code of conduct", "Leave policies", "Disciplinary procedures"]
    },
    {
      title: "Termination & Disciplinary",
      description: "Guidance on lawful termination procedures and disciplinary processes.",
      icon: <UserX size={24} />,
      features: ["Fair termination", "Disciplinary hearings", "Appeals process", "Exit formalities"]
    },
    {
      title: "Dispute Resolution",
      description: "Representation in employment disputes and labour court proceedings.",
      icon: <Gavel size={24} />,
      features: ["Unfair dismissal", "Discrimination claims", "Wage disputes", "Settlement negotiations"]
    },
    {
      title: "HR Compliance Audits",
      description: "Comprehensive review of your HR practices and employment documentation.",
      icon: <Shield size={24} />,
      features: ["Compliance checks", "Risk assessment", "Policy updates", "Training recommendations"]
    },
    {
      title: "Employee Benefits",
      description: "Advisory on employee compensation, benefits, and incentive schemes.",
      icon: <Heart size={24} />,
      features: ["Compensation structures", "Pension schemes", "Bonus plans", "Health benefits"]
    },
    {
      title: "Workplace Investigations",
      description: "Independent investigations into workplace complaints and grievances.",
      icon: <UserCheck size={24} />,
      features: ["Harassment claims", "Misconduct probes", "Whistleblower complaints", "Investigation reports"]
    },
    {
      title: "Labour Law Advisory",
      description: "Ongoing guidance on labour law compliance and best practices.",
      icon: <Scale size={24} />,
      features: ["Legal updates", "Compliance advice", "Risk management", "Training sessions"]
    }
  ];

  const benefits = [
    {
      title: "Legal Compliance",
      description: "Ensure your employment practices comply with Kenyan labour laws.",
      icon: <Shield size={20} />
    },
    {
      title: "Risk Mitigation",
      description: "Reduce the risk of costly employment disputes and penalties.",
      icon: <AlertCircle size={20} />
    },
    {
      title: "Clear Documentation",
      description: "Properly documented employment relationships prevent misunderstandings.",
      icon: <FileText size={20} />
    },
    {
      title: "Fair Workplace",
      description: "Create a fair and equitable environment for all employees.",
      icon: <Heart size={20} />
    }
  ];

  const stats = [
    { value: "500+", label: "Employment Contracts", icon: FileText },
    { value: "98%", label: "Dispute Resolution Rate", icon: Gavel },
    { value: "200+", label: "Businesses Advised", icon: Briefcase },
    { value: "24h", label: "Emergency Response", icon: Clock }
  ];

  const employerRights = [
    "Right to expect faithful service",
    "Right to terminate for cause",
    "Right to enforce workplace policies",
    "Right to protect confidential information"
  ];

  const employeeRights = [
    "Right to fair remuneration",
    "Right to safe working conditions",
    "Right to join trade unions",
    "Right to fair disciplinary process"
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-10 md:py-25 lg:py-30 overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')",
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
            <Users size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <Briefcase size={100} style={{ color: '#CA9D52' }} />
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
              
              <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#FAFAF8' }}>
                Employment & Labour Law
              </h1>
              
              <p className="text-l md:text-lg mb-8 leading-relaxed" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Employment relationships must be structured carefully to protect
                both employers and employees. CR Advocates LLP provides legal
                guidance to businesses and individuals on employment matters,
                ensuring compliance with labour laws and best practices.
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
                
                <h3 className="text-2xl font-bold" style={{ color: '#CA9D52' }}>Employment Law Advice</h3>
              </div>
              <p className="mb-6" style={{ color: '#FAFAF8', opacity: 0.9 }}>
                Get expert guidance on employment contracts, workplace policies, and labour disputes.
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
                className="w-full inline-flex items-center text-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                style={{ borderColor: '#CA9D52', color: '#FAFAF8' }}
              >
                View Employment Documents
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
              Employment Law Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
            <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
              Comprehensive employment law solutions for employers and employees
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

      {/* Rights Section */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
              Understanding Your Rights
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Employer Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                  <Briefcase size={24} style={{ color: '#CA9D52' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#00124E' }}>Employer Rights</h3>
              </div>
              <ul className="space-y-4">
                {employerRights.map((right, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} style={{ color: '#CA9D52' }} className="flex-shrink-0 mt-0.5" />
                    <span style={{ color: '#666' }}>{right}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employee Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                  <Users size={24} style={{ color: '#CA9D52' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#00124E' }}>Employee Rights</h3>
              </div>
              <ul className="space-y-4">
                {employeeRights.map((right, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} style={{ color: '#CA9D52' }} className="flex-shrink-0 mt-0.5" />
                    <span style={{ color: '#666' }}>{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Employment Law Matters */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#00124E' }}>
                Why Employment Law Matters
              </h2>
              <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#CA9D52' }}></div>
              
              <p className="text-lg mb-6" style={{ color: '#666' }}>
                Failure to comply with labour regulations can expose businesses to
                legal disputes, financial penalties, and reputational damage. Our
                legal team works with employers and employees to ensure employment
                relationships are fair, lawful, and properly documented.
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
                  <strong>Did you know?</strong> Employment tribunals in Kenya handle over 5,000 cases annually.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#00124E' }}>Common Employment Issues</h3>
              <ul className="space-y-4">
                {[
                  "Unfair termination claims",
                  "Discrimination and harassment",
                  "Wage and overtime disputes",
                  "Breach of employment contract",
                  "Non-compliance with labour laws",
                  "Workplace safety violations"
                ].map((issue, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={18} style={{ color: '#CA9D52' }} className="flex-shrink-0 mt-0.5" />
                    <span style={{ color: '#666' }}>{issue}</span>
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
            Need Employment Law Advice?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#FAFAF8', opacity: 0.9 }}>
            Consult our lawyers for guidance on employment contracts,
            workplace policies, and labour disputes.
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
              Browse Employment Documents
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