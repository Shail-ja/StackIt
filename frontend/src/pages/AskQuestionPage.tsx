import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/Editor/RichTextEditor';
import TagInput from '../components/Tags/TagInput';
import API from '../api';

export default function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || tags.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
     try {
    await API.post('/questions', {
      title,
      description,
      tags
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

      navigate('/');
    } catch (error) {
      console.error('Failed to post question', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-400">You need to be logged in to ask a question.</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-900 text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">Ask a Question</h1>
        <p className="text-gray-400 text-sm">
          Get help from the community by asking a well-structured question
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-1">Title</label>
          <p className="text-gray-400 text-sm mb-2">
            Be specific and imagine you're asking someone directly
          </p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., How to center a div in CSS?"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold mb-1">Description</label>
          <p className="text-gray-400 text-sm mb-2">
            Include all the necessary context and code you’ve tried
          </p>
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-2 focus-within:ring-2 focus-within:ring-orange-500">
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe your problem in detail..."
              className="min-h-[300px] text-white"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-lg font-semibold mb-1">Tags</label>
          <p className="text-gray-400 text-sm mb-2">
            Add up to 5 tags (e.g., React, JavaScript, HTML)
          </p>
          <TagInput
            tags={tags}
            onTagsChange={setTags}
            placeholder="e.g., JavaScript, React, CSS"
          />
          {tags.length >= 5 && (
            <p className="text-yellow-500 text-sm mt-2">Maximum 5 tags allowed</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition duration-200 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim() || tags.length === 0}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition duration-200"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Question'}
          </button>
        </div>
      </form>

      {/* Tips Section */}
      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">📝 Writing a Good Question</h3>
        <ul className="text-gray-400 space-y-2 text-sm list-disc pl-5">
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your issue in detail with code or examples</li>
          <li>Explain what you’ve already tried</li>
          <li>Use relevant tags to categorize your question</li>
          <li>Proofread before submitting</li>
        </ul>
      </div>
    </div>
  </div>
);
}