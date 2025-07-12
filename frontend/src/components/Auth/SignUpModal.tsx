import React , {useState} from "react";
import API from "../../api";

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await API.post('/auth/register', {
        username,
        email,
        password
      });
      setSuccess(true);
      setTimeout(onClose, 1500); // Close modal after short delay
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2 text-center">Registration successful!</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border rounded bg-gray-700 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
          {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupModal;

