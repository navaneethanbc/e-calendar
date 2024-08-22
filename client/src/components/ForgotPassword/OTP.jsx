import  { useState } from 'react';
import clogo from '../../assets/background.jpg';

const OTP = () => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white" >
      <img className="w-1/2 mx-auto ml-1 mr-5 mb-6" src={clogo} alt="Calendar" />
      <div className="bg-white p-20 rounded-lg  w-99" >
        <h1 className="text-2xl font-bold text-center mb-4">Email Verification</h1>
        <p className="text-gray-600 text-center mb-6">We have sent a code to your email</p>
        
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
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300" >
          Verify Account
        </button>
        
        <p className="text-center mt-4 text-sm text-gray-600">
          Didn't receive code? <a href="#" className="text-blue-600 hover:underline">Resend OTP</a>
        </p>
      </div>
    </div>
  );
};

export default OTP;