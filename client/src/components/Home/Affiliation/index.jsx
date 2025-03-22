import React from 'react';
import { home } from '../../../data';

const Affiliation = () => {
  return (
    <div className="bg-base-200 py-5 my-4">
      <h3 className="text-2xl font-bold  text-center">
        {home.registrationHeading}
      </h3>
      <div className="flex flex-col md:flex-row justify-around items-center">
        {home.regos.map((rego, index) => (
          <div key={index}>
            <img src={rego} alt="registration" className="h-36" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Affiliation;
