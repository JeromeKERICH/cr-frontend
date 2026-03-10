import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { subscribe } from "../../services/subscription.service";
import {
  CheckCircle,
  XCircle,
  Crown,
  Star,
  Shield,
  Clock,
  Users,
  FileText,
  Briefcase,
  Calendar,
  CreditCard,
  Zap,
  AlertCircle,
  Info,
  ChevronRight,
  TrendingUp,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Scale,
  Gavel,
  BookOpen,
} from "lucide-react";

export default function Retainers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const plans = [
    {
      name: "Micro Enterprise",
      plan: "micro",
      price: 25000,
      annualPrice: 270000,
      description: "Perfect for startups and small businesses",
      features: [
        { name: "Basic Legal Documents", included: true },
        { name: "Contract Templates", included: true },
        { name: "Email Support", included: true },
        { name: "Document Review", included: false },
        { name: "Legal Consultation", included: false, hours: 0 },
        { name: "Priority Support", included: false },
        { name: "Custom Contracts", included: false },
        { name: "Dedicated Lawyer", included: false },
      ],
      color: "#00124E",
      icon: Star,
      popular: false,
      savings: 0
    },
    {
      name: "Small Enterprise",
      plan: "small",
      price: 50000,
      annualPrice: 540000,
      description: "Ideal for growing businesses",
      features: [
        { name: "All Micro Features", included: true },
        { name: "Document Review", included: true, limit: "5/month" },
        { name: "Legal Consultation", included: true, hours: 2 },
        { name: "Contract Templates", included: true },
        { name: "Email Support", included: true },
        { name: "Priority Support", included: false },
        { name: "Custom Contracts", included: false },
        { name: "Dedicated Lawyer", included: false },
      ],
      color: "#CA9D52",
      icon: Award,
      popular: true,
      savings: 0
    },
    {
      name: "Medium Enterprise",
      plan: "medium",
      price: 100000,
      annualPrice: 1080000,
      description: "For established companies",
      features: [
        { name: "All Small Features", included: true },
        { name: "Unlimited Document Review", included: true },
        { name: "Legal Consultation", included: true, hours: 5 },
        { name: "Custom Contracts", included: true },
        { name: "Priority Support", included: true },
        { name: "Dedicated Lawyer", included: true },
        { name: "Emergency Consultation", included: true },
        { name: "Court Representation", included: false },
      ],
      color: "#111111",
      icon: Crown,
      popular: false,
      savings: 0
    }
  ];

  const plansWithSavings = plans.map(plan => ({
    ...plan,
    savings: plan.annualPrice ? plan.annualPrice - (plan.price * 12) : 0
  }));

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

  const handleSubscribe = async (plan) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/retainers&plan=${plan.plan}`);
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const subscriptionData = {
        plan: plan.plan,
        billingCycle,
        amount: billingCycle === "monthly" ? plan.price : plan.annualPrice,
        startDate: new Date(),
        autoRenew: true
      };
      
      await subscribe(subscriptionData);
      
      // Show success message
      alert(`Successfully subscribed to ${plan.name} (${billingCycle})`);
      
      // Redirect to dashboard or payment page
      navigate("/dashboard/subscriptions");
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateMonthlyEquivalent = (annualPrice) => {
    return Math.round(annualPrice / 12);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section with Judicial Background */}
      <div 
        className="relative overflow-hidden" 
        style={{ 
          backgroundColor: '#00124E',
          backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 18, 78, 0.85)' }}></div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 animate-float-slow">
            <Scale size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <Gavel size={100} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute top-40 right-40 animate-float-fast" style={{ animationDelay: '2s' }}>
            <BookOpen size={80} style={{ color: '#CA9D52' }} />
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

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-30 relative z-10">
          <div 
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            
            
            <h1 className="text-2xl md:text-5xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
              <span className="inline-block animate-slide-in-left">Legal</span>{' '}
              <span className="inline-block animate-slide-in-right" style={{ color: '#CA9D52' }}>Retainer Plans</span>
            </h1>
            
            <p className="text-l mb-8 animate-fade-in-up" style={{ color: '#CA9D52', animationDelay: '0.3s' }}>
              Choose the perfect legal coverage for your business
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-full animate-fade-in-up" style={{ backgroundColor: 'rgba(250, 250, 248, 0.1)', animationDelay: '0.5s' }}>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  billingCycle === "monthly" ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: billingCycle === "monthly" ? '#CA9D52' : 'transparent',
                  color: billingCycle === "monthly" ? '#00124E' : '#FAFAF8'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annually")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                  billingCycle === "annually" ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: billingCycle === "annually" ? '#CA9D52' : 'transparent',
                  color: billingCycle === "annually" ? '#00124E' : '#FAFAF8'
                }}
              >
                Annually
                <span className="text-xs px-2 py-0.5 rounded-full animate-pulse-slow" style={{ backgroundColor: '#10B981', color: '#FAFAF8' }}>
                  Save 10%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-lg flex items-center gap-3 animate-shake" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
            <AlertCircle size={20} style={{ color: '#DC2626' }} />
            <span style={{ color: '#DC2626' }}>{error}</span>
          </div>
        )}

        {/* Not Authenticated Warning */}
        {!isAuthenticated && (
          <div className="mb-8 p-4 rounded-lg flex items-center justify-between animate-slide-in" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', border: '1px solid #CA9D52' }}>
            <div className="flex items-center gap-3">
              <Info size={20} style={{ color: '#00124E' }} />
              <span style={{ color: '#00124E' }}>Please log in to subscribe to a retainer plan</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
            >
              Log In
            </button>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plansWithSavings.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === "monthly" ? plan.price : plan.annualPrice;
            const isHovered = hoveredPlan === plan.plan;
            
            return (
              <div
                key={plan.plan}
                className={`
                  group relative rounded-xl border-2 transition-all duration-500 cursor-pointer
                  ${plan.popular ? 'scale-105 shadow-xl' : 'hover:scale-102'}
                  ${isHovered ? 'shadow-2xl' : ''}
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                `}
                style={{ 
                  backgroundColor: '#FAFAF8',
                  borderColor: isHovered 
                    ? plan.color 
                    : plan.popular 
                      ? '#CA9D52' 
                      : '#E5E5E5',
                  transform: isHovered ? 'scale(1.03)' : plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transitionDelay: `${index * 150}ms`,
                  animation: isVisible ? `fadeInUp 0.7s ease-out ${index * 0.15}s both` : 'none'
                }}
                onMouseEnter={() => setHoveredPlan(plan.plan)}
                onMouseLeave={() => setHoveredPlan(null)}
                onClick={() => handleSubscribe(plan)}
              >
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at top right, ${plan.color}20, transparent 70%)`
                  }}
                />

                {/* Popular Badge with Animation */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-in">
                    <span className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg" style={{ backgroundColor: '#CA9D52', color: '#00124E' }}>
                    
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-xl" style={{ borderColor: plan.color }}></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-xl" style={{ borderColor: plan.color }}></div>

                {/* Hover Indicator */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-xl border-4 pointer-events-none animate-pulse-slow" style={{ borderColor: plan.color, opacity: 0.3 }}></div>
                )}

                {/* Click Indicator */}
                <div className="absolute top-4 right-4 transition-all duration-500" style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateX(0)' : 'translateX(20px)' }}>
                  <div className="p-2 rounded-full animate-bounce-in" style={{ backgroundColor: plan.color }}>
                    <ArrowRight size={16} style={{ color: '#FAFAF8' }} />
                  </div>
                </div>

                {/* Plan Header */}
                <div className="p-6 text-center border-b relative z-10" style={{ borderColor: '#E5E5E5' }}>
                 
                  
                  <h2 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:scale-105" style={{ color: '#111' }}>{plan.name}</h2>
                  <p className="text-sm mb-4" style={{ color: '#666' }}>{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-bold transition-all duration-300 group-hover:text-[#CA9D52]" style={{ color: '#00124E' }}>
                      {formatCurrency(price)}
                    </span>
                    <span className="text-sm" style={{ color: '#666' }}>
                      /{billingCycle === "monthly" ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingCycle === "annually" && (
                    <div className="space-y-1 animate-fadeIn">
                      <p className="text-sm font-medium animate-pulse-slow" style={{ color: '#10B981' }}>
                        Save {formatCurrency(plan.savings)}/year
                      </p>
                      <p className="text-xs" style={{ color: '#666' }}>
                        {formatCurrency(calculateMonthlyEquivalent(price))}/month equivalent
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="p-6 relative z-10">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2 transition-all duration-300"
                        style={{ 
                          transform: isHovered ? `translateX(${idx * 3}px)` : 'translateX(0)',
                          transitionDelay: isHovered ? `${idx * 50}ms` : '0ms'
                        }}
                      >
                        {feature.included ? (
                          <CheckCircle size={18} style={{ color: '#00124E' }} className="flex-shrink-0 mt-0.5 animate-icon-pop" />
                        ) : (
                          <XCircle size={18} style={{ color: '#DC2626' }} className="flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-sm" style={{ color: feature.included ? '#111' : '#999' }}>
                          {feature.name}
                          {feature.limit && (
                            <span className="ml-1 text-xs px-1.5 py-0.5 rounded animate-pulse-slow" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#00124E' }}>
                              {feature.limit}
                            </span>
                          )}
                          {feature.hours > 0 && (
                            <span className="ml-1 text-xs" style={{ color: '#666' }}>
                              ({feature.hours} hrs)
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with subtle indicator */}
                <div className="p-4 pt-0 text-center relative z-10">
                  <span 
                    className="text-sm font-medium inline-flex items-center gap-1 transition-all duration-300"
                    style={{ 
                      color: isHovered ? plan.color : '#666',
                      transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
                    }}
                  >
                    Click to subscribe
                    <ChevronRight size={14} style={{ 
                      transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.3s'
                    }} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {showComparison ? 'Hide' : 'View'} Plan Comparison
              <ChevronRight size={18} className={`transition-all duration-300 group-hover:translate-x-1 ${showComparison ? 'rotate-90' : ''}`} />
            </span>
            <div 
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: '#CA9D52' }}
            />
          </button>
        </div>

        {/* Plan Comparison Table */}
        {showComparison && (
          <div className="mb-12 animate-slide-in-up">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#111' }}>Plan Comparison</h2>
            <div className="overflow-x-auto rounded-xl border animate-fade-in" style={{ borderColor: '#E5E5E5' }}>
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB' }}>
                    <th className="p-4 text-left" style={{ color: '#111' }}>Features</th>
                    {plansWithSavings.map(plan => (
                      <th key={plan.plan} className="p-4 text-center min-w-[150px]" style={{ color: '#111' }}>
                        <div className="flex items-center justify-center gap-2">
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Basic Legal Documents",
                    "Contract Templates",
                    "Document Review",
                    "Legal Consultation",
                    "Custom Contracts",
                    "Priority Support",
                    "Dedicated Lawyer",
                    "Court Representation"
                  ].map((feature, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition-colors duration-300" style={{ borderColor: '#E5E5E5' }}>
                      <td className="p-4 font-medium" style={{ color: '#111' }}>{feature}</td>
                      {plansWithSavings.map(plan => {
                        const planFeature = plan.features.find(f => 
                          f.name.includes(feature) || feature.includes(f.name.split(' ')[0])
                        );
                        return (
                          <td key={plan.plan} className="p-4 text-center">
                            {planFeature?.included ? (
                              <CheckCircle size={20} className="mx-auto animate-icon-pop" style={{ color: '#00124e' }} />
                            ) : (
                              <XCircle size={20} className="mx-auto" style={{ color: '#DC2626' }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center animate-fade-in-up" style={{ color: '#111' }}>
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Clock,
                question: "When does the plan start?",
                answer: "Your retainer plan begins immediately after successful payment. You'll receive a confirmation email with all the details."
              },
              {
                icon: CreditCard,
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                icon: Users,
                question: "Can multiple team members use it?",
                answer: "Yes, depending on your plan, you can add team members to access legal services. Contact us for enterprise options."
              },
              {
                icon: TrendingUp,
                question: "What if I need more hours?",
                answer: "Additional hours can be purchased at a discounted rate. Contact our support team for custom packages."
              }
            ].map((faq, index) => {
              const Icon = faq.icon;
              return (
                <div 
                  key={index}
                  className="p-6 rounded-xl border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ 
                    borderColor: '#E5E5E5',
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#111' }}>
                    <div className="p-2 rounded-full group-hover:rotate-12 transition-transform" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                      <Icon size={18} style={{ color: '#CA9D52' }} />
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-sm" style={{ color: '#666' }}>{faq.answer}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fade-in-up">
          <p className="text-lg mb-4 animate-pulse-slow" style={{ color: '#666' }}>
            Need a custom plan for your organization?
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="group relative px-8 py-3 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center gap-2"
            style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Sales
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div 
              className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ 
                background: 'linear-gradient(90deg, #CA9D52, #00124E)',
                opacity: 0.2
              }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </div>
          </button>
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes iconPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
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
        
        .animate-icon-pop {
          animation: iconPop 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.7s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}