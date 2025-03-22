import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-neutral p-6 rounded-lg shadow-lg text-center max-w-lg">
        <h2 className="text-[30px] font-bold mb-6 border-b p-2">
          Congratulations!
        </h2>
        <p className="text-lg text-base-100 mb-4 text-center">
          Your donation was successful. Thank you for your generosity!
        </p>
        <p className="text-lg text-base-100 mb-8 text-center">
          Your contribution will go a long way in helping us provide shelter,
          food, and medical care for abandoned and rescued animals. With your
          support, we can continue to give these animals a second chance at
          life. As a token of our appreciation, you will receive a free gift
          pack. Please check your email for further details.
        </p>
        <Link
          to="/"
          className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
        >
          HOME
        </Link>
      </div>
    </div>
  );
};

export default Success;
