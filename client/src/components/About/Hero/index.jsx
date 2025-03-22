import React from 'react';

const Hero = ({ heros }) => {
  return (
    <div className="hidden md:flex w-full lg:h-[32rem] md:h-[26rem]">
      {/* get a random hero image from the heros array */}
      <img
        src={heros[Math.floor(Math.random() * heros.length)]}
        alt="hero image"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default Hero;
