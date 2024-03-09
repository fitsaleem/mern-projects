// src/components/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
 const { token } = useParams();
 const [isVerified, setIsVerified] = useState(false);
 const [error, setError] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/auth/verify-email/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsVerified(true);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        setError('Please verify your email');
        navigate.push('/sign-in');
      }
    };

    verifyEmail();
 }, [token, navigate]);

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        {isVerified ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Email Verified</h2>
            <p className="text-center text-green-500">Your email has been verified successfully.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Verification Failed</h2>
            <p className="text-center text-red-500">{error}</p>
          </>
        )}
      </div>
      <div className="mt-4">
        <Link to="/sign-in" className="text-indigo-500 hover:underline">Back to Sign In</Link>
      </div>
    </div>
 );
};

export default VerifyEmail;
