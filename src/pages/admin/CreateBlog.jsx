import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RichEditor from "../../components/cards/RichText";
import api from "../../services/api";
import {
  FileText,
  Image as ImageIcon,
  Tag,
  Calendar,
  Globe,
  Lock,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  ArrowLeft,
  Save,
  Send,
  Eye,
  Sparkles,
  Loader
} from "lucide-react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [category, setCategory] = useState("Legal News");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);

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

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    
    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e, publishStatus) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");
      
      // Validate required fields
      if (!title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }
      
      if (!content.trim()) {
        setError("Content is required");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt || title.substring(0, 150));
      formData.append("content", content);
      formData.append("category", category);
      formData.append("status", publishStatus || status);
      formData.append("featured", featured);
      
      // Add tags if provided
      if (tags) {
        const tagsArray = tags.split(',').map(tag => tag.trim());
        formData.append("tags", JSON.stringify(tagsArray));
      }
      
      if (cover) formData.append("cover", cover);

      await api.post("/blogs", formData);
      
      setSuccess(`Blog post ${publishStatus === 'published' ? 'published' : 'saved as draft'} successfully!`);
      
      // Redirect after success
      setTimeout(() => {
        navigate("/admin/blogs");
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog post. Please try again.");
      console.error("Create error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/blogs')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Go back"
              >
                <ArrowLeft size={20} style={{ color: '#00124E' }} />
              </button>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#00124E' }}>
                  Create Blog Post
                </h1>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Write and publish legal articles for your audience
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#00124E' }}
              >
                <Eye size={18} />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={loading}
                className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#00124E' }}
              >
                <Save size={18} />
                Save Draft
              </button>
              
              <button
                onClick={(e) => handleSubmit(e, 'published')}
                disabled={loading}
                className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
            <AlertCircle size={20} style={{ color: '#DC2626' }} />
            <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
            <button onClick={() => setError("")}>
              <X size={20} style={{ color: '#DC2626' }} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0' }}>
            <CheckCircle size={20} style={{ color: '#065F46' }} />
            <span className="flex-1" style={{ color: '#065F46' }}>{success}</span>
          </div>
        )}

        {previewMode ? (
          /* Preview Mode */
          <div className="bg-white rounded-xl border p-8" style={{ borderColor: '#E5E5E5' }}>
            {/* Cover Image */}
            {coverPreview && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={coverPreview} 
                  alt={title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={14} style={{ color: '#CA9D52' }} />
                <span style={{ color: '#666' }}>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag size={14} style={{ color: '#CA9D52' }} />
                <span style={{ color: '#666' }}>{category}</span>
              </div>
              {status === 'published' ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
                  <Globe size={12} />
                  Published
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                  <Lock size={12} />
                  Draft
                </div>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#00124E' }}>
              {title || 'Untitled Post'}
            </h1>
            
            {/* Excerpt */}
            {excerpt && (
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                <p className="text-lg italic" style={{ color: '#666' }}>{excerpt}</p>
              </div>
            )}
            
            {/* Content */}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }}
              style={{ color: '#00124E' }}
            />
          </div>
        ) : (
          /* Edit Mode */
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                Blog Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Understanding Corporate Law in Kenya"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-lg"
                style={{ 
                  borderColor: '#E5E5E5',
                  backgroundColor: '#FAFAF8',
                  color: '#00124E'
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g., corporate law, business, compliance"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#E5E5E5',
                  backgroundColor: '#FAFAF8',
                  color: '#00124E'
                }}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                Featured Image
              </label>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div 
                    className="w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center border-2"
                    style={{ 
                      borderColor: '#CA9D52',
                      backgroundColor: 'rgba(202, 157, 82, 0.1)'
                    }}
                  >
                    {coverPreview ? (
                      <img 
                        src={coverPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={32} style={{ color: '#CA9D52' }} />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="cover-upload"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                  <label
                    htmlFor="cover-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all hover:bg-gray-50"
                    style={{ borderColor: '#E5E5E5', color: '#00124E' }}
                  >
                    <ImageIcon size={16} />
                    Choose Image
                  </label>
                  <p className="text-xs mt-2" style={{ color: '#666' }}>
                    Recommended: 1200x630px, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                Excerpt (Optional)
              </label>
              <textarea
                placeholder="Brief summary of your blog post..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#E5E5E5',
                  backgroundColor: '#FAFAF8',
                  color: '#00124E'
                }}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
              <p className="text-xs mt-1" style={{ color: '#999' }}>
                If not provided, the first 150 characters will be used.
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                Content *
              </label>
              <RichEditor
                content={content}
                setContent={setContent}
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: '#CA9D52' }}
              />
              <label htmlFor="featured" className="text-sm flex items-center gap-1" style={{ color: '#00124E' }}>
                <Sparkles size={14} style={{ color: '#CA9D52' }} />
                Feature this post on the homepage
              </label>
            </div>
          </form>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t mt-8" style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="px-6 py-2 rounded-lg border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E5E5E5', color: '#666' }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading}
              className="px-6 py-2 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E5E5E5', color: '#00124E' }}
            >
              <Save size={16} />
              Save Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={loading}
              className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Publish Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}