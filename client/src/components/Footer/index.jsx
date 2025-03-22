import React from 'react';
import { footer } from '../../data';

const Footer = () => {
  const { authors } = footer;
  return (
    <footer className="bg-accent footer mt-10 flex items-center justify-evenly p-4">
      <figure className="flex flex-col gap-0 items-center"></figure>

      <div className="text-white flex flex-col justify-center items-center w-full">
        <div className="divide-x-2 divide-dotted flex justify-center w-full">
          <span className="px-2 text-center">{authors}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
