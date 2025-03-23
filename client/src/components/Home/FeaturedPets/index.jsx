import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_FEATURED_PETS } from '../../../utils/queries';
import PetCard from './PetCard';
import { home } from '../../../data';
import { Link } from 'react-router-dom';

const FeaturedPets = () => {
  const { loading, data } = useQuery(QUERY_FEATURED_PETS);
  const featuredPets = data?.featuredPets || [];

  return (
    <div className="">
      <h3 className="text-2xl font-bold text-center capitalize">
        {home.featured}
      </h3>
      <div className="flex flex-wrap items-center justify-center p-4 gap-4">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          featuredPets.map((pet, index) => (
            <div key={index} className="no-underline">
              <PetCard index={index} {...pet} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center my-5">
        <Link
          to="/pets"
          className="btn btn-accent flex items-center font-bold rounded-xl"
        >
          {home.featuredPets.icon}
          {home.featuredPets.btn}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPets;
