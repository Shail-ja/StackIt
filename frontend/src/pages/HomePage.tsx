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
  <div className="min-h-screen bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold mb-1">All Questions</h1>
              <p className="text-gray-400 text-sm">{filteredQuestions.length} questions</p>
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
                <p className="text-gray-400 text-lg font-medium">No questions found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredQuestions.length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 transition">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      page === 1
                        ? 'bg-orange-500 text-white shadow'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 transition">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80 space-y-6">
          {/* Popular Tags */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'CSS'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded text-sm transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Questions</span>
                <span className="text-white font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Answers</span>
                <span className="text-white font-semibold">3,891</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Users</span>
                <span className="text-white font-semibold">892</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
);
}