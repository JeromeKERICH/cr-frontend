import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  Shield,
  BarChart3,
  Search,
  Filter,
  Home,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  User2,
  UserIcon,
  AreaChartIcon,
  Book
} from "lucide-react";

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/clients", label: "Clients", icon: Users },
    { path: "/admin/bookings", label: "Bookings", icon: Calendar },
    { path: "/admin/payments", label: "Payments", icon: CreditCard },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/team", label: "Team", icon: UserIcon},
    { path: "/admin/blog", label: "Blogs", icon: Book},
    { path: "/admin/lawyers", label: "Lawyers", icon: User2 },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const notifications = [
    { id: 1, title: "New client registration", time: "5 min ago", unread: true },
    { id: 2, title: "Payment received", time: "1 hour ago", unread: true },
    { id: 3, title: "Booking scheduled", time: "2 hours ago", unread: false },
    { id: 4, title: "System update completed", time: "1 day ago", unread: false },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#FCFCFB' }}>
      {/* Mobile Header - Sticky */}
      <header 
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b transition-all duration-300"
        style={{ 
          backgroundColor: '#171538', 
          borderColor: '#0F0F23',
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <Shield size={20} style={{ color: '#CC973C' }} />
            <h1 className="text-xl font-bold" style={{ color: '#FCFCFB' }}>Admin Panel</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <Bell size={20} style={{ color: '#FCFCFB' }} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            {/* Notifications Dropdown with smooth animation */}
            {isNotificationsOpen && (
              <div 
                className="absolute right-0 top-12 z-50 w-80 rounded-lg shadow-xl animate-in slide-in-from-top-5 duration-300"
                style={{ backgroundColor: '#FCFCFB', border: '1px solid #E5E5E5' }}
              >
                <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
                  <h3 className="font-semibold" style={{ color: '#333' }}>Notifications</h3>
                  <p className="text-sm" style={{ color: '#666' }}>You have {notifications.filter(n => n.unread).length} unread</p>
                </div>
                <div className="max-h-96 overflow-y-auto smooth-scroll">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b hover:bg-gray-50 transition-all cursor-pointer ${notification.unread ? 'bg-blue-50/50' : ''}`}
                      style={{ borderColor: '#E5E5E5' }}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium" style={{ color: '#333' }}>{notification.title}</p>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-xs mt-1" style={{ color: '#666' }}>{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t" style={{ borderColor: '#E5E5E5' }}>
                  <button className="text-sm font-medium hover:underline transition-all" style={{ color: '#1E1E59' }}>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:rotate-12" style={{ backgroundColor: '#CC973C', color: '#171538' }}>
              <User size={18} />
            </div>
            <ChevronDown size={16} style={{ color: '#FCFCFB' }} />
          </button>
        </div>
      </header>

      {/* Mobile Profile Menu Dropdown */}
      {isProfileMenuOpen && (
        <div 
          className="md:hidden fixed top-16 right-4 z-50 w-48 rounded-lg shadow-lg animate-in slide-in-from-top-5 duration-300"
          style={{ backgroundColor: '#FCFCFB', border: '1px solid #E5E5E5' }}
        >
          <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
            <p className="font-semibold" style={{ color: '#333' }}>{user?.name || "Admin User"}</p>
            <p className="text-sm" style={{ color: '#666' }}>{user?.email || "admin@example.com"}</p>
            <div className="flex items-center gap-1 mt-1">
              <Shield size={12} style={{ color: '#CC973C' }} />
              <span className="text-xs font-medium" style={{ color: '#CC973C' }}>Administrator</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-all hover:pl-4"
            style={{ color: '#D32F2F' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* Sidebar - Desktop & Mobile with collapse feature */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:sticky top-0 left-0 z-40 
        h-screen md:h-screen
        transition-all duration-300 ease-in-out
        flex flex-col
        border-r
        ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'}
      `} style={{ backgroundColor: '#171538', borderColor: '#0F0F23' }}>
        
        {/* Sidebar Header with collapse toggle */}
        <div className="p-6 border-b relative" style={{ borderColor: '#0F0F23' }}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105" style={{ backgroundColor: '#CC973C' }}>
              <Shield size={28} style={{ color: '#171538' }} />
            </div>
            {!isSidebarCollapsed && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-xl font-bold" style={{ color: '#FCFCFB' }}>Admin Panel</h1>
                <p className="text-xs" style={{ color: '#CC973C' }}>Administrator Access</p>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle Button - Desktop only */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-8 w-6 h-6 rounded-full items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Search Bar - Desktop only */}
        {!isSidebarCollapsed && (
          <div className="hidden md:block p-4 animate-in fade-in duration-300">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#999' }} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-all focus:ring-2 focus:ring-[#CC973C]"
                style={{ backgroundColor: '#0F0F23', color: '#FCFCFB', border: '1px solid #0F0F23' }}
              />
            </div>
          </div>
        )}

        {/* Navigation with tooltips for collapsed state */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto smooth-scroll">
          {!isSidebarCollapsed && (
            <div className="px-3 mb-2 animate-in fade-in duration-300">
              <h3 className="text-xs uppercase tracking-wider" style={{ color: '#999' }}>Main Menu</h3>
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3.5 rounded-xl
                  transition-all duration-200
                  ${active ? 'font-semibold shadow-sm' : 'hover:bg-white/5'}
                  relative group
                `}
                style={{
                  backgroundColor: active ? '#CC973C' : 'transparent',
                  color: active ? '#171538' : '#FCFCFB',
                }}
              >
                <Icon size={20} />
                {!isSidebarCollapsed && (
                  <span className="flex-1 animate-in fade-in duration-300">{item.label}</span>
                )}
                {active && !isSidebarCollapsed && (
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#171538' }}></div>
                )}
                
                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50" style={{ backgroundColor: '#171538', color: '#FCFCFB' }}>
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats - Desktop only with collapse support */}
        {!isSidebarCollapsed && (
          <div className="hidden md:block p-4 border-t animate-in fade-in duration-300" style={{ borderColor: '#0F0F23' }}>
            
            
            <div className="p-3 rounded-lg mb-4 transition-all hover:scale-105" style={{ backgroundColor: '#0F0F23' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                  <User size={20} style={{ color: '#171538' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#FCFCFB' }}>{user?.name || "Admin User"}</p>
                  <div className="flex items-center gap-1">
                    <Shield size={12} style={{ color: '#CC973C' }} />
                    <p className="text-xs" style={{ color: '#CC973C' }}>Super Admin</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#CC973C', color: '#171538' }}
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Overlay for mobile menu with blur effect */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-0 transition-all duration-300">
        {/* Desktop Header - Sticky */}
        <header 
          className={`
            hidden md:flex items-center justify-between px-6 py-4 border-b sticky top-0 z-30
            transition-all duration-300
            ${isScrolled ? 'shadow-md' : ''}
          `} 
          style={{ 
            borderColor: '#E5E5E5', 
            backgroundColor: isScrolled ? 'rgba(252, 252, 251, 0.95)' : '#FCFCFB',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none'
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold transition-all" style={{ color: '#333' }}>
                {navItems.find(item => isActive(item.path))?.label || "Admin Dashboard"}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#E8F4FD', color: '#1E1E59' }}>
                <Shield size={14} />
                <span>Admin Access</span>
              </div>
            </div>
            <p className="text-sm mt-1 transition-all" style={{ color: '#666' }}>
              Manage your platform efficiently with admin tools and insights.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullscreen}
              className="p-2.5 rounded-lg border transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
              style={{ borderColor: '#E5E5E5', color: '#333' }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-gray-50 hover:scale-105 active:scale-95" style={{ borderColor: '#E5E5E5', color: '#333' }}>
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                <Bell size={22} style={{ color: '#333' }} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>
            
            <div className="h-8 w-px" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: '#333' }}>{user?.name || "Admin User"}</p>
                <p className="text-xs" style={{ color: '#666' }}>Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: '#CC973C' }}>
                <User size={20} style={{ color: '#171538' }} />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform group-hover:rotate-12" style={{ backgroundColor: '#FCFCFB', borderColor: '#FCFCFB' }}>
                  <Shield size={10} style={{ color: '#CC973C' }} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile spacer for fixed header */}
        <div className="md:hidden h-16"></div>

        {/* Scrollable Content with smooth scrolling */}
        <div className="flex-1 overflow-y-auto smooth-scroll">
          <div className="p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
          
          {/* Footer - Sticky at bottom */}
          <footer className="sticky bottom-0 px-6 py-4 border-t" style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <p className="text-sm" style={{ color: '#666' }}>
                  © {new Date().getFullYear()} Admin Panel v2.1.4
                </p>
                <div className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-all hover:scale-105" style={{ backgroundColor: '#E8F4FD', color: '#1E1E59' }}>
                  <Shield size={10} />
                  <span>Secure Session</span>
                </div>
              </div>
              <div className="flex gap-6 mt-3 md:mt-0">
                <a href="/admin/help" className="text-sm hover:underline transition-all hover:text-[#CC973C]" style={{ color: '#1E1E59' }}>Documentation</a>
                <a href="/admin/logs" className="text-sm hover:underline transition-all hover:text-[#CC973C]" style={{ color: '#1E1E59' }}>System Logs</a>
                <a href="/admin/support" className="text-sm hover:underline transition-all hover:text-[#CC973C]" style={{ color: '#1E1E59' }}>Support</a>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Global styles for smooth scrolling */}
      <style jsx>{`
        .smooth-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        .smooth-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .smooth-scroll::-webkit-scrollbar-track {
          background: #F1F1F1;
          border-radius: 10px;
        }
        
        .smooth-scroll::-webkit-scrollbar-thumb {
          background: #CC973C;
          border-radius: 10px;
        }
        
        .smooth-scroll::-webkit-scrollbar-thumb:hover {
          background: #B5842B;
        }
        
        @keyframes slide-in-from-top-5 {
          from {
            opacity: 0;
            transform: translateY(-5%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-from-bottom-4 {
          from {
            opacity: 0;
            transform: translateY(4%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .slide-in-from-top-5 {
          animation-name: slide-in-from-top-5;
        }
        
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}