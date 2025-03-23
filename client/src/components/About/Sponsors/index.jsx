import React from 'react';

const Sponsors = ({ sponsors, description, heading }) => {
  return (
    <>
      <h3 className="mb-3 mt-8 text-2xl">{heading}</h3>
      <p>{description}</p>
      <div className="flex flex-wrap gap-2 justify-evenly">
        <p className="my-4">{description}</p>
      </div>
    </>
  );
};

export default Sponsors;