import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onTagsChange, placeholder = "Add tags..." }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'CSS', 'HTML',
    'TypeScript', 'Vue.js', 'Angular', 'MongoDB', 'PostgreSQL', 'Git',
    'Docker', 'AWS', 'Firebase', 'GraphQL', 'REST API', 'JWT', 'Authentication'
  ]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

return (
  <div className="space-y-2">
    {/* Tag Box */}
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus-within:ring-1 focus-within:ring-orange-500 transition-all duration-200">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center space-x-1 bg-orange-500 text-white px-2 py-1 rounded-full text-sm shadow-sm"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="hover:bg-orange-600 rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-white"
            aria-label={`Remove tag ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent text-white placeholder-gray-400 outline-none focus:outline-none"
      />
    </div>

    {/* Suggestions Dropdown */}
    {inputValue && filteredSuggestions.length > 0 && (
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-h-40 overflow-y-auto shadow-lg">
        {filteredSuggestions.slice(0, 5).map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              onTagsChange([...tags, suggestion]);
              setInputValue('');
            }}
            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    )}
  </div>
);

}