import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, getProductById } from "../../services/product.service";
import PayButton from "../../components/common/PayButton";
import ProductPreview from "../../components/cards/ProductPreview";
import {
  Package,
  Briefcase,
  FileText,
  Clock,
  Calendar,
  Star,
  Users,
  Award,
  Shield,
  CheckCircle,
  XCircle,
  Heart,
  Share2,
  Download,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertCircle,
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
  ExternalLink,
  ThumbsUp,
  Clock as ClockIcon,
  Eye,
  File,
  Image as ImageIcon,
  Tag,
  TrendingUp,
  Sparkles
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [specs, setSpecs] = useState({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Try to get product by ID first (if endpoint exists)
        try {
          const res = await getProductById(id);
          setProduct(res.data);
          
          // Mock related products
          setRelatedProducts([
            { _id: '1', title: 'Employment Contract', price: 2500, category: 'contracts', coverImage: product?.coverImage },
            { _id: '2', title: 'NDA Agreement', price: 1800, category: 'contracts', coverImage: product?.coverImage },
            { _id: '3', title: 'Service Agreement', price: 3000, category: 'contracts', coverImage: product?.coverImage },
          ]);
        } catch {
          // Fallback to filtering from all products
          const res = await getProducts();
          const item = res.data.find(p => p._id === id);
          
          if (!item) {
            setError("Product not found");
          } else {
            setProduct(item);
            
            // Get related products from same category
            const related = res.data
              .filter(p => p._id !== id && p.category === item.category)
              .slice(0, 3);
            setRelatedProducts(related);
          }
        }
        
        // Mock reviews
        setReviews([
          { id: 1, user: "John Doe", rating: 5, comment: "Excellent document! Very comprehensive and well-written.", date: "2024-02-15", helpful: 12 },
          { id: 2, user: "Jane Smith", rating: 4, comment: "Good template, saved me a lot of time.", date: "2024-02-10", helpful: 8 },
          { id: 3, user: "Mike Johnson", rating: 5, comment: "Perfect for my needs. Highly recommended!", date: "2024-02-05", helpful: 15 },
        ]);
        
        // Mock specifications
        setSpecs({
          format: "PDF",
          pages: "15-20",
          language: "English",
          jurisdiction: "Kenya",
          lastUpdated: "2024",
          includes: "Word Document, PDF, Instructions"
        });
        
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product?.title} on our legal marketplace!`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'service':
      case 'services':
        return <Briefcase size={24} />;
      case 'contracts':
      case 'contract':
        return <FileText size={24} />;
      case 'affidavits':
        return <FileText size={24} />;
      case 'business':
        return <Briefcase size={24} />;
      case 'employment':
        return <FileText size={24} />;
      case 'property':
        return <FileText size={24} />;
      default:
        return <Package size={24} />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'service':
      case 'services':
        return { bg: '#EFF6FF', text: '#1D4ED8' };
      case 'contracts':
      case 'contract':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'affidavits':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'business':
        return { bg: '#E0E7FF', text: '#3730A3' };
      default:
        return { bg: '#F3F4F6', text: '#4B5563' };
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FCFCFB' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#CC973C] border-[#1E1E59] rounded-full animate-spin mb-4"></div>
          <p className="text-lg" style={{ color: '#333' }}>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FCFCFB' }}>
        <div className="text-center max-w-md">
          <AlertCircle size={64} className="mx-auto mb-4" style={{ color: '#DC2626' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>Product Not Found</h2>
          <p className="mb-6" style={{ color: '#666' }}>{error || "The product you're looking for doesn't exist or has been removed."}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#CC973C', color: '#171538' }}
          >
            <ChevronLeft size={18} />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryColor(product.category);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFCFB' }}>
      {/* Breadcrumb Navigation */}
      <div className="border-b" style={{ borderColor: '#E5E5E5' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" style={{ color: '#666' }}>Home</Link>
            <ChevronRight size={14} style={{ color: '#999' }} />
            <Link to="/products" style={{ color: '#666' }}>Marketplace</Link>
            <ChevronRight size={14} style={{ color: '#999' }} />
            <span style={{ color: '#333', fontWeight: 500 }} className="truncate max-w-xs">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="rounded-xl border overflow-hidden mb-4" style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center p-8">
                {product.coverImage ? (
                  <img 
                    src={product.coverImage} 
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={48} style={{ color: '#9CA3AF' }} />
                    <p className="text-sm mt-2" style={{ color: '#999' }}>No image available</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg border overflow-hidden transition-all ${
                    selectedImage === i ? 'ring-2 ring-[#CC973C]' : ''
                  }`}
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    {product.coverImage ? (
                      <img 
                        src={product.coverImage} 
                        alt={`Thumbnail ${i}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={16} style={{ color: '#9CA3AF' }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Title & Badges */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl font-bold" style={{ color: '#333' }}>
                    {product.title}
                  </h1>
                  {product.isNew && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                      <Sparkles size={12} />
                      New
                    </span>
                  )}
                  {product.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                      <Award size={12} />
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: category.bg, color: category.text }}>
                    {getCategoryIcon(product.category)}
                    <span className="capitalize">{product.category}</span>
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-current" style={{ color: '#CC973C' }} />
                    <span className="font-medium" style={{ color: '#333' }}>4.5</span>
                    <span className="text-sm" style={{ color: '#666' }}>({reviews.length} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users size={16} style={{ color: '#666' }} />
                    <span className="text-sm" style={{ color: '#666' }}>{product.purchased || 124}+ sold</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  className="p-3 rounded-lg border transition-all hover:scale-105 hover:bg-gray-50"
                  style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}
                  title="Add to wishlist"
                >
                  <Heart 
                    size={20} 
                    className={isInWishlist ? 'fill-current' : ''}
                    style={{ color: isInWishlist ? '#CC973C' : '#666' }}
                  />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 rounded-lg border transition-all hover:scale-105 hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}
                    title="Share"
                  >
                    <Share2 size={20} style={{ color: '#666' }} />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 top-12 z-10 w-48 rounded-lg shadow-lg border" style={{ 
                      backgroundColor: '#FCFCFB',
                      borderColor: '#E5E5E5'
                    }}>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-t"
                        style={{ borderColor: '#E5E5E5' }}
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold" style={{ color: '#1E1E59' }}>
                  {formatCurrency(product.price)}
                </p>
                {product.originalPrice && (
                  <>
                    <p className="text-lg line-through" style={{ color: '#999' }}>
                      {formatCurrency(product.originalPrice)}
                    </p>
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                      Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2" style={{ color: '#333' }}>Description</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                {product.description || "No description available for this product."}
              </p>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2" style={{ color: '#333' }}>Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm" style={{ color: '#666' }}>
                      <CheckCircle size={16} style={{ color: '#10B981' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-lg border text-center" style={{ borderColor: '#E5E5E5' }}>
                <File size={18} className="mx-auto mb-1" style={{ color: '#666' }} />
                <p className="text-xs" style={{ color: '#999' }}>Format</p>
                <p className="text-sm font-medium" style={{ color: '#333' }}>{specs.format || 'PDF'}</p>
              </div>
              <div className="p-3 rounded-lg border text-center" style={{ borderColor: '#E5E5E5' }}>
                <FileText size={18} className="mx-auto mb-1" style={{ color: '#666' }} />
                <p className="text-xs" style={{ color: '#999' }}>Pages</p>
                <p className="text-sm font-medium" style={{ color: '#333' }}>{specs.pages || '15-20'}</p>
              </div>
              <div className="p-3 rounded-lg border text-center" style={{ borderColor: '#E5E5E5' }}>
                <Clock size={18} className="mx-auto mb-1" style={{ color: '#666' }} />
                <p className="text-xs" style={{ color: '#999' }}>Updated</p>
                <p className="text-sm font-medium" style={{ color: '#333' }}>{specs.lastUpdated || '2024'}</p>
              </div>
              <div className="p-3 rounded-lg border text-center" style={{ borderColor: '#E5E5E5' }}>
                <Shield size={18} className="mx-auto mb-1" style={{ color: '#666' }} />
                <p className="text-xs" style={{ color: '#999' }}>Jurisdiction</p>
                <p className="text-sm font-medium" style={{ color: '#333' }}>{specs.jurisdiction || 'Kenya'}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center p-2 rounded-lg border"
                  style={{ borderColor: '#E5E5E5' }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1">
                <PayButton
                  amount={product.price * quantity}
                  purpose={`${product.title}${quantity > 1 ? ` (x${quantity})` : ''}`}
                />
              </div>
              
              {product.previewUrl && (
                <button
                  onClick={() => setPreview(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#E5E5E5', color: '#333' }}
                >
                  <Eye size={18} />
                  Preview Sample
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="p-4 rounded-lg border" style={{ borderColor: '#E5E5E5', backgroundColor: '#F9FAFB' }}>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle size={14} style={{ color: '#10B981' }} />
                  <span style={{ color: '#666' }}>Instant Download</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={14} style={{ color: '#10B981' }} />
                  <span style={{ color: '#666' }}>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon size={14} style={{ color: '#10B981' }} />
                  <span style={{ color: '#666' }}>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border rounded-xl overflow-hidden mb-12" style={{ borderColor: '#E5E5E5', backgroundColor: '#FCFCFB' }}>
          <div className="flex overflow-x-auto border-b" style={{ borderColor: '#E5E5E5' }}>
            {['description', 'specifications', 'reviews', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap transition-all ${
                  activeTab === tab ? 'border-b-2' : 'hover:bg-gray-50'
                }`}
                style={{
                  borderColor: activeTab === tab ? '#CC973C' : 'transparent',
                  color: activeTab === tab ? '#CC973C' : '#666'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p style={{ color: '#666' }}>{product.longDescription || product.description || "No detailed description available."}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3" style={{ color: '#333' }}>Document Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt style={{ color: '#666' }}>Format</dt>
                      <dd style={{ color: '#333' }}>{specs.format || 'PDF'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt style={{ color: '#666' }}>Pages</dt>
                      <dd style={{ color: '#333' }}>{specs.pages || '15-20'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt style={{ color: '#666' }}>Language</dt>
                      <dd style={{ color: '#333' }}>{specs.language || 'English'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt style={{ color: '#666' }}>Jurisdiction</dt>
                      <dd style={{ color: '#333' }}>{specs.jurisdiction || 'Kenya'}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium mb-3" style={{ color: '#333' }}>Included Files</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <FileText size={14} style={{ color: '#10B981' }} />
                      <span style={{ color: '#666' }}>Word Document (.docx)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <File size={14} style={{ color: '#10B981' }} />
                      <span style={{ color: '#666' }}>PDF Document</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText size={14} style={{ color: '#10B981' }} />
                      <span style={{ color: '#666' }}>Instructions Guide</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-6 p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-center">
                    <p className="text-3xl font-bold" style={{ color: '#333' }}>4.5</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= 4 ? 'fill-current' : ''}
                          style={{ color: star <= 4 ? '#CC973C' : '#E5E5E5' }}
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>{reviews.length} reviews</p>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 text-sm">
                        <span style={{ color: '#666' }}>{rating}★</span>
                        <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#E5E5E5' }}>
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              backgroundColor: '#CC973C',
                              width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%`
                            }}
                          ></div>
                        </div>
                        <span style={{ color: '#666' }}>
                          {rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: '#333' }}>{review.user}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'fill-current' : ''}
                              style={{ color: i < review.rating ? '#CC973C' : '#E5E5E5' }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: '#999' }}>{formatDate(review.date)}</span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: '#666' }}>{review.comment}</p>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-xs hover:underline" style={{ color: '#666' }}>
                        <ThumbsUp size={12} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {[
                  { q: "How do I download after purchase?", a: "After payment, you'll receive an email with download links. You can also access your purchases from your account dashboard." },
                  { q: "Can I edit the documents?", a: "Yes, all documents come in editable Word format so you can customize them to your needs." },
                  { q: "Are these documents legally valid in Kenya?", a: "Yes, all our documents are drafted by Kenyan lawyers and comply with local laws." },
                  { q: "What if I need modifications?", a: "You can contact our support team for assistance with document modifications." },
                ].map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-1" style={{ color: '#333' }}>{faq.q}</h4>
                    <p className="text-sm" style={{ color: '#666' }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related._id}
                  to={`/products/${related._id}`}
                  className="block rounded-xl border p-4 transition-all hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#FCFCFB', borderColor: '#E5E5E5' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                      {getCategoryIcon(related.category)}
                    </div>
                    <span className="text-sm font-medium line-clamp-1" style={{ color: '#333' }}>{related.title}</span>
                  </div>
                  <p className="text-xs mb-2 line-clamp-2" style={{ color: '#666' }}>
                    {related.description || "Legal document template"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: '#1E1E59' }}>
                      {formatCurrency(related.price)}
                    </span>
                    <span className="text-xs capitalize" style={{ color: '#999' }}>
                      {related.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {preview && (
          <ProductPreview
            product={product}
            close={() => setPreview(false)}
          />
        )}
      </div>
    </div>
  );
}