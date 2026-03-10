import { useEffect, useState } from "react";
import {
  getAllBookings,
  assignLawyer,
  updateBookingStatus,
  getBookingStats
} from "../../services/admin.service";
import api from "../../services/api";
import {
  Calendar,
  User,
  Clock,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  MoreVertical,
  Filter,
  Search,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  Video,
  FileText,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [actionMenu, setActionMenu] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch all data in parallel
      const [bookingsData, lawyersData, statsData] = await Promise.all([
        getAllBookings(),
        api.get("/admin/users"),
        getBookingStats()
      ]);

      setBookings(bookingsData.data || []);
      setFilteredBookings(bookingsData.data || []);
      setLawyers(lawyersData.data?.filter((u) => u.role === "lawyer") || []);
      setStats(statsData.data);
    } catch (err) {
      setError("Failed to load bookings data. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
      
      switch(dateFilter) {
        case "today":
          result = result.filter(b => new Date(b.date).toDateString() === today.toDateString());
          break;
        case "upcoming":
          result = result.filter(b => new Date(b.date) > now);
          break;
        case "past":
          result = result.filter(b => new Date(b.date) < now);
          break;
      }
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.fullName?.toLowerCase().includes(term) ||
        b.email?.toLowerCase().includes(term) ||
        b.phone?.toLowerCase().includes(term) ||
        b.notes?.toLowerCase().includes(term)
      );
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredBookings(result);
  }, [searchTerm, statusFilter, dateFilter, bookings]);

  const handleAssignLawyer = async (bookingId, lawyerId) => {
    try {
      await assignLawyer({ bookingId, lawyerId });
      await loadData();
      setActionMenu(null);
    } catch (err) {
      setError("Failed to assign lawyer. Please try again.");
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus({ bookingId, status });
      await loadData();
      setActionMenu(null);
    } catch (err) {
      setError("Failed to update status. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return { bg: '#EFF6FF', text: '#1D4ED8', icon: <ClockIcon size={14} /> };
      case 'completed': return { bg: '#D1FAE5', text: '#065F46', icon: <CheckCircle size={14} /> };
      case 'cancelled': return { bg: '#FEE2E2', text: '#991B1B', icon: <XCircle size={14} /> };
      case 'confirmed': return { bg: '#FEF3C7', text: '#92400E', icon: <CheckCircle size={14} /> };
      default: return { bg: '#F3F4F6', text: '#4B5563', icon: <ClockIcon size={14} /> };
    }
  };

  const getStatusOptions = (currentStatus) => {
    const options = [];
    
    if (currentStatus !== 'scheduled') options.push('scheduled');
    if (currentStatus !== 'confirmed') options.push('confirmed');
    if (currentStatus !== 'completed') options.push('completed');
    if (currentStatus !== 'cancelled') options.push('cancelled');
    
    return options.filter(opt => opt !== currentStatus);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "Not specified";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#333' }}>Bookings Management</h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Manage client appointments and lawyer assignments
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors hover:bg-gray-50"
          style={{ borderColor: '#E5E5E5', color: '#333' }}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
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

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Total Bookings</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                <Calendar size={20} style={{ color: '#1D4ED8' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{stats.totalBookings || 0}</p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Today's Bookings</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <Clock size={20} style={{ color: '#92400E' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{stats.todayBookings || 0}</p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Pending Assignment</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <Users size={20} style={{ color: '#991B1B' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{stats.unassignedBookings || 0}</p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Completion Rate</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                <TrendingUp size={20} style={{ color: '#065F46' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{stats.completionRate || 0}%</p>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search by client name, email, or notes..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
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
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CC973C' }} />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center p-12 rounded-xl border" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <Calendar size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: '#333' }}>No bookings found</h3>
            <p className="text-sm" style={{ color: '#666' }}>
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No bookings scheduled yet'}
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const status = getStatusColor(booking.status);
            const isPast = new Date(booking.date) < new Date();
            
            return (
              <div
                key={booking._id}
                className="rounded-xl border transition-all hover:shadow-sm"
                style={{ 
                  backgroundColor: '#FCFCFB',
                  borderColor: isPast ? '#E5E5E5' : booking.status === 'cancelled' ? '#FECACA' : '#E5E5E5'
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Client Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                          <User size={24} style={{ color: '#171538' }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold" style={{ color: '#333' }}>{booking.fullName}</h3>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: status.bg, color: status.text }}>
                              {status.icon}
                              <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Mail size={14} style={{ color: '#666' }} />
                              <span className="text-sm" style={{ color: '#666' }}>{booking.email}</span>
                            </div>
                            {booking.phone && (
                              <div className="flex items-center gap-2">
                                <Phone size={14} style={{ color: '#666' }} />
                                <span className="text-sm" style={{ color: '#666' }}>{booking.phone}</span>
                              </div>
                            )}
                          </div>
                          
                          {booking.notes && (
                            <p className="text-sm mt-3 p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB', color: '#666' }}>
                              {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="md:text-right">
                      <div className="flex items-center gap-2 md:justify-end mb-3">
                        <Calendar size={16} style={{ color: '#666' }} />
                        <span className="text-sm font-medium" style={{ color: '#333' }}>
                          {formatDate(booking.date)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 md:justify-end">
                          <Clock size={16} style={{ color: '#666' }} />
                          <span className="text-sm" style={{ color: '#666' }}>
                            Duration: {formatDuration(booking.duration)}
                          </span>
                        </div>
                        
                        {booking.location && (
                          <div className="flex items-center gap-2 md:justify-end">
                            <MapPin size={16} style={{ color: '#666' }} />
                            <span className="text-sm" style={{ color: '#666' }}>{booking.location}</span>
                          </div>
                        )}
                        
                        {booking.meetingLink && (
                          <a
                            href={booking.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#E8F4FD', color: '#1E1E59' }}
                          >
                            <Video size={14} />
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Assigned Lawyer & Actions */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Assign Lawyer */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          Assigned Lawyer
                        </label>
                        <select
                          className="px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: '#E5E5E5',
                            backgroundColor: '#FCFCFB',
                            color: '#333'
                          }}
                          value={booking.lawyer?._id || ""}
                          onChange={(e) => handleAssignLawyer(booking._id, e.target.value)}
                          disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                        >
                          <option value="">Select Lawyer</option>
                          {lawyers.map((lawyer) => (
                            <option key={lawyer._id} value={lawyer._id}>
                              {lawyer.fullName} • {lawyer.specialization || 'General'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Update Status */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                          Update Status
                        </label>
                        <select
                          className="px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: '#E5E5E5',
                            backgroundColor: '#FCFCFB',
                            color: '#333'
                          }}
                          value={booking.status}
                          onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                        >
                          <option value={booking.status}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </option>
                          {getStatusOptions(booking.status).map(option => (
                            <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="relative">
                      <button
                        onClick={() => setActionMenu(actionMenu === booking._id ? null : booking._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical size={20} style={{ color: '#666' }} />
                      </button>
                      
                      {actionMenu === booking._id && (
                        <div className="absolute right-0 top-10 z-10 w-48 rounded-lg shadow-lg border" style={{ 
                          backgroundColor: '#FCFCFB',
                          borderColor: '#E5E5E5'
                        }}>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActionMenu(null);
                            }}
                            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ color: '#333' }}
                          >
                            <FileText size={16} />
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              // Implement reschedule functionality
                              setActionMenu(null);
                            }}
                            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ color: '#333' }}
                          >
                            <Calendar size={16} />
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking._id, booking.status === 'cancelled' ? 'scheduled' : 'cancelled')}
                            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ color: booking.status === 'cancelled' ? '#10B981' : '#DC2626' }}
                          >
                            {booking.status === 'cancelled' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            {booking.status === 'cancelled' ? 'Reactivate' : 'Cancel Booking'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full rounded-xl max-h-[90vh] overflow-y-auto" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#333' }}>Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle size={20} style={{ color: '#666' }} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2" style={{ color: '#666' }}>Client Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Full Name</span>
                        <p style={{ color: '#333' }}>{selectedBooking.fullName}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Email</span>
                        <p style={{ color: '#333' }}>{selectedBooking.email}</p>
                      </div>
                      {selectedBooking.phone && (
                        <div>
                          <span className="text-xs" style={{ color: '#999' }}>Phone</span>
                          <p style={{ color: '#333' }}>{selectedBooking.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2" style={{ color: '#666' }}>Booking Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Date & Time</span>
                        <p style={{ color: '#333' }}>{formatDate(selectedBooking.date)}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Status</span>
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={getStatusColor(selectedBooking.status)}>
                          {getStatusColor(selectedBooking.status).icon}
                          <span>{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</span>
                        </div>
                      </div>
                      {selectedBooking.lawyer && (
                        <div>
                          <span className="text-xs" style={{ color: '#999' }}>Assigned Lawyer</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                              <Briefcase size={14} style={{ color: '#171538' }} />
                            </div>
                            <div>
                              <p style={{ color: '#333' }}>{selectedBooking.lawyer.fullName}</p>
                              <p className="text-xs" style={{ color: '#666' }}>{selectedBooking.lawyer.email}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-2" style={{ color: '#666' }}>Notes</h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                      <p style={{ color: '#666' }}>{selectedBooking.notes}</p>
                    </div>
                  </div>
                )}
                
                {selectedBooking.meetingLink && (
                  <div>
                    <h3 className="text-sm font-medium mb-2" style={{ color: '#666' }}>Meeting Link</h3>
                    <a
                      href={selectedBooking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#1E1E59', color: '#FCFCFB' }}
                    >
                      <Video size={16} />
                      Join Meeting Room
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}