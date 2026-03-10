import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Scale, Gavel, ArrowRight, Shield, Users, Briefcase, User2Icon } from "lucide-react";

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  const stats = [
    { value: "2000+", label: "Legal Consultations", icon: Users },
    { value: "100+", label: "Businesses Supported", icon: Briefcase },
    { value: "10+", label: "Practice Areas", icon: Scale },
    { value: "98%", label: "Client Satisfaction", icon: User2Icon }
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-[90vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: '#00124E',
      }}
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isVisible ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 8s ease-out'
        }}
      >
        {/* Enhanced Overlay with Gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.3) 100%)'
          }}
        />
      </div>

      {/* Animated Legal Icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 animate-float-slow">
          <Scale size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Gavel size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 right-40 animate-float-fast" style={{ animationDelay: '2s' }}>
          <Shield size={50} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full animate-particle"
            style={{
              backgroundColor: '#CA9D52',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        {/* Gold Accent Line */}
        <div 
          className={`w-16 h-0.5 mx-auto mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#CA9D52' }}
        />

        {/* Heading */}
        <h1 
          className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ color: '#FAFAF8' }}
        >
          About Us
        </h1>

        {/* Description */}
        <p 
          className={`text-base md:text-lg max-w-2xl mx-auto mb-6 transition-all duration-1000 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ color: '#FAFAF8', opacity: 0.9 }}
        >
          Access legal consultations, purchase professional legal documents,
          and receive ongoing legal support through our digital law firm platform.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-wrap gap-4 justify-center mb-8 transition-all duration-1000 delay-400 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <Link
            to="/book"
            className="group relative px-6 py-3 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl text-sm md:text-base"
            style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div 
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          </Link>

          <Link
            to="/products"
            className="group relative px-6 py-3 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl text-sm md:text-base"
            style={{ 
              border: '1px solid #CA9D52',
              color: '#FAFAF8'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Marketplace
            </span>
            <div 
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: 'rgba(202, 157, 82, 0.15)' }}
            />
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-2 transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div 
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: 'rgba(202, 157, 82, 0.15)' }}
                >
                  <Icon size={16} style={{ color: '#CA9D52' }} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold" style={{ color: '#CA9D52' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: '#FAFAF8', opacity: 0.8 }}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s 1.5s' }}
      >
        <span className="text-[10px] uppercase tracking-wider" style={{ color: '#CA9D52' }}>Scroll</span>
        <div className="w-4 h-6 rounded-full border flex justify-center" style={{ borderColor: '#CA9D52' }}>
          <div 
            className="w-0.5 h-1.5 rounded-full mt-1.5 animate-pulse-slow"
            style={{ backgroundColor: '#CA9D52' }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-60px) rotate(360deg);
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
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
      `}</style>
    </section>
  );
}