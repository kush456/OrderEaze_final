import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'; // Import auth from firebase.js
import { Toaster, toast } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [emailformail, setemailformail] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [confirmError, setConfirmError] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  React.useEffect(() => {
    if (showOTP) {
      const interval = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showOTP]);

  const setUpRecaptcha = (phone) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      }, auth);
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    } catch (error) {
      console.error("Recaptcha setup error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone);
    setError("");
    if (phone === "" || phone === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptcha(phone);
      setResult(response);
      setShowOTP(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = code.join('');
    setConfirmError("");
    if (otp.length !== 6) {
      setConfirmError("Please enter a valid 6-digit OTP code.");
      return;
    }
    try {
      await result.confirm(otp);
      navigate("/table");
    } catch (err) {
      setConfirmError(err.message);
    }
  };


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log("handleemail called");
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // const { token } = await response.json();

      console.log("from backend",data);
      if(data.message =="odin has arrived") {
        alert("welcome admin");
        navigate("/dashboard");
      } else{
        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }      

        // If login is successful, store the authToken and navigate to the desired route
        localStorage.setItem('token', data.token);
        
        localStorage.setItem('email', email);
        console.log(email)
        // Decode token to get user information if needed
        // const decodedToken = jwt_decode(token);
        // console.log(decodedToken); 
        // localStorage.setItem('token', token);
        navigate('/table'); 
      } 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Toaster toastOptions={{ duration: 4000 }} />
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      {!showOTP ? (
        <>
          <h2 className="mb-6 text-2xl font-semibold text-center text-red-500">Login</h2>
          <form onSubmit={handleEmailSubmit} >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
        onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="w-full py-3 mb-4 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600">
              Login
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            <div id="recaptcha-container" className="mb-4"></div>
            <button type="submit" className="w-full py-3 mb-4 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600">
              Send Verification Code
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-6 space-y-4">
            <button className="text-gray-500" onClick={() => setShowOTP(false)}>
              <span className="sr-only">Back</span>
              &larr;
            </button>
            <h2 className="text-2xl font-semibold text-center text-pink-500">Verification</h2>
            <p className="text-center text-gray-600">
              Code has been sent to {phone}
            </p>
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:border-pink-500"
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600">Didn’t receive code?</p>
              <p className="text-gray-600">
                00 : {timer < 10 ? `0${timer}` : timer}
              </p>
              <button
                className="text-pink-500"
                disabled={timer > 0}
                onClick={() => setTimer(45)}
              >
                Resend Code
              </button>
            </div>
            <button
              onClick={handleVerify}
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200"
            >
              Verify
            </button>
            {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-700">
          Don't have an account? <a href="/register" className="text-red-500">Register</a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
