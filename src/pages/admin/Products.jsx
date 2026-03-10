import { useEffect, useState } from "react";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../services/product.service";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  DollarSign,
  Tag,
  FileText,
  Briefcase,
  AlertCircle,
  RefreshCw,
  X,
  Check,
  ChevronDown,
  Save,
  Eye,
  Archive,
  Clock,
  Upload,
  Image,
  File,
  Download,
  Copy,
  MoreVertical,
  Grid,
  List
} from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [previewFile, setPreviewFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "contracts",
    price: "",
    cover: null,
    document: null,
    preview: null,
    sku: "",
    tags: "",
    featured: false
  });

  const categories = [
    { value: "contracts", label: "Contracts", icon: FileText },
    { value: "affidavits", label: "Affidavits", icon: FileText },
    { value: "business", label: "Business Documents", icon: Briefcase },
    { value: "intellectual_property", label: "Intellectual Property", icon: Package },
    { value: "employment", label: "Employment Documents", icon: FileText },
    { value: "succession", label: "Succession & Wills", icon: FileText },
    { value: "property", label: "Property Documents", icon: FileText },
    { value: "service", label: "Legal Service", icon: Briefcase },
  ];

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await getAdminProducts();
      setProducts(res.data || []);
      setFilteredProducts(res.data || []);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      
      // Validate form
      if (!form.title || !form.price) {
        setError("Title and price are required");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      
      if (form.sku) formData.append("sku", form.sku);
      if (form.tags) formData.append("tags", form.tags);
      if (form.featured) formData.append("featured", "true");
      
      if (form.cover) formData.append("cover", form.cover);
      if (form.document) formData.append("document", form.document);
      if (form.preview) formData.append("preview", form.preview);

      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        setSuccess("Product updated successfully!");
      } else {
        await createProduct(formData);
        setSuccess("Product created successfully!");
      }
      
      resetForm();
      loadData();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setSuccess("Product deleted successfully!");
      setDeleteConfirm(null);
      loadData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "contracts",
      price: "",
      cover: null,
      document: null,
      preview: null,
      sku: "",
      tags: "",
      featured: false
    });
    setEditingProduct(null);
    setShowCreateForm(false);
    setPreviewFile(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description || "",
      category: product.category,
      price: product.price.toString(),
      cover: null,
      document: null,
      preview: null,
      sku: product.sku || "",
      tags: product.tags?.join(", ") || "",
      featured: product.featured || false
    });
    setShowCreateForm(true);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setForm({ ...form, [field]: file });
    
    if (field === 'cover' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFile(reader.result);
      };
      reader.readAsDataURL(file);
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

  const getCategoryLabel = (value) => {
    const category = categories.find(c => c.value === value);
    return category ? category.label : value;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#333' }}>
            Products & Services
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Manage your legal documents, templates, and services
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowCreateForm(!showCreateForm);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: '#CC973C', color: '#171538' }}
        >
          <Plus size={18} />
          {showCreateForm ? 'Close Form' : 'Add New Product'}
        </button>
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

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="rounded-xl border p-6" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: '#333' }}>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </h2>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} style={{ color: '#666' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Info */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Employment Contract Template"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Description
                </label>
                <textarea
                  placeholder="Detailed description of the product..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Category *
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Price (KES) *
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., DOC-001"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., legal, template, contract"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#CC973C' }}
                />
                <label htmlFor="featured" className="text-sm" style={{ color: '#333' }}>
                  Featured Product
                </label>
              </div>

              {/* File Uploads */}
              <div className="md:col-span-2 border-t pt-4" style={{ borderColor: '#E5E5E5' }}>
                <h3 className="font-medium mb-4" style={{ color: '#333' }}>Files</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Cover Image
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: '#E5E5E5' }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="cover-upload"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'cover')}
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        {previewFile ? (
                          <img src={previewFile} alt="Preview" className="max-h-32 mx-auto mb-2 rounded" />
                        ) : (
                          <Image size={32} className="mx-auto mb-2" style={{ color: '#999' }} />
                        )}
                        <span className="text-xs" style={{ color: '#666' }}>
                          {form.cover ? form.cover.name : 'Click to upload image'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Document File */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Document File *
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: '#E5E5E5' }}>
                      <input
                        type="file"
                        id="document-upload"
                        className="hidden"
                        onChange={(e) => setForm({ ...form, document: e.target.files[0] })}
                        required={!editingProduct}
                      />
                      <label htmlFor="document-upload" className="cursor-pointer">
                        <File size={32} className="mx-auto mb-2" style={{ color: '#999' }} />
                        <span className="text-xs" style={{ color: '#666' }}>
                          {form.document ? form.document.name : 'Click to upload document'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Preview File */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                      Preview File
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: '#E5E5E5' }}>
                      <input
                        type="file"
                        id="preview-upload"
                        className="hidden"
                        onChange={(e) => setForm({ ...form, preview: e.target.files[0] })}
                      />
                      <label htmlFor="preview-upload" className="cursor-pointer">
                        <File size={32} className="mx-auto mb-2" style={{ color: '#999' }} />
                        <span className="text-xs" style={{ color: '#666' }}>
                          {form.preview ? form.preview.name : 'Click to upload preview'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: '#1E1E59', color: '#FCFCFB' }}
              >
                <Save size={18} />
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search products by title, description, or tags..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <button
            onClick={loadData}
            className="px-4 py-3 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#333' }}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>

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

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Total Products</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
              <Package size={20} style={{ color: '#1E1E59' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{products.length}</p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Documents</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <FileText size={20} style={{ color: '#92400E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {products.filter(p => !p.category.includes('service')).length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Services</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
              <Briefcase size={20} style={{ color: '#1D4ED8' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {products.filter(p => p.category.includes('service')).length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Featured</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <Check size={20} style={{ color: '#065F46' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {products.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CC973C' }} />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-12 rounded-xl border" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <Package size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: '#333' }}>No products found</h3>
          <p className="text-sm" style={{ color: '#666' }}>
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first product'}
          </p>
          {!searchTerm && categoryFilter === 'all' && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: '#CC973C', color: '#171538' }}
            >
              <Plus size={18} className="inline mr-2" />
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-4"
        }>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="rounded-xl border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: '#FCFCFB',
                borderColor: '#E5E5E5'
              }}
            >
              {viewMode === "grid" ? (
                <div className="p-4">
                  {product.coverImage && (
                    <img 
                      src={product.coverImage} 
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: '#333' }}>{product.title}</h3>
                    {product.featured && (
                      <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-2 line-clamp-2" style={{ color: '#666' }}>{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F3F4F6', color: '#666' }}>
                      {getCategoryLabel(product.category)}
                    </span>
                    {product.sku && (
                      <span className="text-xs" style={{ color: '#999' }}>SKU: {product.sku}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#E5E5E5' }}>
                    <p className="text-xl font-bold" style={{ color: '#1E1E59' }}>
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 size={16} style={{ color: '#666' }} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 size={16} style={{ color: '#DC2626' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex items-center gap-4">
                  {product.coverImage && (
                    <img 
                      src={product.coverImage} 
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: '#333' }}>{product.title}</h3>
                      {product.featured && (
                        <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: '#1E1E59' }}>
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F3F4F6', color: '#666' }}>
                        {getCategoryLabel(product.category)}
                      </span>
                      {product.sku && (
                        <span className="text-xs" style={{ color: '#999' }}>SKU: {product.sku}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 size={16} style={{ color: '#666' }} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product._id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 size={16} style={{ color: '#DC2626' }} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-xl p-6" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <AlertCircle size={24} style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#333' }}>Confirm Deletion</h3>
            </div>
            
            <p className="mb-6" style={{ color: '#666' }}>
              Are you sure you want to delete this product? This action cannot be undone and will remove all associated files.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FCFCFB' }}
              >
                Delete Product
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
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