import React, { useState } from 'react';
import { mockQuestions } from '../data/mockData';
import { FilterType } from '../types';
import QuestionCard from '../components/Questions/QuestionCard';
import QuestionFilters from '../components/Questions/QuestionFilters';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredQuestions = () => {
    let filtered = [...mockQuestions];

    // Apply text search
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    switch (activeFilter) {
      case 'unanswered':
        filtered = filtered.filter(q => q.answers.length === 0);
        break;
      case 'answered':
        filtered = filtered.filter(q => q.answers.length > 0);
        break;
      case 'active':
        filtered = filtered.sort((a, b) => {
          const aLatest = Math.max(
            a.createdAt.getTime(),
            ...a.answers.map(ans => ans.createdAt.getTime())
          );
          const bLatest = Math.max(
            b.createdAt.getTime(),
            ...b.answers.map(ans => ans.createdAt.getTime())
          );
          return bLatest - aLatest;
        });
        break;
      case 'newest':
      default:
        filtered = filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">All Questions</h1>
                <p className="text-gray-400">{filteredQuestions.length} questions</p>
              </div>
              <QuestionFilters 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No questions found</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredQuestions.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200">
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-2 rounded transition-colors duration-200 ${
                          page === 1
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'CSS'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6">
              <h3 className="text-white font-medium mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Questions</span>
                  <span className="text-white">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Answers</span>
                  <span className="text-white">3,891</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Users</span>
                  <span className="text-white">892</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}