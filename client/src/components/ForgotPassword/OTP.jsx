import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clogo from '../../assets/background.jpg';

const OTP = ({ otp, setOtp, email, setEmail }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const processOtp = (e) => {
    e.preventDefault();
    const newOtp = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setOtp(newOtp);
    setTimeout(()=>{
      setOtp('')},60000)
      // console.log(newOtp);
    // Here you might want to send the OTP to the user's email
  };

  const checkOtp = () => {
    const otpString = code.join('');
    if (otpString === otp) {
      navigate("/reset");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img className="w-1/2 mx-auto ml-1 mr-5 mb-6" src={clogo} alt="Calendar" />
      <div className="bg-white p-20 rounded-lg w-99">
        <h1 className="text-2xl font-bold text-center mb-4">Email Verification</h1>
        <form onSubmit={processOtp}>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded mb-5 w-full"
          >
            Send OTP
          </button>
        </form>
        <div className="flex justify-center mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 mx-1 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        
        <button onClick={checkOtp} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300">
          Verify Account
        </button>
        
        <p className="text-center mt-4 text-sm text-gray-600">
          Didn't receive code? <button onClick={processOtp} className="text-blue-600 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default OTP;