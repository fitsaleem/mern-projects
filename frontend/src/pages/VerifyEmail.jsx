// src/components/VerifyEmail.js
import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Email Verified</h2>
        <p className="text-center text-green-500">Your email has been verified successfully.</p>
       
      </div>

        <div className="mt-4">
            <Link to="/sign-in" className="text-indigo-500 hover:underline">Back to Sign In</Link>
           </div>
    </div>
 );
};

export default VerifyEmail;
