import React from 'react';
import { home } from '../../../data';
const About = () => {
  return (
    <div className="md:join divide-y-2 md:divide-y-0 md:divide-x-2 divide-dotted">
      {home.about.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4"
        >
          <h2 className="text-4xl font-bold text-accent">{item.heading}</h2>
          <p className="text-lg text-center ">{item.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
