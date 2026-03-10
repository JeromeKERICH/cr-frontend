import { useEffect, useState } from "react";
import { 
  getDashboardStats, 
  getRevenueTrend,
  getSystemMetrics 
} from "../../services/admin.service";
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  Clock,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Shield,
  CreditCard,
  Package
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("week"); // week, month, year

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch all dashboard data in parallel
      const [statsData, revenueData, metricsData] = await Promise.all([
        getDashboardStats(),
        // getRecentActivity(),
        getRevenueTrend({ range: timeRange }),
        getSystemMetrics()
      ]);

      setStats(statsData.data);
      setRevenueTrend(revenueData.data || []);
      setSystemMetrics(metricsData.data);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchDashboardData, 60000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

 

  const getActivityIcon = (type) => {
    switch(type) {
      case 'user': return Users;
      case 'booking': return Calendar;
      case 'payment': return CreditCard;
      case 'document': return FileText;
      default: return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'user': return '#3B82F6';
      case 'booking': return '#8B5CF6';
      case 'payment': return '#10B981';
      case 'document': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CC973C' }} />
          <p className="text-lg" style={{ color: '#333' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#333' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm md:text-base mt-1" style={{ color: '#666' }}>
            Real-time overview of platform performance and metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#333' }}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button 
            onClick={fetchDashboardData}
            className="text-sm font-medium hover:underline"
            style={{ color: '#DC2626' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          trend={stats?.userGrowth || 0}
          color="#3B82F6"
          loading={loading}
        />
        <StatCard
          title="Active Clients"
          value={stats?.totalClients || 0}
          icon={UserCheck}
          trend={stats?.clientGrowth || 0}
          color="#10B981"
          loading={loading}
        />
        <StatCard
          title="Total Lawyers"
          value={stats?.totalLawyers || 0}
          icon={Briefcase}
          trend={stats?.lawyerGrowth || 0}
          color="#8B5CF6"
          loading={loading}
        />
        <StatCard
          title="Bookings"
          value={stats?.totalBookings || 0}
          icon={Calendar}
          trend={stats?.bookingGrowth || 0}
          color="#F59E0B"
          loading={loading}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon={DollarSign}
          trend={stats?.revenueGrowth || 0}
          color="#059669"
          loading={loading}
          isCurrency={true}
        />
        <StatCard
          title="Active Cases"
          value={stats?.activeCases || 0}
          icon={FileText}
          trend={stats?.caseGrowth || 0}
          color="#EC4899"
          loading={loading}
        />
        <StatCard
          title="Documents"
          value={stats?.totalDocuments || 0}
          icon={FileText}
          trend={stats?.documentGrowth || 0}
          color="#6366F1"
          loading={loading}
        />
        <StatCard
          title="Avg. Response Time"
          value={`${stats?.avgResponseTime || 0}h`}
          icon={Clock}
          trend={stats?.responseTimeChange || 0}
          color="#06B6D4"
          loading={loading}
        />
      </div>

      {/* Charts and Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-6" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold" style={{ color: '#333' }}>Revenue Trend</h2>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Revenue over the last {timeRange === 'week' ? '7 days' : timeRange === 'month' ? '30 days' : '12 months'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <span className="text-xs" style={{ color: '#666' }}>Revenue</span>
                </div>
              </div>
            </div>
            
            {revenueTrend.length > 0 ? (
              <div className="h-64 flex items-end gap-2">
                {revenueTrend.map((item, index) => {
                  const maxRevenue = Math.max(...revenueTrend.map(r => r.revenue));
                  const height = (item.revenue / maxRevenue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-lg transition-all hover:opacity-80"
                        style={{ 
                          backgroundColor: '#10B981',
                          height: `${Math.max(height, 5)}%`,
                          minHeight: '5%'
                        }}
                      ></div>
                      <div className="mt-2 text-xs" style={{ color: '#666' }}>
                        {item.label}
                      </div>
                      <div className="text-xs font-medium mt-1" style={{ color: '#333' }}>
                        {formatCurrency(item.revenue)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <BarChart3 size={48} style={{ color: '#9CA3AF' }} />
              </div>
            )}
          </div>
        </div>

        {/* System Metrics */}
        <div>
          <div className="rounded-xl border p-6" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#333' }}>System Health</h2>
            
            {systemMetrics ? (
              <div className="space-y-4">
                <MetricItem
                  label="Server Uptime"
                  value={systemMetrics.uptime}
                  max={100}
                  color="#10B981"
                />
                <MetricItem
                  label="API Response Time"
                  value={systemMetrics.apiResponseTime}
                  max={1000}
                  color="#3B82F6"
                  suffix="ms"
                />
                <MetricItem
                  label="Database Performance"
                  value={systemMetrics.dbPerformance}
                  max={100}
                  color="#8B5CF6"
                />
                <MetricItem
                  label="Active Sessions"
                  value={systemMetrics.activeSessions}
                  max={systemMetrics.maxSessions || 1000}
                  color="#F59E0B"
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity size={32} className="mx-auto mb-2" style={{ color: '#9CA3AF' }} />
                <p className="text-sm" style={{ color: '#666' }}>No system metrics available</p>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#666' }}>Last Updated</span>
                <span className="text-sm font-medium" style={{ color: '#333' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


        <div className="border-t my-6" style={{ borderColor: '#E5E5E5' }}></div>
        <div className="flex items-center justify-between mb-6">
        {/* Quick Actions */}
        <div className="rounded-xl border p-6" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: '#333' }}>Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <ActionButton
              icon={Users}
              label="Manage Users"
              description="Add or edit user accounts"
              color="#3B82F6"
              href="/admin/users"
            />
            <ActionButton
              icon={Calendar}
              label="View Bookings"
              description="Check upcoming appointments"
              color="#8B5CF6"
              href="/admin/bookings"
            />
            <ActionButton
              icon={CreditCard}
              label="Payment Reports"
              description="Financial summaries"
              color="#10B981"
              href="/admin/payments"
            />
            <ActionButton
              icon={Shield}
              label="System Settings"
              description="Platform configuration"
              color="#F59E0B"
              href="/admin/settings"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, loading, isCurrency = false }) {
  return (
    <div 
      className="rounded-xl border p-6 transition-all hover:shadow-lg"
      style={{ 
        backgroundColor: '#FCFCFB',
        borderColor: '#E5E5E5'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1">
            {trend >= 0 ? (
              <ArrowUpRight size={16} style={{ color: '#10B981' }} />
            ) : (
              <ArrowDownRight size={16} style={{ color: '#EF4444' }} />
            )}
            <span 
              className="text-sm font-medium"
              style={{ color: trend >= 0 ? '#10B981' : '#EF4444' }}
            >
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm" style={{ color: '#666' }}>{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-2xl font-bold mt-1" style={{ color: '#333' }}>
            {isCurrency ? value : typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        )}
      </div>
    </div>
  );
}

function MetricItem({ label, value, max, color, suffix = '' }) {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm" style={{ color: '#666' }}>{label}</span>
        <span className="text-sm font-semibold" style={{ color: '#333' }}>
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E5E5' }}>
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            backgroundColor: color,
            width: `${Math.min(percentage, 100)}%`
          }}
        ></div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, description, color, href }) {
  return (
    <a
      href={href}
      className="p-4 rounded-lg border transition-all hover:shadow-sm"
      style={{ 
        backgroundColor: '#FCFCFB',
        borderColor: '#E5E5E5',
        color: '#333'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>{description}</p>
        </div>
      </div>
    </a>
  );
}