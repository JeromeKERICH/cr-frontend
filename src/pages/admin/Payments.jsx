import { useEffect, useState } from "react";
import {
  getAllPayments,
  getPaymentSummary,
//   exportPayments,
//   refundPayment,
} from "../../services/admin.service";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Check,
  X,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  User,
  Mail,
  Clock,
  Receipt,
  Banknote,
  ChevronDown,
  Eye,
  RotateCcw,
} from "lucide-react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [refundConfirm, setRefundConfirm] = useState(null);
  const [exportFormat, setExportFormat] = useState("csv");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [paymentsRes, summaryRes, statsRes] = await Promise.all([
        getAllPayments(),
        getPaymentSummary(),
        getPaymentStats(),
      ]);

      setPayments(paymentsRes.data || []);
      setFilteredPayments(paymentsRes.data || []);
      setSummary(summaryRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError("Failed to load payment data. Please try again.");
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
    let result = payments;
    
    // Apply status filter
    if (filter !== "all") {
      result = result.filter(p => p.status === filter);
    }
    
    // Apply date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      
      result = result.filter(p => {
        const paymentDate = new Date(p.createdAt);
        switch(dateRange) {
          case "today":
            return paymentDate >= today;
          case "week":
            return paymentDate >= startOfWeek;
          case "month":
            return paymentDate >= startOfMonth;
          case "year":
            return paymentDate >= startOfYear;
          default:
            return true;
        }
      });
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.user?.fullName?.toLowerCase().includes(term) ||
        p.user?.email?.toLowerCase().includes(term) ||
        p.purpose?.toLowerCase().includes(term) ||
        p.transactionId?.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch(sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
    
    setFilteredPayments(result);
  }, [filter, dateRange, searchTerm, sortBy, payments]);

  const handleRefund = async (paymentId) => {
    try {
      await refundPayment(paymentId);
      setSuccess("Payment refunded successfully!");
      setRefundConfirm(null);
      loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to process refund. Please try again.");
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportPayments({ 
        format: exportFormat,
        filter,
        dateRange,
        searchTerm 
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payments-export-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setSuccess("Export completed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to export payments. Please try again.");
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'success':
      case 'completed':
        return { bg: '#D1FAE5', text: '#065F46', icon: <Check size={14} /> };
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', icon: <Clock size={14} /> };
      case 'failed':
        return { bg: '#FEE2E2', text: '#991B1B', icon: <X size={14} /> };
      case 'refunded':
        return { bg: '#E0E7FF', text: '#3730A3', icon: <RotateCcw size={14} /> };
      default:
        return { bg: '#F3F4F6', text: '#4B5563', icon: null };
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'mpesa':
        return <Banknote size={16} />;
      case 'card':
        return <CreditCard size={16} />;
      case 'bank':
        return <Receipt size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  if (loading && !payments.length) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CC973C' }} />
          <p className="text-lg" style={{ color: '#333' }}>Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#333' }}>
            Payment Management
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Monitor and manage all financial transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E5E5E5', color: '#333' }}
            >
              <Download size={18} />
              Export
              <ChevronDown size={16} />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 top-12 z-10 w-48 rounded-lg shadow-lg border" style={{ 
                backgroundColor: '#FCFCFB',
                borderColor: '#E5E5E5'
              }}>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full p-3 border-b"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <option value="csv">CSV Format</option>
                  <option value="excel">Excel Format</option>
                  <option value="pdf">PDF Format</option>
                </select>
                <button
                  onClick={handleExport}
                  className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                  style={{ color: '#333' }}
                >
                  Download Now
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={loadData}
            className="p-2.5 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#333' }}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button onClick={() => setError("")}>
            <X size={20} style={{ color: '#DC2626' }} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0' }}>
          <Check size={20} style={{ color: '#065F46' }} />
          <span className="flex-1" style={{ color: '#065F46' }}>{success}</span>
          <button onClick={() => setSuccess("")}>
            <X size={20} style={{ color: '#065F46' }} />
          </button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Total Revenue</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
              <DollarSign size={20} style={{ color: '#1E1E59' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {summary ? formatCurrency(summary.totalRevenue) : 'KES 0'}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {stats?.revenueGrowth > 0 ? (
              <ArrowUpRight size={16} style={{ color: '#10B981' }} />
            ) : (
              <ArrowDownRight size={16} style={{ color: '#EF4444' }} />
            )}
            <span className="text-xs" style={{ color: stats?.revenueGrowth > 0 ? '#10B981' : '#EF4444' }}>
              {Math.abs(stats?.revenueGrowth || 0)}% from last month
            </span>
          </div>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Transactions</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <CreditCard size={20} style={{ color: '#065F46' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {summary?.totalTransactions || 0}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
              {stats?.successRate || 0}% Success
            </span>
          </div>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Average Payment</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <TrendingUp size={20} style={{ color: '#92400E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {summary ? formatCurrency(summary.averagePayment) : 'KES 0'}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Pending Amount</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
              <Clock size={20} style={{ color: '#991B1B' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {summary ? formatCurrency(summary.pendingAmount) : 'KES 0'}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search by client name, email, or transaction ID..."
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
        
        <div className="flex flex-wrap gap-3">
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="text-center p-12 rounded-xl border" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <Receipt size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: '#333' }}>No payments found</h3>
            <p className="text-sm" style={{ color: '#666' }}>
              {searchTerm || filter !== 'all' || dateRange !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No payment transactions have been recorded yet'}
            </p>
          </div>
        ) : (
          filteredPayments.map((payment) => {
            const status = getStatusColor(payment.status);
            
            return (
              <div
                key={payment._id}
                className="rounded-xl border transition-all hover:shadow-sm cursor-pointer"
                style={{ 
                  backgroundColor: '#FCFCFB',
                  borderColor: '#E5E5E5'
                }}
                onClick={() => setSelectedPayment(payment)}
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
                            <h3 className="text-lg font-semibold" style={{ color: '#333' }}>
                              {payment.user?.fullName || 'Unknown Client'}
                            </h3>
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: status.bg, color: status.text }}>
                              {status.icon}
                              <span>{payment.status.toUpperCase()}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Mail size={14} style={{ color: '#666' }} />
                              <span className="text-sm" style={{ color: '#666' }}>{payment.user?.email}</span>
                            </div>
                            {payment.transactionId && (
                              <div className="flex items-center gap-2">
                                <Receipt size={14} style={{ color: '#666' }} />
                                <span className="text-sm" style={{ color: '#666' }}>ID: {payment.transactionId}</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm mt-3" style={{ color: '#666' }}>
                            <span className="font-medium">Purpose:</span> {payment.purpose || 'Payment'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="md:text-right">
                      <div className="flex items-center gap-2 md:justify-end mb-3">
                        <Calendar size={16} style={{ color: '#666' }} />
                        <span className="text-sm" style={{ color: '#666' }}>
                          {formatDate(payment.createdAt)}
                        </span>
                      </div>
                      
                      <p className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
                        {formatCurrency(payment.amount)}
                      </p>
                      
                      {payment.paymentMethod && (
                        <div className="flex items-center gap-2 md:justify-end">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <span className="text-sm capitalize" style={{ color: '#666' }}>
                            {payment.paymentMethod}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                    {payment.status !== 'refunded' && payment.status === 'success' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRefundConfirm(payment._id);
                        }}
                        className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
                        style={{ borderColor: '#E5E5E5', color: '#DC2626' }}
                      >
                        <RotateCcw size={16} />
                        Refund
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPayment(payment);
                      }}
                      className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#E5E5E5', color: '#333' }}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full rounded-xl max-h-[90vh] overflow-y-auto" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#333' }}>Payment Details</h2>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} style={{ color: '#666' }} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Status Banner */}
                <div className="p-4 rounded-lg flex items-center justify-between" style={{ 
                  backgroundColor: getStatusColor(selectedPayment.status).bg 
                }}>
                  <div className="flex items-center gap-2">
                    {getStatusColor(selectedPayment.status).icon}
                    <span className="font-medium" style={{ color: getStatusColor(selectedPayment.status).text }}>
                      Payment {selectedPayment.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: getStatusColor(selectedPayment.status).text }}>
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Information */}
                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: '#666' }}>Client Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User size={16} style={{ color: '#666' }} />
                        <span style={{ color: '#333' }}>{selectedPayment.user?.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} style={{ color: '#666' }} />
                        <span style={{ color: '#333' }}>{selectedPayment.user?.email}</span>
                      </div>
                      {selectedPayment.user?.phone && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: '#666' }}>Phone:</span>
                          <span style={{ color: '#333' }}>{selectedPayment.user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: '#666' }}>Payment Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Transaction ID</span>
                        <p className="font-mono" style={{ color: '#333' }}>{selectedPayment.transactionId || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Payment Method</span>
                        <p className="capitalize" style={{ color: '#333' }}>{selectedPayment.paymentMethod || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Purpose</span>
                        <p style={{ color: '#333' }}>{selectedPayment.purpose || 'General Payment'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-medium mb-3" style={{ color: '#666' }}>Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#333' }}>Payment Created</p>
                        <p className="text-xs" style={{ color: '#666' }}>
                          {new Date(selectedPayment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedPayment.processedAt && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#333' }}>Payment Processed</p>
                          <p className="text-xs" style={{ color: '#666' }}>
                            {new Date(selectedPayment.processedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedPayment.refundedAt && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: '#8B5CF6' }}></div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#333' }}>Payment Refunded</p>
                          <p className="text-xs" style={{ color: '#666' }}>
                            {new Date(selectedPayment.refundedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                  {selectedPayment.status !== 'refunded' && selectedPayment.status === 'success' && (
                    <button
                      onClick={() => {
                        setRefundConfirm(selectedPayment._id);
                        setSelectedPayment(null);
                      }}
                      className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#DC2626', color: '#FCFCFB' }}
                    >
                      Process Refund
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#666' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Confirmation Modal */}
      {refundConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-xl p-6" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <RotateCcw size={24} style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#333' }}>Confirm Refund</h3>
            </div>
            
            <p className="mb-6" style={{ color: '#666' }}>
              Are you sure you want to refund this payment? This action will reverse the transaction and notify the client.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleRefund(refundConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FCFCFB' }}
              >
                Process Refund
              </button>
              <button
                onClick={() => setRefundConfirm(null)}
                className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50 flex-1"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="border p-4 rounded bg-white shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}