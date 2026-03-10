import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CreditCard,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  Home
} from "lucide-react";

export default function ClientLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/dashboard/cases", label: "Cases", icon: Briefcase },
    { path: "/dashboard/documents", label: "Documents", icon: FileText },
    { path: "/dashboard/payments", label: "Payments", icon: CreditCard },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#FCFCFB' }}>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#1E1E59', borderColor: '#171538' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#FCFCFB' }}>Client Portal</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell size={20} style={{ color: '#FCFCFB' }} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C', color: '#171538' }}>
              <User size={18} />
            </div>
            <ChevronDown size={16} style={{ color: '#FCFCFB' }} />
          </button>
        </div>
      </header>

      {/* Mobile Profile Menu Dropdown */}
      {isProfileMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 z-50 w-48 rounded-lg shadow-lg" style={{ backgroundColor: '#FCFCFB', border: '1px solid #E5E5E5' }}>
          <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
            <p className="font-semibold" style={{ color: '#333' }}>{user?.name || "User"}</p>
            <p className="text-sm" style={{ color: '#666' }}>{user?.email || "user@example.com"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
            style={{ color: '#D32F2F' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative top-0 left-0 z-40 
        w-64 h-full md:h-auto
        transition-transform duration-300 ease-in-out
        flex flex-col
        border-r
      `} style={{ backgroundColor: '#1E1E59', borderColor: '#171538' }}>
        {/* Sidebar Header */}
        <div className="p-6 border-b" style={{ borderColor: '#171538' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
              <Home size={24} style={{ color: '#171538' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#FCFCFB' }}>Client Portal</h1>
              <p className="text-xs" style={{ color: '#CC973C' }}>Welcome, {user?.name || "Client"}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${active ? 'font-semibold' : 'hover:opacity-90'}
                `}
                style={{
                  backgroundColor: active ? '#CC973C' : 'transparent',
                  color: active ? '#171538' : '#FCFCFB',
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {active && (
                  <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: '#171538' }}></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout - Desktop */}
        <div className="hidden md:block p-4 border-t" style={{ borderColor: '#171538' }}>
          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#171538' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                <User size={20} style={{ color: '#171538' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: '#FCFCFB' }}>{user?.name || "User"}</p>
                <p className="text-xs" style={{ color: '#CC973C' }}>{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <div className="text-xs" style={{ color: '#999' }}>
              Client ID: {user?.id?.slice(-8) || "CL-XXXXXX"}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: '#333' }}>
              {navItems.find(item => isActive(item.path))?.label || "Dashboard"}
            </h1>
            <p className="text-sm mt-1" style={{ color: '#666' }}>
              Welcome back! Here's what's happening with your account.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={22} style={{ color: '#333' }} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="h-8 w-px" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: '#333' }}>{user?.name || "User"}</p>
                <p className="text-xs" style={{ color: '#666' }}>Client Account</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                <User size={20} style={{ color: '#171538' }} />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
          
          {/* Footer */}
          <footer className="mt-8 px-6 py-4 border-t" style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm" style={{ color: '#666' }}>
                © {new Date().getFullYear()} Client Portal. All rights reserved.
              </p>
              <div className="flex gap-6 mt-3 md:mt-0">
                <a href="/privacy" className="text-sm hover:underline" style={{ color: '#1E1E59' }}>Privacy Policy</a>
                <a href="/terms" className="text-sm hover:underline" style={{ color: '#1E1E59' }}>Terms of Service</a>
                <a href="/help" className="text-sm hover:underline" style={{ color: '#1E1E59' }}>Help Center</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}