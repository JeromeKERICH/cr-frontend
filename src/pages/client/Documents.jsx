import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { downloadDocument, getDocumentPreview } from "../../services/product.service";
import {
  FileText,
  Download,
  Eye,
  Share2,
  Trash2,
  Archive,
  Star,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  File,
  FileImage,
  FileSpreadsheet,
  FilePdf,
  FolderOpen,
  Tag,
  Users,
  Lock,
  Unlock,
  Printer,
  Mail,
  Copy,
  ExternalLink,
  ChevronDown,
  X
} from "lucide-react";

export default function Documents() {
  const [payments, setPayments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [downloading, setDownloading] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/payments/me");
      
      // Filter only document purchases
      const documents = (res.data || []).filter(p => 
        p.category === 'document' || 
        p.purpose?.toLowerCase().includes('document') ||
        p.type === 'document'
      );
      
      setPayments(documents);
      setFilteredDocuments(documents);
    } catch (err) {
      setError("Failed to load your documents. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = payments;
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.purpose?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.documentName?.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter(p => p.documentType === typeFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch(sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return (a.purpose || "").localeCompare(b.purpose || "");
        default:
          return 0;
      }
    });
    
    setFilteredDocuments(result);
  }, [searchTerm, typeFilter, sortBy, payments]);

  const handleDownload = async (productId, document) => {
    try {
      setDownloading(productId);
      const res = await downloadDocument(productId);
      
      if (res.data.downloadUrl) {
        window.open(res.data.downloadUrl, "_blank");
      } else if (res.data.blob) {
        // Create blob download
        const url = window.URL.createObjectURL(new Blob([res.data.blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = document.documentName || `${document.purpose}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
      
      // Track download
      await api.post(`/documents/${productId}/download`);
      
    } catch (err) {
      setError("Failed to download document. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = async (document) => {
    try {
      const res = await getDocumentPreview(document.productId);
      setPreviewDocument({
        ...document,
        preview: res.data.preview
      });
    } catch (err) {
      setError("Preview not available for this document.");
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const shareDocument = (document) => {
    if (navigator.share) {
      navigator.share({
        title: document.purpose,
        text: document.description || 'Check out this document',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    switch(ext) {
      case 'pdf':
        return <FilePdf size={24} style={{ color: '#DC2626' }} />;
      case 'doc':
      case 'docx':
        return <FileText size={24} style={{ color: '#2563EB' }} />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet size={24} style={{ color: '#059669' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage size={24} style={{ color: '#9333EA' }} />;
      default:
        return <File size={24} style={{ color: '#6B7280' }} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#CC973C' }} />
          <p className="text-lg" style={{ color: '#333' }}>Loading your documents...</p>
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
            My Documents
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Access and manage all your purchased documents
          </p>
        </div>
        <button
          onClick={loadDocuments}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:bg-gray-50"
          style={{ borderColor: '#E5E5E5', color: '#333' }}
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Summary */}
      {payments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Total Documents</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
                <FileText size={20} style={{ color: '#1E1E59' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{payments.length}</p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Downloads</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                <Download size={20} style={{ color: '#065F46' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {payments.reduce((acc, p) => acc + (p.downloadCount || 0), 0)}
            </p>
          </div>
          
          <div className="rounded-xl border p-4" style={{ 
            backgroundColor: '#FCFCFB',
            borderColor: '#E5E5E5'
          }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#666' }}>Storage Used</span>
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <Archive size={20} style={{ color: '#92400E' }} />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
              {formatFileSize(payments.reduce((acc, p) => acc + (p.fileSize || 0), 0))}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button onClick={loadDocuments} style={{ color: '#DC2626' }}>
            <RefreshCw size={18} />
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search documents by name or description..."
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
            <option value="excel">Excel</option>
            <option value="image">Image</option>
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
            <option value="name">Name</option>
          </select>
          
          <div className="flex items-center gap-1 border rounded-lg p-1" style={{ borderColor: '#E5E5E5' }}>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${viewMode === "grid" ? 'bg-[#CC973C]' : 'hover:bg-gray-100'}`}
              style={{ color: viewMode === "grid" ? '#171538' : '#666' }}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list" ? 'bg-[#CC973C]' : 'hover:bg-gray-100'}`}
              style={{ color: viewMode === "list" ? '#171538' : '#666' }}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Document Grid/List */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-16 rounded-xl border" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <FolderOpen size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-xl font-medium mb-2" style={{ color: '#333' }}>No documents found</h3>
          <p className="mb-6" style={{ color: '#666' }}>
            {searchTerm || typeFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : "You haven't purchased any documents yet"}
          </p>
          {!searchTerm && typeFilter === 'all' && (
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#CC973C', color: '#171538' }}
            >
              Browse Documents
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="rounded-xl border transition-all hover:shadow-lg group"
              style={{ backgroundColor: '#FCFCFB', borderColor: '#E5E5E5' }}
            >
              <div className="p-6">
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                    {getFileIcon(doc.documentName)}
                  </div>
                  <button
                    onClick={() => toggleFavorite(doc.productId)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star 
                      size={18} 
                      className={favorites.includes(doc.productId) ? 'fill-current' : ''}
                      style={{ color: favorites.includes(doc.productId) ? '#CC973C' : '#999' }}
                    />
                  </button>
                </div>

                {/* Document Info */}
                <h3 className="font-semibold mb-1 line-clamp-1" style={{ color: '#333' }}>
                  {doc.purpose}
                </h3>
                {doc.description && (
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: '#666' }}>
                    {doc.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#999' }}>
                    <Calendar size={12} />
                    <span>Purchased {formatDate(doc.createdAt)}</span>
                  </div>
                  {doc.fileSize && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#999' }}>
                      <Archive size={12} />
                      <span>{formatFileSize(doc.fileSize)}</span>
                    </div>
                  )}
                  {doc.downloadCount > 0 && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#999' }}>
                      <Download size={12} />
                      <span>{doc.downloadCount} downloads</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                  <button
                    onClick={() => handleDownload(doc.productId, doc)}
                    disabled={downloading === doc.productId}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-50"
                    style={{ border: '1px solid #E5E5E5' }}
                  >
                    {downloading === doc.productId ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                    <span className="text-sm">Download</span>
                  </button>
                  <button
                    onClick={() => handlePreview(doc)}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => shareDocument(doc)}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="rounded-xl border p-4 transition-all hover:shadow-lg"
              style={{ backgroundColor: '#FCFCFB', borderColor: '#E5E5E5' }}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                  {getFileIcon(doc.documentName)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold" style={{ color: '#333' }}>{doc.purpose}</h3>
                    {favorites.includes(doc.productId) && (
                      <Star size={14} className="fill-current" style={{ color: '#CC973C' }} />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: '#999' }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Purchased {formatDate(doc.createdAt)}</span>
                    </div>
                    {doc.fileSize && (
                      <div className="flex items-center gap-1">
                        <Archive size={12} />
                        <span>{formatFileSize(doc.fileSize)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Download size={12} />
                      <span>{doc.downloadCount || 0} downloads</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(doc.productId, doc)}
                    disabled={downloading === doc.productId}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                    title="Download"
                  >
                    {downloading === doc.productId ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handlePreview(doc)}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                    title="Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => shareDocument(doc)}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                    title="Share"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleFavorite(doc.productId)}
                    className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5' }}
                    title="Add to favorites"
                  >
                    <Star 
                      size={16} 
                      className={favorites.includes(doc.productId) ? 'fill-current' : ''}
                      style={{ color: favorites.includes(doc.productId) ? '#CC973C' : '#999' }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full rounded-xl max-h-[90vh] overflow-hidden" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#E5E5E5' }}>
              <div className="flex items-center gap-3">
                {getFileIcon(previewDocument.documentName)}
                <div>
                  <h3 className="font-semibold" style={{ color: '#333' }}>{previewDocument.purpose}</h3>
                  <p className="text-xs" style={{ color: '#666' }}>Document Preview</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDocument(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} style={{ color: '#666' }} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {previewDocument.preview ? (
                <div className="prose max-w-none">
                  {/* Preview content would go here */}
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <FileText size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
                    <p style={{ color: '#666' }}>Preview not available</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
                  <p style={{ color: '#666' }}>No preview available for this document</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex justify-end gap-3" style={{ borderColor: '#E5E5E5' }}>
              <button
                onClick={() => handleDownload(previewDocument.productId, previewDocument)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: '#CC973C', color: '#171538' }}
              >
                <Download size={16} />
                Download
              </button>
              <button
                onClick={() => setPreviewDocument(null)}
                className="px-4 py-2 rounded-lg border transition-all hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}