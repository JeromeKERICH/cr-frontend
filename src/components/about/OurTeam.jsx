import { useEffect, useState, useRef } from "react";
import { getTeam } from "../../services/team.service";
import { Linkedin, Mail, Award, Briefcase, Quote, ChevronRight, Star } from "lucide-react";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    getTeam().then(res => {
      setTeam(res.data);
    });

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
          <Briefcase size={80} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute top-40 left-40">
          <Quote size={60} style={{ color: '#CA9D52' }} />
        </div>
        <div className="absolute bottom-40 right-40">
          <Star size={60} style={{ color: '#CA9D52' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#00124E' }}>
            Meet Our Legal Team
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#CA9D52' }}></div>
          <p className="text-lg mt-6 max-w-2xl mx-auto" style={{ color: '#666' }}>
            Experienced professionals dedicated to providing strategic legal solutions
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <div
              key={member._id}
              className={`
                group relative bg-white rounded-lg overflow-hidden
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                hover:-translate-y-2 hover:shadow-xl
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={() => setHoveredMember(member._id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Top Accent Border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: '#CA9D52' }}
              />

              {/* Member Photo */}
              <div className="relative overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.photo || `https://ui-avatars.com/api/?name=${member.name}&background=00124E&color=CA9D52&size=200`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay with social links */}
                <div 
                  className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,18,78,0.9), rgba(202,157,82,0.8))'
                  }}
                >
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:rotate-12"
                      style={{ backgroundColor: '#FAFAF8' }}
                    >
                      <Mail size={16} style={{ color: '#00124E' }} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-rotate-12"
                      style={{ backgroundColor: '#FAFAF8' }}
                    >
                      <Linkedin size={16} style={{ color: '#00124E' }} />
                    </a>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div className="p-5 text-center relative">
                {/* Experience Badge */}
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ 
                    backgroundColor: '#CA9D52',
                    color: '#00124E',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {getExperience(member.name)}
                </div>

                <h3 className="font-semibold text-lg mb-1 group-hover:text-[#CA9D52] transition-colors" style={{ color: '#00124E' }}>
                  {member.name}
                </h3>
                <p className="text-sm mb-3" style={{ color: '#666' }}>{member.position}</p>
                
                {/* Bio Preview - appears on hover */}
                <div 
                  className="text-xs text-left max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500"
                  style={{ color: '#666' }}
                >
                  <p className="line-clamp-3">{getMemberBio(member.name)}</p>
                </div>

                {/* View Profile Link */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    className="text-xs font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: '#CA9D52' }}
                  >
                    View Profile
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>

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

        {/* Stats Bar */}
        <div 
          className={`mt-16 pt-8 border-t transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ borderColor: '#E5E5E5' }}
        >
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
                
                <span style={{ color: '#666' }}>Combined Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
                
                <span style={{ color: '#666' }}>6 Practice Areas</span>
            </div>
            <div className="flex items-center gap-2">
                
                <span style={{ color: '#666' }}>500+ Cases Handled</span>
            </div>
        </div>
      </div>
        </div>
    </section>
  );
}