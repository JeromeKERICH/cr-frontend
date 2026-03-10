import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { redirectByRole } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: "", 
    password: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await login(form);
      navigate(redirectByRole(user.role));
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
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
          style={{ 
            backgroundColor: '#FCFCFB', 
            border: '1px solid #E5E5E5' 
          }}
        >
          {/* Header */}
          <div 
            className="py-8 px-8 text-center"
            style={{ backgroundColor: '#1E1E59' }}
          >
            <h1 className="text-3xl font-bold" style={{ color: '#FCFCFB' }}>
              Welcome Back
            </h1>
            <p className="mt-2" style={{ color: '#CC973C' }}>
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-8 space-y-6">
            {error && (
              <div 
                className="p-3 rounded-lg text-sm flex items-center gap-2"
                style={{ 
                  backgroundColor: '#FFF3F3', 
                  color: '#D32F2F',
                  border: '1px solid #FECACA'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
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
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium"
                    style={{ color: '#333' }}
                  >
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm hover:underline"
                    style={{ color: '#1E1E59' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  required
                  value={form.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  style={{ 
                    borderColor: '#1E1E59',
                    color: '#CC973C'
                  }}
                  disabled={isLoading}
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm"
                  style={{ color: '#333' }}
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ 
                backgroundColor: '#CC973C',
                color: '#171538'
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: '#E5E5E5' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-2"
                  style={{ 
                    backgroundColor: '#FCFCFB',
                    color: '#666'
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-2.5 px-4 rounded-lg border flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                style={{ 
                  borderColor: '#E5E5E5',
                  color: '#333'
                }}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="py-2.5 px-4 rounded-lg border flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                style={{ 
                  borderColor: '#E5E5E5',
                  color: '#333'
                }}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span>Twitter</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-sm" style={{ color: '#333' }}>
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-medium hover:underline"
                  style={{ color: '#1E1E59' }}
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: '#666' }}>
            By signing in, you agree to our{" "}
            <Link 
              to="/terms" 
              className="hover:underline"
              style={{ color: '#1E1E59' }}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              to="/privacy" 
              className="hover:underline"
              style={{ color: '#1E1E59' }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}