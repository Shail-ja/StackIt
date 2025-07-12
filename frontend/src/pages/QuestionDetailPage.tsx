import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Check, Eye, Calendar } from 'lucide-react';
import { mockQuestions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/Editor/RichTextEditor';

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = mockQuestions.find(q => q.id === id);

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Question Not Found</h2>
          <p className="text-gray-400">The question you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim() || !isAuthenticated) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewAnswer('');
    setIsSubmitting(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex space-x-6">
            {/* Vote section */}
            <div className="flex flex-col items-center space-y-2">
              <button className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <ChevronUp className="h-8 w-8" />
              </button>
              <span className="text-white font-bold text-xl">{question.votes}</span>
              <button className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>

            {/* Question content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-4">{question.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Asked {formatDate(question.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{question.views} views</span>
                </div>
              </div>

              <div 
                className="text-gray-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: question.description }}
              />

              <div className="flex items-center justify-between mt-6">
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <img 
                    src={question.author.avatar} 
                    alt={question.author.username}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white">{question.author.username}</div>
                    <div>asked {formatDate(question.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {question.answers.map((answer) => (
            <div key={answer.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex space-x-6">
                {/* Vote section */}
                <div className="flex flex-col items-center space-y-2">
                  <button className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                    <ChevronUp className="h-6 w-6" />
                  </button>
                  <span className="text-white font-medium">{answer.votes}</span>
                  <button className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
                    <ChevronDown className="h-6 w-6" />
                  </button>
                  {user?.id === question.author.id && (
                    <button
                      className={`mt-2 p-2 rounded-full transition-colors duration-200 ${
                        answer.isAccepted
                          ? 'bg-green-500 text-white'
                          : 'text-gray-400 hover:text-green-500 hover:bg-gray-700'
                      }`}
                      title={answer.isAccepted ? 'Accepted answer' : 'Accept this answer'}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Answer content */}
                <div className="flex-1">
                  {answer.isAccepted && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-green-500 font-medium">Accepted Answer</span>
                    </div>
                  )}
                  
                  <div 
                    className="text-gray-300 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: answer.content }}
                  />

                  <div className="flex items-center justify-end mt-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <img 
                        src={answer.author.avatar} 
                        alt={answer.author.username}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white">{answer.author.username}</div>
                        <div>answered {formatDate(answer.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Answer Form */}
          {isAuthenticated ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Your Answer</h3>
              <form onSubmit={handleSubmitAnswer}>
                <RichTextEditor
                  value={newAnswer}
                  onChange={setNewAnswer}
                  placeholder="Write your answer here..."
                  className="mb-4"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newAnswer.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  {isSubmitting ? 'Posting...' : 'Post Your Answer'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-400">
                You must be logged in to post an answer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}