import { useEffect, useState } from "react";
import { submitContact } from "../../services/contact.service";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Building2,
  Users,
  Globe,
  Award,
  MessageCircle,
  Calendar
} from "lucide-react";

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Email is invalid";
    if (!form.message.trim()) return "Message is required";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await submitContact(form);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: ["info@cradvocatesllp.com", "support@cradvocatesllp.com"],
      action: "mailto:info@cradvocatesllp.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+254 700 000 000", "+254 711 000 000"],
      action: "tel:+254700000000"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: ["Nairobi, Kenya", "Mon - Fri, 8:00 - 17:00"],
      action: "https://maps.google.com"
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: ["Monday - Friday", "8:00 AM - 5:00 PM"],
      action: null
    }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
    { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
    { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
    { icon: <Youtube size={20} />, href: "https://youtube.com", label: "YouTube", color: "#FF0000" }
  ];

  const stats = [
    { icon: <Users size={24} />, value: "500+", label: "Clients Served" },
    { icon: <Award size={24} />, value: "15+", label: "Years Experience" },
    { icon: <Globe size={24} />, value: "10+", label: "Countries" },
    { icon: <MessageCircle size={24} />, value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-25 lg:py-30 overflow-hidden"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        <div className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.3) 100%)'
          }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 animate-float-slow">
            <Building2 size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <Mail size={100} style={{ color: '#CA9D52' }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
              Get in Touch
            </h1>
            <p className="text-lg mb-2" style={{ color: '#CA9D52' }}>
              We're here to help with all your legal needs
            </p>
          </div>
        </div>
      </section>

      
        

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#00124E' }}>
              Let's Discuss Your Legal Needs
            </h2>
            <p className="text-lg mb-8" style={{ color: '#666' }}>
              Whether you need legal advice, have a question about our services, 
              or want to schedule a consultation, our team is ready to assist you.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                      <div style={{ color: '#CA9D52' }}>{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: '#00124E' }}>{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm" style={{ color: '#666' }}>{detail}</p>
                      ))}
                      {item.action && (
                        <a
                          href={item.action}
                          className="text-sm font-medium mt-2 inline-block hover:underline"
                          style={{ color: '#CA9D52' }}
                        >
                          {item.title === "Email Us" ? "Send Email" : 
                           item.title === "Call Us" ? "Call Now" : 
                           "Get Directions"} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border mb-8" style={{ borderColor: '#E5E5E5' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.242691849717!2d36.821946!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d2b7f1b3c5%3A0x8c9d3d5f5b5e5b5!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#00124E' }}>Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: social.color }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border" style={{ borderColor: '#E5E5E5' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#00124E' }}>
                Send Us a Message
              </h2>
              
              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0' }}>
                  <CheckCircle size={20} style={{ color: '#065F46' }} />
                  <span className="flex-1" style={{ color: '#065F46' }}>Message sent successfully! We'll respond within 24 hours.</span>
                  <button onClick={() => setSuccess(false)}>
                    <X size={20} style={{ color: '#065F46' }} />
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <AlertCircle size={20} style={{ color: '#DC2626' }} />
                  <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
                  <button onClick={() => setError("")}>
                    <X size={20} style={{ color: '#DC2626' }} />
                  </button>
                </div>
              )}

              <form onSubmit={submit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#00124E'
                    }}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#00124E'
                    }}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 700 000 000"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#00124E'
                    }}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#00124E'
                    }}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell us about your legal needs..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#00124E'
                    }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: '#666' }}>
                  By submitting this form, you agree to our privacy policy and consent to being contacted.
                </p>
              </form>
            </div>
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}