import React, { useEffect, useRef } from 'react';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link, Image, Smile
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const insertEmoji = (emoji: string) => {
    execCommand('insertText', emoji);
  };

  return (
    <div className={`border border-gray-600 rounded-lg bg-gray-800 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-600 bg-gray-750">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('strikeThrough')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1"></div>

        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1"></div>

        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-gray-600 mx-1"></div>

        <button
          type="button"
          onClick={insertLink}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          onClick={insertImage}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </button>

        <div className="relative group">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors duration-200"
            title="Insert Emoji"
          >
            <Smile className="h-4 w-4" />
          </button>
          <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="flex space-x-1">
              {['😀', '😂', '🤔', '👍', '❤️', '🔥'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="p-1 hover:bg-gray-600 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 text-white focus:outline-none"
        style={{ 
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
        }
        [contenteditable] a {
          color: #F97316;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}