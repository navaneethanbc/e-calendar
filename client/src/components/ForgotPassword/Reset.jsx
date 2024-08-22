import { useState } from 'react';
import clogo from '../../assets/background.jpg';

const Reset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password reset logic here...
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Proceed with password reset if passwords match
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img className="w-1/2 mx-auto ml-1 mr-5 mb-6" src={clogo} alt="Calendar" />
      <div className="bg-white p-8 rounded-lg  w-96">
        
        <h1 className="text-4xl font-bold text-start mb-6">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;