import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PetCard = ({ index, pet }) => {
  if (!pet) {
    return null;
  }

  const {
    type,
    name,
    location,
    age,
    breed,
    species,
    photo,
    featured,
    color,
    description,
    _id,
    vaccinationHistory,
    gender,
  } = pet;

  return (
    <motion.div
      className="card h-128 bg-base-200 shadow-xl flex flex-col"
      initial={{
        opacity: 0,
        y: index % 2 === 0 ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.0, ease: 'easeInOut' },
      }}
      viewport={{ once: false }}
    >
      <figure className="rounded-t-2xl my-0 h-60">
        <img
          src={`/images/pets/${type?.toLowerCase()}s/${photo}`}
          alt={`featured pet ${name}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body pt-0 mt-3">
        <h2 className="card-title my-2 border-b-0 font-bold text-[27px] ">
          {name}
          {featured && (
            <div className="badge badge-secondary py-3 rounded-xl text-neutral ml-2">
              FEATURED
            </div>
          )}
        </h2>
        <p className="leading-3 my-0">{location} Rescue Center</p>
        <div className="card-actions justify-end mt-2">
          <div className="badge badge-outline py-3 rounded-xl">
            {age} {age > 1 ? 'years' : 'year'}
          </div>
          <div className="badge badge-outline py-3 rounded-xl">
            {breed || species}
          </div>
          <div className="badge badge-outline py-3 rounded-xl">{color}</div>
        </div>
        <p className="line-clamp-1 mt-2">{description}</p>
        <Link
          to={`/pets/${_id}`}
          className="btn btn-primary bg-base-100 rounded-xl mt-4 flex items-center justify-center"
        >
          <FaPaw className="mr-2" />
          ADOPT ME
        </Link>
      </div>
    </motion.div>
  );
};

export default PetCard;
