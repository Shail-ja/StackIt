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
  <div className={`rounded-xl border border-gray-700 bg-gray-800 shadow-inner ${className}`}>
    {/* Toolbar */}
    <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-700 bg-gray-750 rounded-t-xl">
      {/* Formatting Buttons */}
      {[
        { icon: <Bold className="h-4 w-4" />, cmd: 'bold', title: 'Bold' },
        { icon: <Italic className="h-4 w-4" />, cmd: 'italic', title: 'Italic' },
        { icon: <Strikethrough className="h-4 w-4" />, cmd: 'strikeThrough', title: 'Strikethrough' },
      ].map(({ icon, cmd, title }, i) => (
        <button
          key={i}
          type="button"
          onClick={() => execCommand(cmd)}
          title={title}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white rounded transition duration-200"
        >
          {icon}
        </button>
      ))}

      {/* Divider */}
      <span className="w-px h-6 bg-gray-700 mx-1"></span>

      {/* List Buttons */}
      {[
        { icon: <List className="h-4 w-4" />, cmd: 'insertUnorderedList', title: 'Bullet List' },
        { icon: <ListOrdered className="h-4 w-4" />, cmd: 'insertOrderedList', title: 'Numbered List' },
      ].map(({ icon, cmd, title }, i) => (
        <button
          key={i}
          type="button"
          onClick={() => execCommand(cmd)}
          title={title}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white rounded transition duration-200"
        >
          {icon}
        </button>
      ))}

      <span className="w-px h-6 bg-gray-700 mx-1"></span>

      {/* Alignment */}
      {[
        { icon: <AlignLeft className="h-4 w-4" />, cmd: 'justifyLeft', title: 'Align Left' },
        { icon: <AlignCenter className="h-4 w-4" />, cmd: 'justifyCenter', title: 'Align Center' },
        { icon: <AlignRight className="h-4 w-4" />, cmd: 'justifyRight', title: 'Align Right' },
      ].map(({ icon, cmd, title }, i) => (
        <button
          key={i}
          type="button"
          onClick={() => execCommand(cmd)}
          title={title}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white rounded transition duration-200"
        >
          {icon}
        </button>
      ))}

      <span className="w-px h-6 bg-gray-700 mx-1"></span>

      {/* Insert Actions */}
      {[
        { icon: <Link className="h-4 w-4" />, onClick: insertLink, title: 'Insert Link' },
        { icon: <Image className="h-4 w-4" />, onClick: insertImage, title: 'Insert Image' },
      ].map(({ icon, onClick, title }, i) => (
        <button
          key={i}
          type="button"
          onClick={onClick}
          title={title}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white rounded transition duration-200"
        >
          {icon}
        </button>
      ))}

      {/* Emoji Picker */}
      <div className="relative group">
        <button
          type="button"
          title="Insert Emoji"
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-white rounded transition duration-200"
        >
          <Smile className="h-4 w-4" />
        </button>
        <div className="absolute top-full left-0 mt-2 bg-gray-700 rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
          <div className="flex space-x-2">
            {['😀', '😂', '🤔', '👍', '❤️', '🔥'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="p-1 text-xl hover:bg-gray-600 rounded transition-colors duration-200"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Editor Content Area */}
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      className="min-h-[200px] p-4 text-white focus:outline-none prose prose-invert max-w-none"
      style={{
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
      }}
      data-placeholder={placeholder}
      suppressContentEditableWarning
    />

    {/* Inline Styles */}
    <style>{`
      [contenteditable]:empty:before {
        content: attr(data-placeholder);
        color: #9CA3AF;
        pointer-events: none;
        display: block;
      }
      [contenteditable] img {
        max-width: 100%;
        height: auto;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      [contenteditable] a {
        color: #F97316;
        text-decoration: underline;
      }
    `}</style>
  </div>
);

}