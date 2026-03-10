import { useState } from "react";
import { register as registerApi } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await registerApi(form);
      
      // Show success message and redirect to login
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#FCFCFB' }}
    >
      <div className="w-full max-w-md">
        <div 
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: '#FCFCFB', border: '1px solid #E5E5E5' }}
        >
          {/* Header */}
          <div 
            className="py-6 px-8 text-center"
            style={{ backgroundColor: '#1E1E59' }}
          >
            <h1 className="text-2xl font-bold" style={{ color: '#FCFCFB' }}>
              Create Your Account
            </h1>
            <p className="mt-2" style={{ color: '#CC973C' }}>
              Join our platform today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-8 space-y-6">
            {error && (
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: '#FFF3F3', color: '#D32F2F' }}
              >
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="fullName" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#333' }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  required
                  value={form.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#333' }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  required
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: '#333' }}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  required
                  value={form.password}
                  onChange={handleInputChange}
                />
                <p className="mt-1 text-xs" style={{ color: '#666' }}>
                  Must be at least 8 characters long
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: isLoading ? '#CC973C' : '#CC973C',
                color: '#171538'
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm" style={{ color: '#333' }}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-medium hover:underline"
                  style={{ color: '#1E1E59' }}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: '#666' }}>
            By creating an account, you agree to our{" "}
            <a href="/terms" className="hover:underline" style={{ color: '#1E1E59' }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="hover:underline" style={{ color: '#1E1E59' }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}