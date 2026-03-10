import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Minus,
  Code,
  CheckSquare,
  WrapText,
  Eraser,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Link,
  Unlink,
  Image,
  Table,
  Eye,
  Edit3
} from "lucide-react";
import { useState } from "react";

export default function RichEditor({ content, setContent, placeholder = "Start writing..." }) {
  const [isPreview, setIsPreview] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-6',
        placeholder: placeholder,
      },
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, active, disabled, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-lg transition-all duration-200 relative group
        ${active ? 'bg-[#CA9D52] text-[#00124E]' : 'hover:bg-[#CA9D52]/10 text-[#00124E]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
      {title && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-[#00124E] text-[#FAFAF8] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
          {title}
        </span>
      )}
    </button>
  );

  const Divider = () => (
    <div className="w-px h-6 mx-1" style={{ backgroundColor: '#E5E5E5' }}></div>
  );

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#E5E5E5' }}>
      {/* Toolbar Toggle */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FAFAF8] border-b" style={{ borderColor: '#E5E5E5' }}>
        <div className="flex items-center gap-2">
          <Edit3 size={18} style={{ color: '#00124E' }} />
          <span className="text-sm font-medium" style={{ color: '#00124E' }}>Rich Text Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowToolbar(!showToolbar)}
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#CA9D52]/10"
            style={{ color: '#00124E' }}
          >
            {showToolbar ? 'Hide Toolbar' : 'Show Toolbar'}
          </button>
          <button
            onClick={togglePreview}
            className={`p-2 rounded-lg transition-colors ${isPreview ? 'bg-[#CA9D52] text-[#00124E]' : 'hover:bg-[#CA9D52]/10 text-[#00124E]'}`}
            title={isPreview ? 'Edit Mode' : 'Preview Mode'}
          >
            {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {showToolbar && !isPreview && (
        <div className="bg-[#FAFAF8] border-b p-2 flex flex-wrap items-center gap-1" style={{ borderColor: '#E5E5E5' }}>
          {/* Text Style Group */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </MenuButton>

          <Divider />

          {/* Headings Group */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive('paragraph')}
            title="Paragraph"
          >
            <Pilcrow size={18} />
          </MenuButton>

          <Divider />

          {/* Lists Group */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </MenuButton>

          <Divider />

          {/* Block Elements */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </MenuButton>

          <Divider />

          {/* History Group */}
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </MenuButton>

          <Divider />

          {/* Clear Formatting */}
          <MenuButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <Eraser size={18} />
          </MenuButton>
        </div>
      )}

      {/* Editor Content */}
      <div 
        className="bg-white transition-all"
        style={{ minHeight: '300px' }}
      >
        {isPreview ? (
          <div 
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl p-6 min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: content || '<p>No content to preview</p>' }}
            style={{ color: '#00124E' }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#FAFAF8] border-t px-4 py-2 flex flex-wrap items-center justify-between gap-4 text-xs" style={{ borderColor: '#E5E5E5' }}>
        <div className="flex items-center gap-4">
          <span style={{ color: '#666' }}>
            Words: {editor.storage.characterCount.words()}
          </span>
          <span style={{ color: '#666' }}>
            Characters: {editor.storage.characterCount.characters()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: editor.isFocused ? '#10B981' : '#9CA3AF' }}
          ></div>
          <span style={{ color: '#666' }}>
            {editor.isFocused ? 'Editing' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="bg-[#FAFAF8] border-t px-4 py-2 text-xs flex flex-wrap gap-4" style={{ borderColor: '#E5E5E5' }}>
        <span style={{ color: '#999' }}>Ctrl+B: Bold</span>
        <span style={{ color: '#999' }}>Ctrl+I: Italic</span>
        <span style={{ color: '#999' }}>Ctrl+Z: Undo</span>
        <span style={{ color: '#999' }}>Ctrl+Y: Redo</span>
        <span style={{ color: '#999' }}>Ctrl+Shift+7: Numbered List</span>
        <span style={{ color: '#999' }}>Ctrl+Shift+8: Bullet List</span>
      </div>

      {/* Custom Styles for TipTap */}
      <style jsx>{`
        :global(.ProseMirror) {
          outline: none;
        }
        
        :global(.ProseMirror p) {
          margin: 0.5em 0;
          color: #00124E;
        }
        
        :global(.ProseMirror h1) {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #00124E;
        }
        
        :global(.ProseMirror h2) {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #00124E;
        }
        
        :global(.ProseMirror h3) {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #00124E;
        }
        
        :global(.ProseMirror ul),
        :global(.ProseMirror ol) {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        :global(.ProseMirror blockquote) {
          border-left: 3px solid #CA9D52;
          padding-left: 1em;
          margin: 0.5em 0;
          font-style: italic;
        }
        
        :global(.ProseMirror code) {
          background-color: #F3F4F6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
        }
        
        :global(.ProseMirror pre) {
          background-color: #F3F4F6;
          padding: 1em;
          border-radius: 5px;
          overflow-x: auto;
        }
        
        :global(.ProseMirror pre code) {
          background-color: transparent;
          padding: 0;
        }
        
        :global(.ProseMirror hr) {
          border: none;
          border-top: 1px solid #E5E5E5;
          margin: 1em 0;
        }
        
        :global(.ProseMirror:focus) {
          outline: none;
        }
        
        :global(.ProseMirror p.is-editor-empty:first-child::before) {
          content: attr(data-placeholder);
          float: left;
          color: #9CA3AF;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}