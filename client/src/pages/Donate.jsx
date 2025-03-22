import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { DONATE_AMOUNT } from '../utils/mutations';
import Footer from '../components/Footer';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const Donate = () => {
  const [donateAmount, { error }] = useMutation(DONATE_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = async (amount) => {
    if (amount) {
      try {
        const stripe = await loadStripe(STRIPE_KEY);
        const { data } = await donateAmount({
          variables: {
            amount: '' + amount,
          },
        });
        await stripe.redirectToCheckout({
          sessionId: data?.donateAmount?.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handleCustomAmountDonate = () => {
    if (customAmount && !isNaN(customAmount) && customAmount > 0) {
      handleDonate(customAmount);
    } else {
      console.log('Invalid amount');
    }
  };

  return (
    <section id="donate" className="flex flex-col min-h-screen justify-between">
      <div className="flex items-center justify-center p-6 flex-grow">
        <div className="w-full max-w-7xl">
          <h2 className="text-[35px] font-bold text-center mb-6 border-b p-3">
            DONATION
          </h2>
          <p className="text-center mb-12 text-lg">
            Your donations help us provide shelter, food, and medical care for
            abandoned and rescued animals. By contributing to our shelter, you
            are helping us give these animals a second chance at life. Every
            donation, no matter how small, makes a huge difference. Donate
            wholeheartedly and receive a free gift pack as a token of our
            appreciation!
          </p>
          {error && (
            <p className="text-red-500 text-center mb-4">
              Error during donation. Please try again later.
            </p>
          )}
          <div className="flex justify-center mb-6 space-x-4">
            <div className="card p-6 border rounded-lg shadow-lg bg-neutral">
              <h3 className="text-xl font-bold mb-4 text-center">
                Donation Amount
              </h3>
              <p className="text-lg mb-4 text-base-100 text-center">$5</p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                onClick={() => handleDonate(5)}
              >
                Donate
              </button>
            </div>
            <div className="card p-6 border rounded-lg shadow-lg bg-neutral">
              <h3 className="text-xl font-bold mb-4 text-center">
                Donation Amount
              </h3>
              <p className="text-lg mb-4 text-base-100 text-center">$10</p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                onClick={() => handleDonate(10)}
              >
                Donate
              </button>
            </div>
            <div className="card p-6 border rounded-lg shadow-lg bg-neutral">
              <h3 className="text-xl font-bold mb-4 text-center">
                Donation Amount
              </h3>
              <p className="text-lg mb-4 text-base-100 text-center">$15</p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                onClick={() => handleDonate(15)}
              >
                Donate
              </button>
            </div>
            <div className="card p-6 border rounded-lg shadow-lg bg-neutral">
              <h3 className="text-xl font-bold mb-4 text-center">
                Enter Custom Amount
              </h3>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4 text-black"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                onClick={handleCustomAmountDonate}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Donate;
