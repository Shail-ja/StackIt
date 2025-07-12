import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SignupModal from './components/Auth/SignUpModal';
import LoginModal from './components/Auth/LoginModal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ask" element={<ProtectedRoute><AskQuestionPage /></ProtectedRoute>} />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route
              path="/register"
              element={<SignupModal onClose={() => {}} />}
            />
            <Route
              path="/login"
              element={<LoginModal onClose={() => {}} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;