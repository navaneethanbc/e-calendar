import { useState } from 'react';
import blogo from '../../assets/logo.png';
import clogo from '../../assets/background.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-0 m-0">
      <div className="flex items-center mt-5 mb-2 w-full">
        <img className="h-16 w-30 mr-2" src={blogo} alt="BOC logo" />
        <h1 className="text-[50px] text-brown-800 m-0 p-0">Calendar</h1>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col md:flex-row justify-start mt-12 w-full px-6">
        <div className="flex-1 max-w-full md:max-w-1/2 pr-8">
          <img className="w-full h-auto" src={clogo} alt="Calendar logo" />
        </div>
        <div className="flex-1 max-w-full md:max-w-2/5 pl-8">
          <h1 className="text-4xl ml-5 mb-4 font-bold ">Login</h1>
          <form onSubmit={(e) => { e.preventDefault(); }} className="max-w-md flex flex-col p-5" >
            <input
              type="email"
              id="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              className="p-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <div>
              <a className="text-blue-500 hover:underline" href="/otp">
                Forgot Password
              </a>
              <hr className="h-px my-5 bg-black border-0 dark:bg-black" />
            </div>
            <div className="text-center">
              <p>
                New to Calendar? <a href="/register" className="text-blue-500 hover:underline">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
