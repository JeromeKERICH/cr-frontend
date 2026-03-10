import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Clock,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  ChevronDown,
  Briefcase,
  Scale,
  Gavel,
  Award,
  ChevronLeft,
  ChevronRight,
  Video,
  Download,
  Star
} from "lucide-react";

const LawyerLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: "/lawyer", label: "Dashboard", icon: LayoutDashboard },
    { path: "/lawyer/consultations", label: "Consultations", icon: Calendar },
    { path: "/lawyer/clients", label: "Clients", icon: Users },
    { path: "/lawyer/documents", label: "Documents", icon: FileText },
  ];

  const notifications = [
    { id: 1, title: "New consultation request", time: "5 min ago", unread: true },
    { id: 2, title: "Document uploaded by client", time: "1 hour ago", unread: true },
    { id: 3, title: "Meeting scheduled for tomorrow", time: "2 hours ago", unread: false },
    { id: 4, title: "Payment received", time: "1 day ago", unread: false },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div 
      className="min-h-screen relative flex"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 transition-all duration-300"
        style={{ 
          backgroundColor: '#00124E',
          borderBottom: '1px solid rgba(202, 157, 82, 0.2)',
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-all"
            style={{ 
              backgroundColor: '#CA9D52',
              color: '#00124E',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <Scale size={20} style={{ color: '#CA9D52' }} />
            <h1 className="text-xl font-bold" style={{ color: '#FAFAF8' }}>Lawyer Portal</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: '#FAFAF8' }}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-lg shadow-xl"
                style={{ 
                  backgroundColor: '#FAFAF8',
                  border: '1px solid #E5E5E5'
                }}
              >
                <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
                  <h3 className="font-semibold" style={{ color: '#00124E' }}>Notifications</h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    You have {notifications.filter(n => n.unread).length} unread
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{ 
                        borderColor: '#E5E5E5',
                        backgroundColor: notification.unread ? 'rgba(202, 157, 82, 0.05)' : 'transparent'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium" style={{ color: '#00124E' }}>{notification.title}</p>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#CA9D52' }}></div>
                        )}
                      </div>
                      <p className="text-xs mt-1" style={{ color: '#666' }}>{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: '#FAFAF8' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
            >
              <User size={18} />
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Profile Menu Dropdown */}
      {isProfileMenuOpen && (
        <div className="md:hidden fixed top-16 right-4 z-50 w-48 rounded-lg shadow-xl"
          style={{ 
            backgroundColor: '#FAFAF8',
            border: '1px solid #E5E5E5'
          }}
        >
          <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
            <p className="font-semibold" style={{ color: '#00124E' }}>{user?.name || "Lawyer User"}</p>
            <p className="text-sm" style={{ color: '#666' }}>{user?.email || "lawyer@example.com"}</p>
            <div className="flex items-center gap-1 mt-1">
              <Award size={12} style={{ color: '#CA9D52' }} />
              <span className="text-xs font-medium" style={{ color: '#CA9D52' }}>Legal Professional</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
            style={{ color: '#DC2626' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen
        transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isSidebarCollapsed ? 'w-20' : 'w-72'}
        flex flex-col
      `}
        style={{ 
          backgroundColor: '#00124E',
          borderRight: '1px solid rgba(202, 157, 82, 0.2)',
          overflowY: 'auto'
        }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b relative flex-shrink-0"
          style={{ borderColor: 'rgba(202, 157, 82, 0.2)' }}
        >
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#CA9D52' }}
            >
              <Gavel size={28} style={{ color: '#00124E' }} />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#FAFAF8' }}>Lawyer Portal</h1>
                <p className="text-xs" style={{ color: '#CA9D52' }}>Legal Professional</p>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle - Desktop only */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-8 w-6 h-6 rounded-full items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {!isSidebarCollapsed && (
            <div className="px-3 mb-2">
              <h3 className="text-xs uppercase tracking-wider" style={{ color: '#CA9D52' }}>MAIN MENU</h3>
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
                  transition-all duration-200 relative group
                `}
                style={{
                  backgroundColor: active ? '#CA9D52' : 'transparent',
                  color: active ? '#00124E' : '#FAFAF8',
                }}
              >
                <Icon size={20} />
                {!isSidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: active ? '#00124E' : '#CA9D52',
                          color: active ? '#FAFAF8' : '#00124E'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {active && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00124E' }}></div>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                    style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                  >
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout - Desktop */}
        <div className="hidden md:block p-4 border-t flex-shrink-0"
          style={{ borderColor: 'rgba(202, 157, 82, 0.2)' }}
        >
          {!isSidebarCollapsed ? (
            <>
              <div className="p-3 rounded-lg mb-4"
                style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#CA9D52' }}
                  >
                    <User size={20} style={{ color: '#00124E' }} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate" style={{ color: '#FAFAF8' }}>
                      {user?.name || "Lawyer User"}
                    </p>
                    <p className="text-xs" style={{ color: '#CA9D52' }}>Online</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className={`
        flex-1 flex flex-col transition-all duration-300
        ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-72'}
        ml-0
      `}>
        
        {/* Desktop Header - Sticky */}
        <header className={`
          hidden md:flex items-center justify-between px-6 py-4 border-b sticky top-0 z-30
          transition-all duration-300
          ${isScrolled ? 'shadow-md' : ''}
        `}
          style={{ 
            borderColor: '#E5E5E5',
            backgroundColor: '#FAFAF8'
          }}
        >
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#00124E' }}>
              {navItems.find(item => isActive(item.path))?.label || "Lawyer Dashboard"}
            </h1>
            <p className="text-sm mt-1" style={{ color: '#666' }}>
              Manage your legal practice efficiently
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: '#00124E' }}
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Desktop Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-lg shadow-xl"
                  style={{ 
                    backgroundColor: '#FAFAF8',
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
                    <h3 className="font-semibold" style={{ color: '#00124E' }}>Notifications</h3>
                    <p className="text-sm" style={{ color: '#666' }}>
                      You have {notifications.filter(n => n.unread).length} unread
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                        style={{ 
                          borderColor: '#E5E5E5',
                          backgroundColor: notification.unread ? 'rgba(202, 157, 82, 0.05)' : 'transparent'
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium" style={{ color: '#00124E' }}>{notification.title}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#CA9D52' }}></div>
                          )}
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#666' }}>{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-8 w-px" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: '#00124E' }}>{user?.name || "Lawyer User"}</p>
                <p className="text-xs" style={{ color: '#666' }}>Legal Professional</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              >
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile spacer for fixed header */}
        <div className="md:hidden h-16"></div>

        {/* Page Content - Scrollable */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t"
          style={{ 
            borderColor: '#E5E5E5',
            backgroundColor: '#FAFAF8',
            marginTop: 'auto'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4">
              <p className="text-sm" style={{ color: '#666' }}>
                © {new Date().getFullYear()} Lawyer Portal
              </p>
              <div className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#00124E' }}
              >
                <Award size={10} />
                <span>Secure Session</span>
              </div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:underline" style={{ color: '#00124E' }}>Privacy</a>
              <a href="#" className="text-sm hover:underline" style={{ color: '#00124E' }}>Terms</a>
              <a href="#" className="text-sm hover:underline" style={{ color: '#00124E' }}>Help</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LawyerLayout;