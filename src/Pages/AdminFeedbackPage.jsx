import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminFeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/feedbacks');
                setFeedbacks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }
    console.log(feedbacks);
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Feedback Page</h2>
            {feedbacks.length === 0 ? (
                <div className="text-center">No feedbacks found.</div>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                            <p className="text-lg font-semibold">{feedback.email}</p>
                            <p className="text-gray-700">{feedback.feedback}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminFeedbackPage;
