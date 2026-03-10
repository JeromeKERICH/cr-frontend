import { CalendarCheck, MessageCircle, FileText, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function OurProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const sectionRef = useRef(null);

  const steps = [
    {
      title: "Book a Consultation",
      description: "Schedule a consultation with one of our experienced lawyers through our online platform.",
      icon: <CalendarCheck size={28} />,
      color: "#00124E",
      bgImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      pattern: "linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.75) 100%)"
    },
    {
      title: "Discuss Your Legal Needs",
      description: "Our legal team evaluates your situation and provides clear legal guidance.",
      icon: <MessageCircle size={28} />,
      color: "#00124E",
      bgImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      pattern: "linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.75) 100%)"
    },
    {
      title: "Receive Legal Solutions",
      description: "We draft contracts, provide legal documents, or represent you based on your needs.",
      icon: <FileText size={28} />,
      color: "#00124E",
      bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      pattern: "linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.75) 100%)"
    },
    {
      title: "Ongoing Legal Support",
      description: "Stay protected with our retainer plans and continuous legal advisory services.",
      icon: <ShieldCheck size={28} />,
      color: "#00124E",
      bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      pattern: "linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.75) 100%)"
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
      className="py-5 md:text-10 relative overflow-hidden"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20">
          <ShieldCheck size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-20 left-20">
          <CalendarCheck size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 left-40">
          <MessageCircle size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-40 right-40">
          <FileText size={60} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
            Our Process
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
            A straightforward approach to legal excellence
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                group relative rounded-lg overflow-hidden
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                hover:-translate-y-1 hover:shadow-lg
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                minHeight: '280px'
              }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={step.bgImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ 
                    background: step.pattern,
                    opacity: 0.9
                  }}
                />
              </div>

              {/* Step Number Indicator */}
              <div 
                className="absolute top-4 left-4 text-sm font-medium px-3 py-1 rounded-full z-10"
                style={{ 
                  backgroundColor: 'rgba(202, 157, 82, 0.15)',
                  color: '#CA9D52',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(202, 157, 82, 0.3)'
                }}
              >
                Step {index + 1}
              </div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col items-center text-center z-10">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundColor: 'rgba(202, 157, 82, 0.15)',
                    color: '#CA9D52',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(202, 157, 82, 0.3)'
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3 
                  className="font-semibold text-base mb-2"
                  style={{ color: '#FAFAF8' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-xs leading-relaxed"
                  style={{ 
                    color: '#FAFAF8',
                    opacity: 0.85
                  }}
                >
                  {step.description}
                </p>

                {/* Subtle hover indicator */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-12 transition-all duration-500"
                  style={{ backgroundColor: '#CA9D52' }}
                />
              </div>

              {/* Clean border on hover */}
              <div 
                className="absolute inset-0 border border-transparent group-hover:border-[#CA9D52]/30 rounded-lg transition-all duration-500"
              />
            </div>
          ))}
        </div>

        {/* Subtle bottom note */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs" style={{ color: '#999' }}>
            Transparent • Efficient • Client-focused
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
      `}</style>
    </section>
  );
}