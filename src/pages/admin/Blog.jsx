import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  Globe,
  Lock,
  Star,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon
} from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs/admin/all");
      setBlogs(res.data);
      setFilteredBlogs(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load blogs. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.title?.toLowerCase().includes(term) ||
        b.content?.toLowerCase().includes(term) ||
        b.author?.name?.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(b => b.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(b => b.category === categoryFilter);
    }
    
    setFilteredBlogs(result);
  }, [searchTerm, statusFilter, categoryFilter, blogs]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setSuccess("Blog post deleted successfully!");
      setDeleteConfirm(null);
      loadBlogs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete blog post. Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/blogs/${id}/status`, { status });
      setSuccess(`Blog post ${status === 'published' ? 'published' : 'unpublished'} successfully!`);
      loadBlogs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update blog status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'published':
        return { bg: '#D1FAE5', text: '#065F46', icon: <Globe size={12} />, label: 'Published' };
      case 'draft':
        return { bg: '#FEF3C7', text: '#92400E', icon: <Lock size={12} />, label: 'Draft' };
      case 'archived':
        return { bg: '#F3F4F6', text: '#4B5563', icon: <Archive size={12} />, label: 'Archived' };
      default:
        return { bg: '#F3F4F6', text: '#4B5563', icon: null, label: status };
    }
  };

  const categories = [
    "Legal News",
    "Corporate Law",
    "Employment Law",
    "Intellectual Property",
    "Dispute Resolution",
    "Business Advisory",
    "Legal Tech",
    "Industry Insights"
  ];

  return (
    <div className="space-y-6 p-4 md:p-6" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#00124E' }}>
            Blog Management
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Create and manage your legal blog posts and articles
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={loadBlogs}
            className="p-2.5 rounded-lg border flex items-center gap-2 transition-all hover:opacity-90"
            style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8', color: '#00124E' }}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <Link
            to="/admin/blogs/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
          >
            <Plus size={18} />
            New Blog Post
          </Link>
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
          <CheckCircle size={20} style={{ color: '#065F46' }} />
          <span className="flex-1" style={{ color: '#065F46' }}>{success}</span>
          <button onClick={() => setSuccess("")}>
            <X size={20} style={{ color: '#065F46' }} />
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#00124E'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#00124E'
            }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#00124E'
            }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Total Posts</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
              <FileText size={20} style={{ color: '#CA9D52' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#00124E' }}>{blogs.length}</p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Published</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <Globe size={20} style={{ color: '#065F46' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#00124E' }}>
            {blogs.filter(b => b.status === 'published').length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Drafts</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <Lock size={20} style={{ color: '#92400E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#00124E' }}>
            {blogs.filter(b => b.status === 'draft').length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Total Views</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
              <Eye size={20} style={{ color: '#CA9D52' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#00124E' }}>
            {blogs.reduce((acc, b) => acc + (b.views || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CA9D52' }} />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 rounded-xl border" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <FileText size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: '#00124E' }}>No blog posts found</h3>
          <p className="text-sm mb-6" style={{ color: '#666' }}>
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first blog post'}
          </p>
          {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
            <Link
              to="/admin/blogs/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
            >
              <Plus size={16} />
              Create Your First Blog Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBlogs.map((blog) => {
            const status = getStatusBadge(blog.status);
            
            return (
              <div
                key={blog._id}
                className="rounded-xl border overflow-hidden transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FAFAF8',
                  borderColor: '#E5E5E5'
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Blog Image */}
                    <div className="md:w-48 flex-shrink-0">
                      <div 
                        className="w-full h-32 rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}
                      >
                        {blog.coverImage ? (
                          <img 
                            src={blog.coverImage} 
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={32} style={{ color: '#CA9D52' }} />
                        )}
                      </div>
                    </div>

                    {/* Blog Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold" style={{ color: '#00124E' }}>
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div 
                            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                            style={{ backgroundColor: status.bg, color: status.text }}
                          >
                            {status.icon}
                            <span>{status.label}</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <User size={14} style={{ color: '#CA9D52' }} />
                          <span style={{ color: '#666' }}>{blog.author?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} style={{ color: '#CA9D52' }} />
                          <span style={{ color: '#666' }}>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag size={14} style={{ color: '#CA9D52' }} />
                          <span style={{ color: '#666' }}>{blog.category || 'Uncategorized'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={14} style={{ color: '#CA9D52' }} />
                          <span style={{ color: '#666' }}>{blog.views || 0} views</span>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: '#666' }}>
                        {blog.excerpt || blog.content?.substring(0, 200) || 'No description available'}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} style={{ color: '#00124E' }} />
                        </Link>
                        
                        {blog.status === 'published' ? (
                          <button
                            onClick={() => handleStatusChange(blog._id, 'draft')}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Unpublish"
                          >
                            <Lock size={16} style={{ color: '#92400E' }} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(blog._id, 'published')}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Publish"
                          >
                            <Globe size={16} style={{ color: '#065F46' }} />
                          </button>
                        )}
                        
                        <button
                          onClick={() => setDeleteConfirm(blog._id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} style={{ color: '#DC2626' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-xl p-6" style={{ 
            backgroundColor: '#FAFAF8',
            border: '1px solid #E5E5E5'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <AlertCircle size={24} style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#00124E' }}>Confirm Deletion</h3>
            </div>
            
            <p className="mb-6" style={{ color: '#666' }}>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FAFAF8' }}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50 flex-1"
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

// Archive icon component
function Archive({ size = 24, ...props }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="4" rx="1" ry="1"></rect>
      <path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
      <line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
  );
}