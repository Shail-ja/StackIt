import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/Editor/RichTextEditor';
import TagInput from '../components/Tags/TagInput';

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to home after successful submission
    navigate('/');
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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ask a Question</h1>
          <p className="text-gray-400">
            Get help from the community by asking a well-structured question
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-white mb-2">
              Title
            </label>
            <p className="text-gray-400 text-sm mb-3">
              Be specific and imagine you're asking a question to another person
            </p>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to center a div in CSS?"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Description
            </label>
            <p className="text-gray-400 text-sm mb-3">
              Include all the information someone would need to answer your question
            </p>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe your problem in detail..."
              className="min-h-[300px]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Tags
            </label>
            <p className="text-gray-400 text-sm mb-3">
              Add up to 5 tags to describe what your question is about
            </p>
            <TagInput
              tags={tags}
              onTagsChange={setTags}
              placeholder="e.g., JavaScript, React, CSS"
            />
            {tags.length >= 5 && (
              <p className="text-yellow-500 text-sm mt-2">
                Maximum 5 tags allowed
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim() || tags.length === 0}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Question'}
            </button>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-medium mb-4">Writing a good question</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>• Summarize your problem in a one-line title</li>
            <li>• Describe your problem in more detail</li>
            <li>• Describe what you tried and what you expected to happen</li>
            <li>• Add relevant tags to help others find your question</li>
            <li>• Review your question before posting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}