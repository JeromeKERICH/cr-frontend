import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { 
  Briefcase, 
  Scale, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Users,
  Gavel,
  ArrowRight,
  Star,
  Sparkles,
  ChevronRight,
  Calendar
} from "lucide-react";

export default function PracticeAreas() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const areas = [
    {
      title: "Corporate Law",
      icon: <Building2 size={32} />,
      description: "Legal advisory and structuring for startups and established companies.",
      features: ["Business Formation", "Mergers & Acquisitions", "Regulatory Compliance"],
      color: "#00124E",
      link: "/practice-areas/corporate-law"
    },
    {
      title: "Contract Drafting",
      icon: <FileText size={32} />,
      description: "Professional drafting of agreements, NDAs, and commercial contracts.",
      features: ["Commercial Contracts", "Service Agreements", "NDAs & MOUs"],
      color: "#00124E",
      link: "/practice-areas/contract-drafting"
    },
    {
      title: "Intellectual Property",
      icon: <ShieldCheck size={32} />,
      description: "Protection of trademarks, copyrights, and other intellectual assets.",
      features: ["Trademark Registration", "Copyright Protection", "IP Licensing"],
      color: "#00124E",
      link: "/practice-areas/intellectual-property"
    },
    {
      title: "Employment Law",
      icon: <Users size={32} />,
      description: "Employment contracts, workplace policies, and dispute resolution.",
      features: ["Employment Contracts", "HR Policies", "Dispute Resolution"],
      color: "#00124E",
      link: "/practice-areas/employment-law"
    },
    {
      title: "Business Advisory",
      icon: <Briefcase size={32} />,
      description: "Strategic legal guidance for businesses operating across Africa.",
      features: ["Market Entry", "Cross-border Transactions", "Regulatory Advisory"],
      color: "#00124E",
      link: "/practice-areas/business-advisory"
    },
    {
      title: "Dispute Resolution",
      icon: <Scale size={32} />,
      description: "Legal representation and advisory for commercial disputes.",
      features: ["Litigation", "Arbitration", "Mediation"],
      color: "#00124E",
      link: "/practice-areas/dispute-resolution"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate title elements sequentially
          const titleElements = document.querySelectorAll('.animate-title');
          titleElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-in');
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating animation for icons
  useEffect(() => {
    const icons = document.querySelectorAll('.floating-icon');
    icons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-5 md:py-10 relative overflow-hidden"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 floating-icon animate-float-slow">
          <Gavel size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-20 right-20 floating-icon animate-float" style={{ animationDelay: '1s' }}>
          <Scale size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 right-40 floating-icon animate-float-fast" style={{ animationDelay: '2s' }}>
          <Briefcase size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-40 left-40 floating-icon animate-float-slow" style={{ animationDelay: '1.5s' }}>
          <FileText size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-60 left-1/4 floating-icon animate-float" style={{ animationDelay: '2.5s' }}>
          <Building2 size={50} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-60 right-1/4 floating-icon animate-float-fast" style={{ animationDelay: '0.5s' }}>
          <Users size={50} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-particle"
            style={{
              backgroundColor: '#CA9D52',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with Animated Elements */}
        <div 
          className={`text-center mb-5 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-title" style={{ color: '#00124E' }}>
            <span className="inline-block animate-slide-in-left">Our</span>{' '}
            <span className="inline-block animate-slide-in-right" style={{ color: '#CA9D52' }}>Practice Areas</span>
          </h2>
          
          <div className="w-20 h-1 mx-auto rounded-full animate-expand-width" style={{ backgroundColor: '#CA9D52' }}></div>
          
          <p className="text-lg mt-6 max-w-2xl mx-auto animate-fade-in-up" style={{ color: '#666', animationDelay: '0.3s' }}>
            We provide specialized legal services for businesses and individuals
            across multiple areas of law.
          </p>
        </div>

        {/* Practice Cards with Hover Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {areas.map((area, index) => (
            <Link
              key={index}
              to={area.link}
              className={`
                group relative bg-white rounded-xl overflow-hidden
                transition-all duration-700 transform 
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                hover:-translate-y-2 hover:shadow-2xl
                cursor-pointer
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                animation: isVisible ? `fadeInUp 0.7s ease-out ${index * 0.1}s both` : 'none',
                textDecoration: 'none'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(202, 157, 82, 0.1), transparent 70%)'
                }}
              />

              {/* Top Accent Border with Shine Effect */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: '#CA9D52' }}
              >
                <div className="absolute inset-0 animate-shine"></div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: '#CA9D52' }}></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: '#CA9D52' }}></div>

              {/* Card Content */}
              <div className="p-8 relative z-10">
                {/* Icon with Advanced Animations */}
                <div 
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center mb-6
                    transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-3
                    ${hoveredCard === index ? 'animate-icon-bounce' : ''}
                  `}
                  style={{ 
                    backgroundColor: 'rgba(202, 157, 82, 0.1)',
                    color: '#CA9D52',
                    animation: hoveredCard === index ? 'iconPulse 1s ease-in-out infinite' : 'none'
                  }}
                >
                  <div className="animate-icon-float">
                    {area.icon}
                  </div>
                </div>

                {/* Title with Hover Effect */}
                <h3 
                  className="text-xl font-semibold mb-3 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: '#00124E' }}
                >
                  {area.title}
                </h3>

                {/* Description with Fade */}
                <p className="text-sm mb-4 transition-all duration-300 group-hover:text-gray-700" style={{ color: '#666' }}>
                  {area.description}
                </p>

                {/* Features List with Staggered Animation on Hover */}
                <ul className="space-y-2 mb-6">
                  {area.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center gap-2 text-sm transition-all duration-300"
                      style={{ 
                        transform: hoveredCard === index ? `translateX(${idx * 5}px)` : 'translateX(0)',
                        transitionDelay: hoveredCard === index ? `${idx * 50}ms` : '0ms'
                      }}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                        style={{ backgroundColor: '#CA9D52' }}
                      ></div>
                      <span style={{ color: '#666' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3" style={{ color: '#00124E' }}>
                  <span>Learn More</span>
                  <ArrowRight 
                    size={16} 
                    style={{ color: '#CA9D52' }}
                    className="transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12"
                  />
                </div>
              </div>

              {/* Bottom Gradient with Pulse Effect */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"
                style={{ 
                  background: 'linear-gradient(90deg, #CA9D52 0%, #00124E 100%)'
                }}
              />
            </Link>
          ))}
        </div>

        {/* CTA Section with Advanced Animations */}
        <div 
          className={`text-center mt-20 transition-all duration-1000 delay-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-lg mb-6 animate-float-slow" style={{ color: '#666' }}>
            Need legal assistance? <span className="animate-pulse-slow" style={{ color: '#CA9D52' }}>Our expert team</span> is ready to help.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
              style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
            >
              {/* Animated Background */}
              <div 
                className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                style={{ 
                  background: 'linear-gradient(90deg, #CA9D52, #00124E)',
                  opacity: 0.2
                }}
              />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={18} />
                Book a Consultation
                <ArrowRight 
                  size={18} 
                  className="transition-all duration-300 group-hover:translate-x-2 group-hover:-rotate-12" 
                />
              </span>

              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-lg animate-ping-slow opacity-0 group-hover:opacity-100" style={{ border: '2px solid #CA9D52' }}></div>
            </Link>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
              style={{ 
                border: '2px solid #CA9D52',
                color: '#00124E'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}
              />
            </Link>
          </div>
        </div>
      </div>

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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 80px;
            opacity: 1;
          }
        }
        
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
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
        
        .animate-icon-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-icon-bounce {
          animation: iconBounce 0.5s ease-in-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-expand-width {
          animation: expandWidth 0.7s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .floating-icon {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-in {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
}