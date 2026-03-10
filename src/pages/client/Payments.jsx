import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
  Receipt,
  Download,
  Eye,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Package,
  Briefcase,
  CreditCard,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Mail,
  Share2,
  Info,
  TrendingUp
} from "lucide-react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalTransactions: 0,
    successfulPayments: 0,
    averagePayment: 0
  });

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/payments/me");
      setPayments(res.data || []);
      setFilteredPayments(res.data || []);
      
      // Calculate stats
      const data = res.data || [];
      const total = data.reduce((sum, p) => sum + (p.amount || 0), 0);
      const successful = data.filter(p => p.status === 'success' || p.status === 'completed').length;
      
      setStats({
        totalSpent: total,
        totalTransactions: data.length,
        successfulPayments: successful,
        averagePayment: data.length ? total / data.length : 0
      });
    } catch (err) {
      setError("Failed to load your purchase history. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = payments;
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(p => p.status === statusFilter);
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
        p.purpose?.toLowerCase().includes(term) ||
        p.transactionId?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
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
  }, [searchTerm, statusFilter, dateRange, sortBy, payments]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return { bg: '#D1FAE5', text: '#065F46', icon: <CheckCircle size={14} /> };
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', icon: <Clock size={14} /> };
      case 'failed':
        return { bg: '#FEE2E2', text: '#991B1B', icon: <XCircle size={14} /> };
      case 'refunded':
        return { bg: '#E0E7FF', text: '#3730A3', icon: <RefreshCw size={14} /> };
      default:
        return { bg: '#F3F4F6', text: '#4B5563', icon: <Info size={14} /> };
    }
  };

  const getPaymentIcon = (purpose) => {
    const purposeLower = purpose?.toLowerCase() || '';
    if (purposeLower.includes('consult')) return <Briefcase size={20} />;
    if (purposeLower.includes('document') || purposeLower.includes('template')) return <FileText size={20} />;
    if (purposeLower.includes('product')) return <Package size={20} />;
    return <Receipt size={20} />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const downloadReceipt = (payment) => {
    // Create receipt content
    const receipt = `
      RECEIPT
      ================
      Transaction ID: ${payment.transactionId || payment._id}
      Date: ${new Date(payment.createdAt).toLocaleString()}
      Purpose: ${payment.purpose}
      Amount: ${formatCurrency(payment.amount)}
      Status: ${payment.status}
      
      Thank you for your purchase!
    `;
    
    // Create download
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.transactionId || payment._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CC973C' }} />
          <p className="text-lg" style={{ color: '#333' }}>Loading your purchases...</p>
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
            My Purchases
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            View and manage all your transactions and receipts
          </p>
        </div>
        <button
          onClick={loadPayments}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:bg-gray-50"
          style={{ borderColor: '#E5E5E5', color: '#333' }}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Overview */}
      {payments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Total Spent</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
                <TrendingUp size={20} style={{ color: '#1E1E59' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {formatCurrency(stats.totalSpent)}
            </p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Transactions</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                <Receipt size={20} style={{ color: '#065F46' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {stats.totalTransactions}
            </p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Successful</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <CheckCircle size={20} style={{ color: '#92400E' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {stats.successfulPayments}
            </p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Average Payment</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <CreditCard size={20} style={{ color: '#991B1B' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {formatCurrency(stats.averagePayment)}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button onClick={loadPayments} style={{ color: '#DC2626' }}>
            <RefreshCw size={18} />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search by purpose or transaction ID..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
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

      {/* Payment List */}
      {filteredPayments.length === 0 ? (
        <div className="text-center py-16 rounded-xl border" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <Receipt size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-xl font-medium mb-2" style={{ color: '#333' }}>No purchases found</h3>
          <p className="mb-6" style={{ color: '#666' }}>
            {searchTerm || statusFilter !== 'all' || dateRange !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : "You haven't made any purchases yet"}
          </p>
          {!searchTerm && statusFilter === 'all' && dateRange === 'all' && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#CC973C', color: '#171538' }}
            >
              Browse Marketplace
              <ArrowUpRight size={18} />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => {
            const status = getStatusColor(payment.status);
            const Icon = getPaymentIcon(payment.purpose);
            
            return (
              <div
                key={payment._id}
                className="rounded-xl border transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FCFCFB',
                  borderColor: '#E5E5E5'
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
                        {Icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold" style={{ color: '#333' }}>
                            {payment.purpose || 'Purchase'}
                          </h3>
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: status.bg, color: status.text }}>
                            {status.icon}
                            <span>{payment.status?.toUpperCase() || 'PENDING'}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} style={{ color: '#666' }} />
                            <span className="text-sm" style={{ color: '#666' }}>
                              {formatDate(payment.createdAt)}
                            </span>
                          </div>
                          
                          {payment.transactionId && (
                            <div className="flex items-center gap-1">
                              <Receipt size={14} style={{ color: '#666' }} />
                              <span className="text-sm font-mono" style={{ color: '#666' }}>
                                ID: {payment.transactionId.slice(-8)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {payment.description && (
                          <p className="text-sm mt-2" style={{ color: '#666' }}>
                            {payment.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:flex-col md:items-end">
                      <p className="text-2xl font-bold" style={{ color: '#1E1E59' }}>
                        {formatCurrency(payment.amount)}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                          style={{ borderColor: '#E5E5E5' }}
                          title="View Details"
                        >
                          <Eye size={18} style={{ color: '#666' }} />
                        </button>
                        <button
                          onClick={() => downloadReceipt(payment)}
                          className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                          style={{ borderColor: '#E5E5E5' }}
                          title="Download Receipt"
                        >
                          <Download size={18} style={{ color: '#666' }} />
                        </button>
                        {payment.invoiceUrl && (
                          <a
                            href={payment.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                            style={{ borderColor: '#E5E5E5' }}
                            title="View Invoice"
                          >
                            <Printer size={18} style={{ color: '#666' }} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick actions for completed purchases */}
                  {payment.status === 'completed' && payment.productId && (
                    <div className="mt-4 pt-4 border-t flex gap-3" style={{ borderColor: '#E5E5E5' }}>
                      <Link
                        to={`/products/${payment.productId}`}
                        className="text-sm flex items-center gap-1 hover:underline"
                        style={{ color: '#1E1E59' }}
                      >
                        <Eye size={14} />
                        View Product
                      </Link>
                      {payment.downloadUrl && (
                        <a
                          href={payment.downloadUrl}
                          className="text-sm flex items-center gap-1 hover:underline"
                          style={{ color: '#1E1E59' }}
                        >
                          <Download size={14} />
                          Download
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full rounded-xl max-h-[90vh] overflow-y-auto" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#333' }}>Transaction Details</h2>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle size={20} style={{ color: '#666' }} />
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
                      Payment {selectedPayment.status?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: getStatusColor(selectedPayment.status).text }}>
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>

                {/* Transaction Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: '#666' }}>Transaction Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Transaction ID</span>
                        <p className="font-mono" style={{ color: '#333' }}>{selectedPayment.transactionId || selectedPayment._id}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Purpose</span>
                        <p style={{ color: '#333' }}>{selectedPayment.purpose}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Description</span>
                        <p style={{ color: '#333' }}>{selectedPayment.description || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: '#666' }}>Payment Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Amount</span>
                        <p className="text-xl font-bold" style={{ color: '#1E1E59' }}>
                          {formatCurrency(selectedPayment.amount)}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Payment Method</span>
                        <p className="capitalize" style={{ color: '#333' }}>{selectedPayment.paymentMethod || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-xs" style={{ color: '#999' }}>Date & Time</span>
                        <p style={{ color: '#333' }}>{new Date(selectedPayment.createdAt).toLocaleString()}</p>
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
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                  <button
                    onClick={() => downloadReceipt(selectedPayment)}
                    className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#333' }}
                  >
                    <Download size={16} />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = `mailto:support@example.com?subject=Question about transaction ${selectedPayment.transactionId}`;
                    }}
                    className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#333' }}
                  >
                    <Mail size={16} />
                    Get Support
                  </button>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all hover:bg-gray-50 ml-auto"
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
    </div>
  );
}