import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, Check, Eye, Calendar } from 'lucide-react';
import { mockQuestions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/Editor/RichTextEditor';
import API from '../api';

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await API.get(`/questions/${id}`);
        setQuestion(res.data);
      } catch (err) {
        console.error('Failed to fetch question:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newAnswer.trim() || !isAuthenticated || !id) return;

  setIsSubmitting(true);

  try {
    await API.post(`/answers/${id}`, { content: newAnswer }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setNewAnswer('');
    
    // Refetch updated question data after posting
    const res = await API.get(`/questions/${id}`);
    setQuestion(res.data);
  } catch (err) {
    console.error('Failed to post answer:', err);
  } finally {
    setIsSubmitting(false);
  }
};


  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

   if (loading) {
    return <div className="text-center text-white py-10">Loading question...</div>;
  }

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


return (
  <div className="min-h-screen bg-gray-900 text-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Question */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md">
        <div className="flex gap-6">
          
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2">
            <button className="text-gray-400 hover:text-orange-500 transition">
              <ChevronUp className="h-8 w-8" />
            </button>
            <span className="text-xl font-semibold">{question.votes}</span>
            <button className="text-gray-400 hover:text-orange-500 transition">
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-3">{question.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Asked {formatDate(question.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{question.views} views</span>
              </div>
            </div>

            <div
              className="prose prose-invert text-gray-300 max-w-none"
              dangerouslySetInnerHTML={{ __html: question.description }}
            />

            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-wrap gap-2">
                {question.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <img
                  src={question.author?.avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${question.author?.username}`}
                  alt={question.author?.username}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-white">{question.author?.username}</p>
                  <p>asked {formatDate(question.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>

        {question.answers?.map((answer) => (
          <div key={answer._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex gap-6">
              
              {/* Vote & Accept */}
              <div className="flex flex-col items-center space-y-2">
                <button className="text-gray-400 hover:text-orange-500 transition">
                  <ChevronUp className="h-6 w-6" />
                </button>
                <span className="text-white font-medium">{answer.votes}</span>
                <button className="text-gray-400 hover:text-orange-500 transition">
                  <ChevronDown className="h-6 w-6" />
                </button>
                {user?.id === question.author.id && (
                  <button
                    className={`mt-2 p-2 rounded-full transition ${
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

              {/* Answer Content */}
              <div className="flex-1">
                {answer.isAccepted && (
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">Accepted Answer</span>
                  </div>
                )}

                <div
                  className="prose prose-invert text-gray-300 max-w-none"
                  dangerouslySetInnerHTML={{ __html: answer.content }}
                />

                <div className="flex items-center justify-end mt-6 text-sm text-gray-400 gap-2">
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
        ))}
      </div>

      {/* Answer Form */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm mt-10">
        {isAuthenticated ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
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
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {isSubmitting ? 'Posting...' : 'Post Your Answer'}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-400">
            You must be logged in to post an answer.
          </p>
        )}
      </div>
    </div>
  </div>
);
}