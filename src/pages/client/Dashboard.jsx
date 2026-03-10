import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  FileText,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from "lucide-react";

// Mock API services - Replace with your actual API calls
const dashboardApi = {
  getStats: async () => {
    // Replace with actual API call
    const res = await fetch('/api/dashboard/stats');
    return await res.json();
  },
  getRecentActivity: async () => {
    // Replace with actual API call
    const res = await fetch('/api/dashboard/recent-activity');
    return await res.json();
  },
  getUpcomingEvents: async () => {
    // Replace with actual API call
    const res = await fetch('/api/dashboard/upcoming-events');
    return await res.json();
  },
  getPerformanceMetrics: async () => {
    // Replace with actual API call
    const res = await fetch('/api/dashboard/performance');
    return await res.json();
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all dashboard data in parallel
      const [statsData, activityData, eventsData, performanceData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentActivity(),
        dashboardApi.getUpcomingEvents(),
        dashboardApi.getPerformanceMetrics()
      ]);

      setStats(statsData);
      setRecentActivity(activityData);
      setUpcomingEvents(eventsData);
      setPerformance(performanceData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up polling for real-time updates (optional)
    const interval = setInterval(fetchDashboardData, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CC973C' }} />
          <p className="text-lg" style={{ color: '#333' }}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6" style={{ color: '#DC2626' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#DC2626' }}>Unable to Load Dashboard</h3>
              <p className="text-sm mt-1" style={{ color: '#666' }}>{error}</p>
            </div>
          </div>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#333' }}>
            Welcome back, <span style={{ color: '#1E1E59' }}>{user.name || user.email}</span>
          </h1>
          <p className="text-sm md:text-base mt-1" style={{ color: '#666' }}>
            {user.role === 'admin' ? 'Administrator Dashboard' : 'Client Dashboard'} • 
            Last login: {formatDateTime(user.lastLogin || new Date().toISOString())}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={20} style={{ color: '#666' }} />
          </button>
          <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#E8F4FD', color: '#1E1E59' }}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div 
            key={index} 
            className="rounded-xl p-6 border transition-all hover:shadow-lg"
            style={{ 
              backgroundColor: '#FCFCFB',
              borderColor: '#E5E5E5'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: stat.color + '20' }}>
                {stat.icon === 'calendar' && <Calendar size={24} style={{ color: stat.color }} />}
                {stat.icon === 'dollar' && <DollarSign size={24} style={{ color: stat.color }} />}
                {stat.icon === 'users' && <Users size={24} style={{ color: stat.color }} />}
                {stat.icon === 'file' && <FileText size={24} style={{ color: stat.color }} />}
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight size={16} style={{ color: '#10B981' }} />
                ) : (
                  <ArrowDownRight size={16} style={{ color: '#EF4444' }} />
                )}
                <span 
                  className="text-sm font-medium"
                  style={{ color: stat.trend === 'up' ? '#10B981' : '#EF4444' }}
                >
                  {stat.change}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#666' }}>{stat.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: '#333' }}>
                {stat.type === 'currency' ? formatCurrency(stat.value) : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-6" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: '#333' }}>Recent Activity</h2>
              <button className="text-sm font-medium hover:underline" style={{ color: '#1E1E59' }}>
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: activity.color + '20' }}>
                    {activity.type === 'payment' && <DollarSign size={20} style={{ color: activity.color }} />}
                    {activity.type === 'document' && <FileText size={20} style={{ color: activity.color }} />}
                    {activity.type === 'case' && <Users size={20} style={{ color: activity.color }} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: '#333' }}>{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={14} style={{ color: '#666' }} />
                      <span className="text-xs" style={{ color: '#666' }}>
                        {formatDateTime(activity.timestamp)}
                      </span>
                      {activity.status && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: activity.status === 'completed' ? '#10B98120' : 
                                           activity.status === 'pending' ? '#F59E0B20' : '#EF444420',
                            color: activity.status === 'completed' ? '#10B981' : 
                                   activity.status === 'pending' ? '#F59E0B' : '#EF4444'
                          }}
                        >
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="font-semibold" style={{ color: '#333' }}>{formatCurrency(activity.amount)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events & Performance */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="rounded-xl border p-6" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#333' }}>Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded" style={{ backgroundColor: '#E8F4FD' }}>
                      <Calendar size={18} style={{ color: '#1E1E59' }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#333' }}>{event.title}</p>
                      <p className="text-sm mt-1" style={{ color: '#666' }}>
                        <Clock size={12} className="inline mr-1" />
                        {formatDateTime(event.date)}
                      </p>
                      {event.participants && (
                        <div className="flex items-center gap-2 mt-2">
                          <Users size={12} style={{ color: '#666' }} />
                          <span className="text-xs" style={{ color: '#666' }}>
                            {event.participants} participants
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          {performance && (
            <div className="rounded-xl border p-6" style={{ 
              backgroundColor: '#FCFCFB',
              borderColor: '#E5E5E5'
            }}>
              <h2 className="text-lg font-semibold mb-6" style={{ color: '#333' }}>Performance</h2>
              <div className="space-y-4">
                {Object.entries(performance.metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm capitalize" style={{ color: '#666' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-sm font-semibold" style={{ color: '#333' }}>{value}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E5E5' }}>
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: value >= 80 ? '#10B981' : 
                                         value >= 60 ? '#F59E0B' : '#EF4444',
                          width: `${value}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: '#333' }}>{performance.score}/100</p>
                  <p className="text-sm" style={{ color: '#666' }}>Overall Performance Score</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}