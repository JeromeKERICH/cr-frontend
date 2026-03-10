import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Scale, Gavel, ArrowRight, Shield } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Modern Legal Solutions",
      highlight: "For Businesses & Individuals",
      description: "Access legal consultations, contracts, and ongoing legal support through our digital law firm platform."
    },
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Expert Legal Counsel",
      highlight: "At Your Fingertips",
      description: "Connect with experienced lawyers specializing in corporate, family, property, and employment law."
    },
    {
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Digital Legal Marketplace",
      highlight: "Documents & Templates",
      description: "Browse our extensive collection of legal documents, contracts, and templates for all your needs."
    }
  ];

  useEffect(() => {
    // Intersection Observer for animations
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

  useEffect(() => {
    // Auto-rotate slides
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen max-h-[800px] min-h-[600px] flex items-center overflow-hidden"
      style={{ 
        backgroundColor: '#00124E',
      }}
    >
      {/* Background Slides with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 8s ease-out, opacity 1s ease-in-out'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 18, 78, 0.95) 0%, rgba(202, 157, 82, 0.4) 100%)'
            }}
          />
        </div>
      ))}

      {/* Animated Legal Icons */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 animate-pulse">
          <Scale size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce" style={{ animationDuration: '3s' }}>
          <Gavel size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 right-40 animate-pulse" style={{ animationDuration: '4s' }}>
          <Shield size={50} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl">
          {/* Slide Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-12' : 'w-4'
                }`}
                style={{ 
                  backgroundColor: currentSlide === index ? '#CA9D52' : 'rgba(250, 250, 248, 0.3)'
                }}
              />
            ))}
          </div>

          {/* Title with Animation */}
          <h1 
            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ color: '#FAFAF8' }}
          >
            {slides[currentSlide].title}<br />
            <span style={{ color: '#CA9D52' }}>{slides[currentSlide].highlight}</span>
          </h1>

          {/* Description with Animation */}
          <p 
            className={`text-lg md:text-xl mb-8 max-w-xl transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ color: '#FAFAF8', opacity: 0.9 }}
          >
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons with Animation */}
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-400 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link
              to="/book"
              className="group relative px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            </Link>

            <Link
              to="/products"
              className="group relative px-8 py-4 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ 
                border: '2px solid #CA9D52',
                color: '#FAFAF8'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Marketplace
                <Gavel size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: 'rgba(202, 157, 82, 0.2)' }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      

      {/* Slide Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
              currentSlide === index ? 'w-12' : ''
            }`}
            style={{ 
              backgroundColor: currentSlide === index ? '#CA9D52' : 'rgba(250, 250, 248, 0.3)',
              width: currentSlide === index ? '48px' : '12px'
            }}
          />
        ))}
      </div>
    </section>
  );
}