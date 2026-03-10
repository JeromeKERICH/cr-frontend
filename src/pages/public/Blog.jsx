import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  Tag,
  Clock,
  Eye,
  ArrowRight,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  Award,
  Globe
} from "lucide-react";

export default function BlogPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featuredPost, setFeaturedPost] = useState(null);

  const categories = [
    "All",
    "Legal News",
    "Corporate Law",
    "Employment Law",
    "Intellectual Property",
    "Dispute Resolution",
    "Business Advisory",
    "Legal Tech",
    "Industry Insights"
  ];

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      const publishedBlogs = res.data.filter(b => b.status === 'published');
      setBlogs(publishedBlogs);
      
      // Set featured post (first one or marked as featured)
      const featured = publishedBlogs.find(b => b.featured) || publishedBlogs[0];
      setFeaturedPost(featured);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = blogs;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.title?.toLowerCase().includes(term) ||
        b.excerpt?.toLowerCase().includes(term) ||
        b.content?.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(b => b.category === selectedCategory);
    }
    
    setFilteredBlogs(result);
  }, [searchTerm, selectedCategory, blogs]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const readingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#CA9D52] border-[#00124E] rounded-full animate-spin mb-4"></div>
          <p className="text-lg" style={{ color: '#00124E' }}>Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Hero Section */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           
          }}
      >
     <div className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0,18,78,0.92) 0%, rgba(202,157,82,0.3) 100%)'
          }}></div>

        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 animate-float-slow">
            <BookOpen size={120} style={{ color: '#CA9D52' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
            <TrendingUp size={100} style={{ color: '#CA9D52' }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FAFAF8' }}>
              Legal Insights
            </h1>
            <p className="text-lg mb-8" style={{ color: '#CA9D52' }}>
              Expert analysis and commentary on legal developments across Africa
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: '#FAFAF8',
                  color: '#00124E'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={18} style={{ color: '#CA9D52' }} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? "all" : category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${(selectedCategory === (category === "All" ? "all" : category))
                    ? 'bg-[#CA9D52] text-[#00124E]' 
                    : 'bg-white text-[#666] hover:bg-[#CA9D52]/10'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
          
          <p className="text-sm" style={{ color: '#666' }}>
            Showing <span style={{ color: '#CA9D52', fontWeight: 600 }}>{filteredBlogs.length}</span> articles
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && filteredBlogs.length > 0 && !searchTerm && selectedCategory === "all" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} style={{ color: '#CA9D52' }} />
              <h2 className="text-xl font-semibold" style={{ color: '#00124E' }}>Featured Article</h2>
            </div>
            
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img 
                    src={featuredPost.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#CA9D52', color: '#00124E' }}>
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <span className="flex items-center gap-1" style={{ color: '#CA9D52' }}>
                      <Calendar size={14} />
                      {formatDate(featuredPost.createdAt)}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: '#666' }}>
                      <Clock size={14} />
                      {readingTime(featuredPost.content)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#CA9D52] transition-colors" style={{ color: '#00124E' }}>
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt || featuredPost.content?.substring(0, 200) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                        <User size={14} style={{ color: '#CA9D52' }} />
                      </div>
                      <span className="text-sm" style={{ color: '#666' }}>{featuredPost.author?.name || 'CR Advocates'}</span>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: '#CA9D52' }}>
                      Read Article
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-xl font-medium mb-2" style={{ color: '#00124E' }}>No articles found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Check back soon for new legal insights"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#CA9D52', color: '#00124E' }}>
                      {blog.category || 'Legal News'}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="flex items-center gap-1" style={{ color: '#CA9D52' }}>
                      <Calendar size={12} />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: '#666' }}>
                      <Clock size={12} />
                      {readingTime(blog.content)}
                    </span>
                    {blog.views > 0 && (
                      <span className="flex items-center gap-1" style={{ color: '#666' }}>
                        <Eye size={12} />
                        {blog.views}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#CA9D52] transition-colors line-clamp-2" style={{ color: '#00124E' }}>
                    {blog.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt || blog.content?.substring(0, 120) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                        <User size={10} style={{ color: '#CA9D52' }} />
                      </div>
                      <span className="text-xs" style={{ color: '#666' }}>{blog.author?.name || 'CR Advocates'}</span>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: '#CA9D52' }}>
                      Read More
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 p-12 rounded-3xl" style={{ backgroundColor: '#00124E' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#FAFAF8' }}>
              Stay Informed with Legal Insights
            </h2>
            <p className="mb-8" style={{ color: '#CA9D52' }}>
              Subscribe to receive our latest articles and legal updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none"
                style={{ backgroundColor: '#FAFAF8', color: '#00124E' }}
              />
              <button
                className="px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs mt-4" style={{ color: '#FAFAF8', opacity: 0.7 }}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}