import React from 'react';
import { home } from '../../../data';
import { motion, AnimatePresence } from 'framer-motion';
import DonationBtn from '../../DonationBtn';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.03,
    },
  },
};
const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={home.hero}
        alt="big animal adoption photo"
        className="h-[40dvh] w-full object-cover object-top -z-10"
      />
      <div className="max-w-[350px] text-xl text-justify text-white font-semibold absolute right-12 top-10 z-10 leading-10">
        <motion.div
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {home.plea.split('').map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        {/* <AnimatePresence> */}
        <motion.div
          // key="donationButton"
          className="flex justify-center mt-3"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 1, delay: 4.0, ease: 'easeInOut' },
          }}
          viewport={{ once: false }}
        >
          <DonationBtn />
        </motion.div>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default Hero;
