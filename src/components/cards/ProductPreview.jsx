import { useState } from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  AlertCircle,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Printer,
  Share2
} from "lucide-react";

export default function ProductPreview({ product, close }) {
  const [zoom, setZoom] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(5); // This would come from actual PDF
  const [error, setError] = useState(false);

  if (!product) return null;

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  const handleRotate = () => {
    setRotate((rotate + 90) % 360);
  };

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = product.previewUrl;
    link.download = `${product.title.replace(/\s+/g, '_')}_preview.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const handlePrint = () => {
    const printWindow = window.open(product.previewUrl);
    printWindow?.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} preview`,
          url: product.previewUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(product.previewUrl);
      alert('Preview link copied to clipboard!');
    }
  };

  const handleIframeError = () => {
    setError(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div 
        className={`
          bg-white rounded-xl shadow-2xl flex flex-col
          transition-all duration-300
          ${fullscreen ? 'w-full h-full' : 'max-w-5xl w-full max-h-[90vh]'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center gap-3">
            <FileText size={20} style={{ color: '#1E1E59' }} />
            <div>
              <h2 className="font-semibold" style={{ color: '#333' }}>
                {product.title}
              </h2>
              <p className="text-xs" style={{ color: '#666' }}>
                Preview • Page {page} of {totalPages}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={zoom <= 50}
              title="Zoom out"
            >
              <ZoomOut size={18} style={{ color: '#666' }} />
            </button>
            <span className="text-sm w-16 text-center" style={{ color: '#333' }}>
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={zoom >= 200}
              title="Zoom in"
            >
              <ZoomIn size={18} style={{ color: '#666' }} />
            </button>
            
            <div className="w-px h-6 mx-1" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            {/* Rotate */}
            <button
              onClick={handleRotate}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Rotate"
            >
              <RotateCw size={18} style={{ color: '#666' }} />
            </button>
            
            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? (
                <Minimize2 size={18} style={{ color: '#666' }} />
              ) : (
                <Maximize2 size={18} style={{ color: '#666' }} />
              )}
            </button>
            
            <div className="w-px h-6 mx-1" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Download preview"
            >
              <Download size={18} style={{ color: '#666' }} />
            </button>
            
            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Print"
            >
              <Printer size={18} style={{ color: '#666' }} />
            </button>
            
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Share"
            >
              <Share2 size={18} style={{ color: '#666' }} />
            </button>
            
            <div className="w-px h-6 mx-1" style={{ backgroundColor: '#E5E5E5' }}></div>
            
            {/* Close */}
            <button
              onClick={close}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Close"
            >
              <X size={20} style={{ color: '#666' }} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50" style={{ minHeight: '500px' }}>
          {error ? (
            <div className="h-full flex flex-col items-center justify-center">
              <AlertCircle size={48} style={{ color: '#DC2626' }} />
              <h3 className="text-lg font-medium mt-4" style={{ color: '#333' }}>
                Preview Unavailable
              </h3>
              <p className="text-sm mt-2 text-center max-w-md" style={{ color: '#666' }}>
                The preview file could not be loaded. You can try downloading it instead.
              </p>
              <button
                onClick={handleDownload}
                className="mt-4 px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: '#CC973C', color: '#171538' }}
              >
                <Download size={18} />
                Download Preview
              </button>
            </div>
          ) : (
            <div 
              className="h-full transition-all duration-300"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotate}deg)`,
                transformOrigin: 'center',
                height: '100%'
              }}
            >
              <iframe
                src={product.previewUrl}
                className="w-full h-full rounded-lg border"
                style={{ borderColor: '#E5E5E5' }}
                title={`${product.title} preview`}
                onError={handleIframeError}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={page <= 1}
            >
              <ChevronLeft size={18} style={{ color: '#666' }} />
            </button>
            <span className="text-sm" style={{ color: '#333' }}>
              Page <strong>{page}</strong> of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={page >= totalPages}
            >
              <ChevronRight size={18} style={{ color: '#666' }} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#E8F4FD', color: '#1E1E59' }}>
              Preview Only
            </span>
            <span className="text-xs" style={{ color: '#999' }}>
              {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
      `}</style>
    </div>
  );
}