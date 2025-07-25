import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, MessageCircle, Eye } from 'lucide-react';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    
    if (diff === 0) return 'today';
    if (diff === 1) return 'yesterday';
    return `${diff} days ago`;
  };

  const hasAcceptedAnswer = question.answers.some(answer => answer.isAccepted);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors duration-200">
       
        {/* Question content */}
        
          <Link 
            to={`/questions/${question._id}`} 
            className="block bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-white hover:bg-gray-700 transition duration-200 cursor-pointer"
          >
            <div className="flex space-x-4">
              {/* Vote section */}
              <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                <ChevronUp className="h-6 w-6 text-gray-400 hover:text-orange-500" />
                <span className="text-white font-medium">{question.votes}</span>
                <ChevronDown className="h-6 w-6 text-gray-400 hover:text-orange-500" />
              </div>

              {/* Answer count */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className={`text-center p-2 rounded-lg ${
                  question.answers.some(answer => answer.isAccepted)
                    ? 'bg-green-900 border border-green-700'
                    : question.answers.length > 0
                      ? 'bg-orange-900 border border-orange-700'
                      : 'bg-gray-700 border border-gray-600'
                }`}>
                  <div className="text-white font-bold">{question.answers.length}</div>
                  <div className="text-xs text-gray-300">answers</div>
                </div>
              </div>

              {/* Question content */}
              <div className="flex-1">
                <h3 className="text-orange-500 hover:text-orange-400 text-lg font-medium mb-2">
                  {question.title}
                </h3>

                <p 
                  className="text-gray-300 line-clamp-3 mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: (question.description || '').replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                  }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {question.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-600 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img 
                        src={question.author?.avatar} 
                        alt={question.author?.username || 'Avatar'}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span>{question.author?.username}</span>
                      <span>asked {formatDate(new Date(question.createdAt))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          
          <div 
            className="text-gray-300 mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: (question.description || '').replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
            }}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              {question.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-600 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{question.views}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img 
                  src={question.author?.avatar} 
                  alt={question.author?.username || 'Avatar'}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span>{question.author?.username}</span>
                <span>asked {formatDate(question.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
  
  
  );
}