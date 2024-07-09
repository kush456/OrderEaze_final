import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminFeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/dashboard');
      };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">
            <h1 className="text-center text-3xl font-bold mb-6">We Value Your Feedback</h1>

            <button className="bg-red-400 text-white px-6 py-3 rounded-lg font-semibold mb-8" onClick={goToMenu}>
                Go Back
            </button>

            {feedbacks.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mb-8">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="mb-6">
                            <div className="mb-4">
                                <img src={feedback.image} alt="feedback" className="mx-auto w-16 h-16 object-cover rounded-full" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">{feedback.name}</h2>
                            <p className="text-gray-700 mb-6">"{feedback.comment}"</p>
                        </div>
                    ))}
                    <div className="flex justify-center space-x-2">
                        <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            &lt;
                        </button>
                        <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            &gt;
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 mb-8">No feedback yet.</p>
            )}

            
        </div>
    );
};

export default AdminFeedbackPage;