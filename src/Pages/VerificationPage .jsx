import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(45);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
  
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const verifyOtp = async (e) => {
        alert('Code Submitted: ' + code.join(''));
        console.log("verify otp got called");
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
          await result.confirm(otp);
          navigate("/home");
        } catch (err) {
          setError(err.message);
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

    const handleSubmit = () => {
        // Do nothing
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-6 space-y-4">
                <button className="text-gray-500">
                    <span className="sr-only">Back</span>
                    &larr;
                </button>
                <h2 className="text-2xl font-semibold text-center text-pink-500">Verification</h2>
                <p className="text-center text-gray-600">
                    Code has been sent to (+44) 20 **** *678
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
                    onClick={verifyOtp}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200"
                >
                    Verify
                </button>
                <button className="w-full text-center text-pink-500" onClick={() => alert('Go back to Sign In')}>
                    Back to Sign In
                </button>
            </div>
        </div>
    );
};

export default VerificationPage;
