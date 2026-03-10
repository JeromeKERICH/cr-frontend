import { ShieldCheck, Globe, Laptop, Users, Zap, Lock, Award, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);

  const items = [
    {
      title: "Experienced Legal Professionals",
      icon: <Users size={28} />,
      description: "Our lawyers combine strong legal expertise with practical business insight, ensuring comprehensive legal counsel.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    },
    {
      title: "Digital-First Legal Services",
      icon: <Laptop size={28} />,
      description: "Consult lawyers, access documents, and manage legal matters entirely online through our secure client portal.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    },
    {
      title: "Pan-African Legal Perspective",
      icon: <Globe size={28} />,
      description: "Supporting businesses operating across multiple African markets with deep regional legal knowledge.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    },
    {
      title: "Efficient & Responsive",
      icon: <Zap size={28} />,
      description: "Technology-driven processes ensure faster legal service delivery without compromising on quality.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    },
    {
      title: "Secure Client Portal",
      icon: <Lock size={28} />,
      description: "Clients can securely access documents, track case updates, and communicate with their legal team online.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    },
    {
      title: "Client-Focused Approach",
      icon: <ShieldCheck size={28} />,
      description: "Practical legal advice tailored to your specific needs with a focus on achieving optimal outcomes.",
      color: "#00124E",
      gradient: "linear-gradient(135deg, rgba(0,18,78,0.05) 0%, rgba(202,157,82,0.05) 100%)"
    }
  ];

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

  return (
    <section 
      ref={sectionRef}
      className="py-5 md:py-10 relative overflow-hidden"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20">
          <Award size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-20 left-20">
          <ShieldCheck size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 left-40">
          <Users size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-40 right-40">
          <Globe size={60} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
            Why Choose CR Advocates LLP
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
            We combine legal expertise with modern technology to deliver
            efficient and accessible legal services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                group relative bg-white rounded-lg overflow-hidden
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                hover:-translate-y-1 hover:shadow-lg
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                border: '1px solid #E5E5E5'
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Hover Gradient Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(202,157,82,0.05) 0%, rgba(0,18,78,0.05) 100%)'
                }}
              />

              {/* Corner Accent */}
              <div 
                className="absolute top-0 left-0 w-0 h-0 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, #CA9D52 0%, transparent 100%)',
                  opacity: 0.1
                }}
              />

              <div className="relative p-6">
                {/* Icon */}
                <div 
                  className={`
                    w-14 h-14 rounded-lg flex items-center justify-center mb-4
                    transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-3
                  `}
                  style={{ 
                    backgroundColor: 'rgba(202, 157, 82, 0.1)',
                    color: '#CA9D52'
                  }}
                >
                  <div className={hoveredItem === index ? 'animate-icon-pop' : ''}>
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="font-semibold text-lg mb-2 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: '#00124E' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#666' }}
                >
                  {item.description}
                </p>

                {/* Subtle Hover Indicator */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-12 transition-all duration-500"
                  style={{ backgroundColor: '#CA9D52' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              
              <span className="text-sm" style={{ color: '#666' }}>10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              
              <span className="text-sm" style={{ color: '#666' }}>500+ Clients Served</span>
            </div>
            <div className="flex items-center gap-2">
            
              <span className="text-sm" style={{ color: '#666' }}>98% Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes iconPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-icon-pop {
          animation: iconPop 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
}