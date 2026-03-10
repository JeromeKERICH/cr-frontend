import { useEffect, useState } from "react";
import { getLawyerBookings, getLawyerStats } from "../../services/lawyer.service";
import { useAuth } from "../../hooks/useAuth";
import {
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  User,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Download,
  Filter,
  Search,
  ChevronDown,
  Eye,
  Star
} from "lucide-react";

export default function LawyerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [bookingsRes, statsRes] = await Promise.all([
        getLawyerBookings(),
        getLawyerStats()
      ]);

      setBookings(bookingsRes.data || []);
      setFilteredBookings(bookingsRes.data || []);
      setStats(statsRes.data || {
        total: bookingsRes.data?.length || 0,
        completed: bookingsRes.data?.filter(b => b.status === 'completed').length || 0,
        upcoming: bookingsRes.data?.filter(b => b.status === 'scheduled' && new Date(b.date) > new Date()).length || 0,
        cancelled: bookingsRes.data?.filter(b => b.status === 'cancelled').length || 0,
        pending: bookingsRes.data?.filter(b => b.status === 'pending').length || 0
      });
    } catch (err) {
      setError("Failed to load your consultations. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = bookings;
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(b => b.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      result = result.filter(b => {
        const bookingDate = new Date(b.date);
        switch(dateFilter) {
          case "today":
            return bookingDate >= today && bookingDate < tomorrow;
          case "upcoming":
            return bookingDate > now;
          case "past":
            return bookingDate < now;
          case "thisWeek":
            return bookingDate <= nextWeek;
          default:
            return true;
        }
      });
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.user?.fullName?.toLowerCase().includes(term) ||
        b.user?.email?.toLowerCase().includes(term) ||
        b.caseNumber?.toLowerCase().includes(term) ||
        b.notes?.toLowerCase().includes(term)
      );
    }
    
    // Sort by date (upcoming first)
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setFilteredBookings(result);
  }, [searchTerm, statusFilter, dateFilter, bookings]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled':
      case 'confirmed':
        return { bg: '#E8F4FD', text: '#00124E', icon: <Calendar size={14} /> };
      case 'completed':
        return { bg: '#D1FAE5', text: '#065F46', icon: <CheckCircle size={14} /> };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#991B1B', icon: <XCircle size={14} /> };
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', icon: <Clock size={14} /> };
      default:
        return { bg: '#F3F4F6', text: '#4B5563', icon: null };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === date.toDateString();
    
    if (isToday) return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (isTomorrow) return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "1 hour";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CA9D52' }} />
          <p className="text-lg" style={{ color: '#111' }}>Loading your consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-10 md:py-30" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#111' }}>
            Welcome back, {user?.fullName || 'Lawyer'}
          </h1>
          <p className="text-sm md:text-base mt-1" style={{ color: '#666' }}>
            Manage your assigned consultations and client meetings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-lg border flex items-center gap-2 transition-all hover:opacity-90"
            style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8', color: '#111' }}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button onClick={() => setError("")}>
            <XCircle size={20} style={{ color: '#DC2626' }} />
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="rounded-xl border p-4 transition-all hover:shadow-lg" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: '#666' }}>Total</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 18, 78, 0.1)' }}>
              <Briefcase size={18} style={{ color: '#00124E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#111' }}>{stats.total}</p>
        </div>

        <div className="rounded-xl border p-4 transition-all hover:shadow-lg" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: '#666' }}>Upcoming</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
              <Calendar size={18} style={{ color: '#CA9D52' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#111' }}>{stats.upcoming}</p>
        </div>

        <div className="rounded-xl border p-4 transition-all hover:shadow-lg" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: '#666' }}>Completed</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <CheckCircle size={18} style={{ color: '#065F46' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#111' }}>{stats.completed}</p>
        </div>

        <div className="rounded-xl border p-4 transition-all hover:shadow-lg" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: '#666' }}>Pending</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <Clock size={18} style={{ color: '#92400E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#111' }}>{stats.pending || 0}</p>
        </div>

        <div className="rounded-xl border p-4 transition-all hover:shadow-lg" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: '#666' }}>Cancelled</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
              <XCircle size={18} style={{ color: '#991B1B' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#111' }}>{stats.cancelled || 0}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search by client name, email, or case number..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
            }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
            }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="thisWeek">This Week</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: '#666' }}>
          Showing <span style={{ color: '#00124E', fontWeight: 600 }}>{filteredBookings.length}</span> consultations
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? 'bg-[#CA9D52]' : 'hover:bg-gray-100'}`}
            style={{ color: viewMode === "grid" ? '#FAFAF8' : '#666' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? 'bg-[#CA9D52]' : 'hover:bg-gray-100'}`}
            style={{ color: viewMode === "list" ? '#FAFAF8' : '#666' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bookings Grid/List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 rounded-xl border" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <Calendar size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: '#111' }}>No consultations found</h3>
          <p className="text-sm" style={{ color: '#666' }}>
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'You have no assigned consultations yet'}
          </p>
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-4"
        }>
          {filteredBookings.map((booking) => {
            const status = getStatusColor(booking.status);
            const isUpcoming = new Date(booking.date) > new Date();
            
            return (
              <div
                key={booking._id}
                className="rounded-xl border transition-all hover:shadow-lg cursor-pointer"
                style={{ 
                  backgroundColor: '#FAFAF8',
                  borderColor: isUpcoming ? '#CA9D52' : '#E5E5E5'
                }}
                onClick={() => setSelectedBooking(booking)}
              >
                {viewMode === "grid" ? (
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                          <User size={20} style={{ color: '#CA9D52' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#111' }}>{booking.user?.fullName}</h3>
                          <p className="text-xs" style={{ color: '#666' }}>{booking.user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: status.bg, color: status.text }}>
                        {status.icon}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} style={{ color: '#666' }} />
                        <span style={{ color: '#111' }}>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} style={{ color: '#666' }} />
                        <span style={{ color: '#111' }}>Duration: {formatDuration(booking.duration)}</span>
                      </div>
                      {booking.caseNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={14} style={{ color: '#666' }} />
                          <span style={{ color: '#111' }}>Case: {booking.caseNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Meeting Link */}
                    {booking.meetingLink && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-90"
                        style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                      >
                        <Video size={14} />
                        Join Meeting
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                    {/* Client Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                          <User size={20} style={{ color: '#CA9D52' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#111' }}>{booking.user?.fullName}</h3>
                          <p className="text-xs" style={{ color: '#666' }}>{booking.user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Date & Status */}
                    <div className="flex items-center gap-4">
                      <div className="text-sm" style={{ color: '#111' }}>
                        {formatDate(booking.date)}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: status.bg, color: status.text }}>
                        {status.icon}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    {booking.meetingLink && (
                      <a
                        href={booking.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-90"
                        style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                      >
                        Join
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
          <div 
            className="max-w-2xl w-full rounded-xl max-h-[90vh] overflow-y-auto" 
            style={{ 
              backgroundColor: '#FAFAF8',
              border: '1px solid #E5E5E5'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#111' }}>Consultation Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle size={20} style={{ color: '#666' }} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Client Information */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.05)' }}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#111' }}>
                    <User size={18} style={{ color: '#CA9D52' }} />
                    Client Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs" style={{ color: '#666' }}>Full Name</p>
                      <p className="font-medium" style={{ color: '#111' }}>{selectedBooking.user?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#666' }}>Email</p>
                      <p className="font-medium" style={{ color: '#111' }}>{selectedBooking.user?.email}</p>
                    </div>
                    {selectedBooking.user?.phone && (
                      <div>
                        <p className="text-xs" style={{ color: '#666' }}>Phone</p>
                        <p className="font-medium" style={{ color: '#111' }}>{selectedBooking.user?.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 18, 78, 0.05)' }}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#111' }}>
                    <Calendar size={18} style={{ color: '#00124E' }} />
                    Consultation Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#666' }}>Date & Time</span>
                      <span className="font-medium" style={{ color: '#111' }}>
                        {new Date(selectedBooking.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#666' }}>Duration</span>
                      <span className="font-medium" style={{ color: '#111' }}>
                        {formatDuration(selectedBooking.duration)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#666' }}>Status</span>
                      <span className="capitalize px-2 py-1 rounded-full text-xs" style={{ backgroundColor: getStatusColor(selectedBooking.status).bg, color: getStatusColor(selectedBooking.status).text }}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    {selectedBooking.caseNumber && (
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#666' }}>Case Number</span>
                        <span className="font-medium" style={{ color: '#111' }}>{selectedBooking.caseNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedBooking.notes && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <h3 className="font-semibold mb-2" style={{ color: '#111' }}>Notes</h3>
                    <p className="text-sm" style={{ color: '#666' }}>{selectedBooking.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {selectedBooking.meetingLink && (
                    <a
                      href={selectedBooking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
                    >
                      <Video size={18} />
                      Join Meeting
                    </a>
                  )}
                  <button
                    onClick={() => {
                      // Add to calendar functionality
                      const event = {
                        title: `Consultation with ${selectedBooking.user?.fullName}`,
                        start: selectedBooking.date,
                        duration: selectedBooking.duration || 60,
                      };
                      // Implement calendar integration
                      alert('Calendar integration coming soon!');
                    }}
                    className="flex-1 px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                    style={{ borderColor: '#E5E5E5', color: '#00124E' }}
                  >
                    <Calendar size={18} />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}