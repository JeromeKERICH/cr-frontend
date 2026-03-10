import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import { Link } from "react-router-dom";
import ProductPreview from "../../components/cards/ProductPreview";
import {
  Search,
  Filter,
  X,
  Star,
  Users,
  Eye,
  Heart,
  ShoppingCart,
  Grid,
  List,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Clock,
  Briefcase,
  FileText,
  Package
} from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [preview, setPreview] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
    priceRange: { min: 0, max: 0 }
  });

  const categories = [
    { value: "all", label: "All Categories", icon: Package },
    { value: "contracts", label: "Contracts", icon: FileText },
    { value: "affidavits", label: "Affidavits", icon: FileText },
    { value: "business", label: "Business", icon: Briefcase },
    { value: "employment", label: "Employment", icon: FileText },
    { value: "property", label: "Property", icon: FileText },
    { value: "service", label: "Services", icon: Briefcase },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      
      // Calculate stats
      const categoryCount = {};
      let minPrice = Infinity;
      let maxPrice = 0;
      
      res.data.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        minPrice = Math.min(minPrice, p.price);
        maxPrice = Math.max(maxPrice, p.price);
      });
      
      setStats({
        total: res.data.length,
        categories: categoryCount,
        priceRange: { min: minPrice, max: maxPrice }
      });
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }
    
    // Apply price range filter
    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }
    
    // Apply sorting
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popular":
        result.sort((a, b) => (b.purchased || 0) - (a.purchased || 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [search, category, sortBy, priceRange, products]);

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("popular");
    setPriceRange({ min: "", max: "" });
  };

  const getCategoryIcon = (cat) => {
    const found = categories.find(c => c.value === cat);
    return found?.icon || Package;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FCFCFB' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#CC973C] border-[#1E1E59] rounded-full animate-spin mb-4"></div>
          <p className="text-lg" style={{ color: '#333' }}>Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFCFB' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#1E1E59' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#CC973C]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#CC973C]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-30  relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ color: '#FCFCFB' }}>
            Legal Marketplace
          </h1>
          <p className="text-lg mb-8 text-center" style={{ color: '#CC973C' }}>
            Browse our collection of legal documents and services
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
            <input
              type="text"
              placeholder="Search documents, services, templates..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-lg shadow-lg focus:outline-none focus:ring-2 transition-all"
              style={{ 
                border: '2px solid transparent',
                backgroundColor: '#FCFCFB',
                color: '#333'
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={16} style={{ color: '#666' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Package size={20} style={{ color: '#666' }} />
              <span className="text-sm" style={{ color: '#666' }}>
                <strong style={{ color: '#333' }}>{stats.total}</strong> products
              </span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: '#E5E5E5' }}></div>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} style={{ color: '#666' }} />
              <span className="text-sm" style={{ color: '#666' }}>
                From <strong style={{ color: '#333' }}>{formatCurrency(stats.priceRange.min)}</strong> to{' '}
                <strong style={{ color: '#333' }}>{formatCurrency(stats.priceRange.max)}</strong>
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#333' }}
          >
            <SlidersHorizontal size={18} />
            Filters
            <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Section */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg border" style={{ borderColor: '#E5E5E5' }}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>Category</label>
              <select
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
                style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB', color: '#333' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>Sort By</label>
              <select
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
                style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB', color: '#333' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>Price Range (KES)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB', color: '#333' }}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <span style={{ color: '#666' }}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB', color: '#333' }}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
            
            {/* View Toggle & Clear Filters */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>View</label>
              <div className="flex items-center justify-between">
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
                
                {(search || category !== "all" || priceRange.min || priceRange.max) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm flex items-center gap-1 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: '#1E1E59' }}
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm" style={{ color: '#666' }}>
            Showing <strong style={{ color: '#333' }}>{filteredProducts.length}</strong> products
            {category !== "all" && ` in ${categories.find(c => c.value === category)?.label}`}
            {search && ` matching "${search}"`}
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-xl font-medium mb-2" style={{ color: '#333' }}>No products found</h3>
            <p className="mb-6" style={{ color: '#666' }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#CC973C', color: '#171538' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => {
              const Icon = getCategoryIcon(product.category);
              
              if (viewMode === "list") {
                return (
                  <div
                    key={product._id}
                    className="border rounded-xl transition-all hover:shadow-lg group"
                    style={{ backgroundColor: '#FCFCFB', borderColor: '#E5E5E5' }}
                  >
                    <div className="p-4 flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <Link to={`/products/${product._id}`} className="md:w-48">
                        <img
                          src={product.coverImage || '/placeholder-image.jpg'}
                          alt={product.title}
                          className="w-full h-32 md:h-24 object-cover rounded-lg"
                        />
                      </Link>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-[#CC973C] transition-colors" style={{ color: '#333' }}>
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F3F4F6', color: '#666' }}>
                            <Icon size={12} />
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-current" style={{ color: '#CC973C' }} />
                            <span className="text-xs" style={{ color: '#666' }}>4.5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} style={{ color: '#666' }} />
                            <span className="text-xs" style={{ color: '#666' }}>{product.purchased || 0} sold</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: '#666' }}>
                          {product.description || "No description available"}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xl font-bold" style={{ color: '#1E1E59' }}>
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {product.previewUrl && (
                              <button
                                onClick={() => setPreview(product)}
                                className="p-2 rounded-lg border hover:bg-gray-50 transition-all"
                                style={{ borderColor: '#E5E5E5' }}
                                title="Preview"
                              >
                                <Eye size={16} style={{ color: '#666' }} />
                              </button>
                            )}
                            <button
                              onClick={(e) => toggleWishlist(product._id, e)}
                              className="p-2 rounded-lg border hover:bg-gray-50 transition-all"
                              style={{ borderColor: '#E5E5E5' }}
                              title="Add to wishlist"
                            >
                              <Heart 
                                size={16} 
                                className={wishlist.includes(product._id) ? 'fill-current' : ''}
                                style={{ color: wishlist.includes(product._id) ? '#CC973C' : '#666' }}
                              />
                            </button>
                            <Link
                              to={`/products/${product._id}`}
                              className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                              style={{ backgroundColor: '#CC973C', color: '#171538' }}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div
                  key={product._id}
                  className="border rounded-xl transition-all hover:shadow-lg group"
                  style={{ backgroundColor: '#FCFCFB', borderColor: '#E5E5E5' }}
                >
                  <Link to={`/products/${product._id}`}>
                    <div className="relative">
                      <img
                        src={product.coverImage || '/placeholder-image.jpg'}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                          <Sparkles size={12} className="inline mr-1" />
                          New
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/products/${product._id}`}>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-[#CC973C] transition-colors" style={{ color: '#333' }}>
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F3F4F6', color: '#666' }}>
                        <Icon size={12} />
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-current" style={{ color: '#CC973C' }} />
                        <span className="text-xs" style={{ color: '#666' }}>4.5</span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: '#666' }}>
                      {product.description || "No description available"}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#E5E5E5' }}>
                      <div>
                        <p className="text-xl font-bold" style={{ color: '#1E1E59' }}>
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-xs" style={{ color: '#999' }}>
                          {product.purchased || 0} sold
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {product.previewUrl && (
                          <button
                            onClick={() => setPreview(product)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                            title="Preview"
                          >
                            <Eye size={16} style={{ color: '#666' }} />
                          </button>
                        )}
                        <button
                          onClick={(e) => toggleWishlist(product._id, e)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                          title="Add to wishlist"
                        >
                          <Heart 
                            size={16} 
                            className={wishlist.includes(product._id) ? 'fill-current' : ''}
                            style={{ color: wishlist.includes(product._id) ? '#CC973C' : '#666' }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preview Modal */}
        <ProductPreview
          product={preview}
          close={() => setPreview(null)}
        />
      </div>
    </div>
  );
}