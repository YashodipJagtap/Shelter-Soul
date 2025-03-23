import React from 'react';

const TeamCard = ({ name, role, pic }) => {
  return (
    <div
      className="flex justify-center items-center w-full min-h-screen"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100% !important' }}
    >
      <div className="max-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-xl" src={pic} alt="team member" />
        <div className="p-5 text-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {role}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
