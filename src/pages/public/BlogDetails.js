// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../../services/api";
// import {
//   Calendar,
//   User,
//   Clock,
//   Eye,
//   Tag,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Mail,
//   ArrowLeft,
//   BookOpen,
//   ChevronRight,
//   Heart,
//   MessageCircle,
//   Award,
//   Sparkles,
//   Printer,
//   Download
// } from "lucide-react";

// export default function BlogDetails() {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     loadBlog();
//     window.scrollTo(0, 0);
//   }, [slug]);

//   const loadBlog = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/blogs/${slug}`);
//       setBlog(res.data);
      
//       // Load related posts (same category)
//       if (res.data.category) {
//         const relatedRes = await api.get(`/blogs?category=${res.data.category}&limit=3`);
//         setRelatedPosts(relatedRes.data.filter(b => b._id !== res.data._id).slice(0, 3));
//       }
//     } catch (error) {
//       console.error("Failed to load blog:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const readingTime = (content) => {
//     const wordsPerMinute = 200;
//     const wordCount = content?.split(/\s+/).length || 0;
//     const minutes = Math.ceil(wordCount / wordsPerMinute);
//     return `${minutes} min read`;
//   };

//   const handleShare = (platform) => {
//     const url = window.location.href;
//     const text = `Check out this article: ${blog?.title}`;
    
//     switch(platform) {
//       case 'facebook':
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
//         break;
//       case 'twitter':
//         window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
//         break;
//       case 'linkedin':
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
//         break;
//       case 'email':
//         window.location.href = `mailto:?subject=${blog?.title}&body=${text}%0A%0A${url}`;
//         break;
//       default:
//         navigator.clipboard.writeText(url);
//         alert('Link copied to clipboard!');
//     }
//     setShowShareMenu(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAF8' }}>
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-t-[#CA9D52] border-[#00124E] rounded-full animate-spin mb-4"></div>
//           <p className="text-lg" style={{ color: '#00124E' }}>Loading article...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FAFAF8' }}>
//         <div className="text-center max-w-md">
//           <BookOpen size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
//           <h2 className="text-2xl font-bold mb-2" style={{ color: '#00124E' }}>Article Not Found</h2>
//           <p className="mb-6" style={{ color: '#666' }}>The article you're looking for doesn't exist or has been removed.</p>
//           <Link
//             to="/blog"
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
//             style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
//           >
//             <ArrowLeft size={18} />
//             Back to Blog
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
//       {/* Breadcrumb Navigation */}
//       <div className="border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8' }}>
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center gap-2 text-sm flex-wrap">
//             <Link to="/" style={{ color: '#666' }}>Home</Link>
//             <ChevronRight size={14} style={{ color: '#999' }} />
//             <Link to="/blog" style={{ color: '#666' }}>Blog</Link>
//             <ChevronRight size={14} style={{ color: '#999' }} />
//             <span style={{ color: '#00124E', fontWeight: 500 }} className="truncate max-w-xs">{blog.title}</span>
//           </div>
//         </div>
//       </div>

//       {/* Article Header */}
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         {/* Category & Featured Badge */}
//         <div className="flex items-center gap-3 mb-6">
//           <span 
//             className="px-4 py-1.5 rounded-full text-sm font-medium"
//             style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}
//           >
//             {blog.category || 'Legal Insights'}
//           </span>
//           {blog.featured && (
//             <span className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
//               <Award size={14} />
//               Featured
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#00124E' }}>
//           {blog.title}
//         </h1>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
//               <User size={18} style={{ color: '#CA9D52' }} />
//             </div>
//             <div>
//               <p className="font-medium" style={{ color: '#00124E' }}>{blog.author?.fullName || 'CR Advocates'}</p>
//               <p className="text-xs" style={{ color: '#666' }}>Legal Expert</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <span className="flex items-center gap-1" style={{ color: '#666' }}>
//               <Calendar size={16} style={{ color: '#CA9D52' }} />
//               {formatDate(blog.createdAt)}
//             </span>
//             <span className="flex items-center gap-1" style={{ color: '#666' }}>
//               <Clock size={16} style={{ color: '#CA9D52' }} />
//               {readingTime(blog.content)}
//             </span>
//             {blog.views > 0 && (
//               <span className="flex items-center gap-1" style={{ color: '#666' }}>
//                 <Eye size={16} style={{ color: '#CA9D52' }} />
//                 {blog.views} views
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Cover Image */}
//         {blog.coverImage && (
//           <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
//             <img 
//               src={blog.coverImage} 
//               alt={blog.title}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         )}

//         {/* Action Bar */}
//         <div className="flex items-center justify-between mb-8 pb-8 border-b" style={{ borderColor: '#E5E5E5' }}>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setLiked(!liked)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-gray-50"
//               style={{ borderColor: '#E5E5E5' }}
//             >
//               <Heart 
//                 size={18} 
//                 className={liked ? 'fill-current' : ''}
//                 style={{ color: liked ? '#CA9D52' : '#666' }}
//               />
//               <span style={{ color: '#666' }}>Helpful</span>
//             </button>
            
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-gray-50" style={{ borderColor: '#E5E5E5' }}>
//               <MessageCircle size={18} style={{ color: '#666' }} />
//               <span style={{ color: '#666' }}>Comment</span>
//             </button>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowShareMenu(!showShareMenu)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-gray-50"
//               style={{ borderColor: '#E5E5E5' }}
//             >
//               <Share2 size={18} style={{ color: '#666' }} />
//               <span style={{ color: '#666' }}>Share</span>
//             </button>
            
//             {showShareMenu && (
//               <div className="absolute right-0 top-12 z-10 w-48 rounded-lg shadow-xl border" style={{ 
//                 backgroundColor: '#FAFAF8',
//                 borderColor: '#E5E5E5'
//               }}>
//                 <button
//                   onClick={() => handleShare('facebook')}
//                   className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <Facebook size={16} style={{ color: '#1877F2' }} />
//                   <span style={{ color: '#00124E' }}>Facebook</span>
//                 </button>
//                 <button
//                   onClick={() => handleShare('twitter')}
//                   className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <Twitter size={16} style={{ color: '#1DA1F2' }} />
//                   <span style={{ color: '#00124E' }}>Twitter</span>
//                 </button>
//                 <button
//                   onClick={() => handleShare('linkedin')}
//                   className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <Linkedin size={16} style={{ color: '#0A66C2' }} />
//                   <span style={{ color: '#00124E' }}>LinkedIn</span>
//                 </button>
//                 <button
//                   onClick={() => handleShare('email')}
//                   className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
//                 >
//                   <Mail size={16} style={{ color: '#EA4335' }} />
//                   <span style={{ color: '#00124E' }}>Email</span>
//                 </button>
//                 <button
//                   onClick={() => handleShare('copy')}
//                   className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors border-t"
//                   style={{ borderColor: '#E5E5E5' }}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                   </svg>
//                   <span style={{ color: '#00124E' }}>Copy Link</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Article Content */}
//         <div 
//           className="prose prose-lg max-w-none mb-12"
//           style={{ color: '#00124E' }}
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />

//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex items-center gap-3 mb-12">
//             <Tag size={18} style={{ color: '#CA9D52' }} />
//             <div className="flex flex-wrap gap-2">
//               {blog.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 rounded-full text-xs"
//                   style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)', color: '#CA9D52' }}
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Author Bio */}
//         <div className="p-8 rounded-2xl mb-12" style={{ backgroundColor: '#F9FAFB' }}>
//           <div className="flex items-start gap-6">
//             <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
//               <User size={32} style={{ color: '#CA9D52' }} />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-xl font-bold mb-2" style={{ color: '#00124E' }}>
//                 {blog.author?.fullName || 'CR Advocates'}
//               </h3>
//               <p className="text-sm mb-4" style={{ color: '#666' }}>
//                 {blog.author?.bio || 'Legal expert at CR Advocates LLP, providing insights on legal developments across Africa.'}
//               </p>
//               <Link
//                 to="/team"
//                 className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
//                 style={{ color: '#CA9D52' }}
//               >
//                 View Profile
//                 <ChevronRight size={14} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Related Posts */}
//         {relatedPosts.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-bold mb-8" style={{ color: '#00124E' }}>
//               Related Articles
//             </h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               {relatedPosts.map((post) => (
//                 <Link
//                   key={post._id}
//                   to={`/blog/${post.slug}`}
//                   className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
//                 >
//                   <img 
//                     src={post.coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
//                     alt={post.title}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="font-semibold mb-2 group-hover:text-[#CA9D52] transition-colors line-clamp-2" style={{ color: '#00124E' }}>
//                       {post.title}
//                     </h3>
//                     <div className="flex items-center gap-2 text-xs" style={{ color: '#666' }}>
//                       <Calendar size={10} style={{ color: '#CA9D52' }} />
//                       {formatDate(post.createdAt)}
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Back to Blog Link */}
//         <div className="text-center mt-16">
//           <Link
//             to="/blog"
//             className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all hover:opacity-90"
//             style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
//           >
//             <ArrowLeft size={18} />
//             Back to All Articles
//           </Link>
//         </div>
//       </div>

//       {/* Print/Download Actions */}
//       <div className="fixed bottom-8 right-8 flex flex-col gap-3">
//         <button
//           onClick={() => window.print()}
//           className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
//           style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
//           title="Print Article"
//         >
//           <Printer size={20} />
//         </button>
//         <button
//           className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
//           style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
//           title="Download PDF"
//         >
//           <Download size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }