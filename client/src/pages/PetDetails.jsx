import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { QUERY_SINGLE_PET } from '../utils/queries';
import { ADD_FAVORITE } from '../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { TbLocationQuestion } from 'react-icons/tb';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';

const PetDetails = () => {
  const { petId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const fetchPetData = useCallback(async () => {
    await refetch();
  }, [refetch]);

  useEffect(() => {
    fetchPetData();
  }, [fetchPetData]);

  const pet = data?.pet || {};
  const petType = pet.type ? pet.type.toLowerCase() : '';

  useEffect(() => {
    if (data && data.pet) {
      setIsInFavorites(data.pet.isInFavorites);
    }
  }, [data]);

  const handleFavoriteClick = async () => {
    try {
      if (isInFavorites) {
        alert('This pet is already added to favorites!');
        return;
      }

      await addFavorite({
        variables: { petId: pet._id },
      });
      setIsInFavorites(true);
      await fetchPetData();
      alert('Pet added to favorites!');
    } catch (error) {
      console.error('Error adding pet to favorites:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <section className="section flex-col justify-between relative pt-10">
      <div
        id="petDetails"
        className="bg-base-300 rounded-lg shadow-lg p-8 container min-h-[80dvh] flex flex-col items-center justify-center mx-auto mt-8"
      >
        <motion.div
          className="w-full text-4xl flex justify-end"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            transition: { duration: 1 },
            x: -10,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/pets"
            className="flex items-center no-underline text-accent text-[30px] mt-1"
          >
            <IoArrowBackCircleSharp className="mr-2" />
            BACK TO PETS
          </Link>
        </motion.div>
        <div className="flex justify-start w-full border-b pb-4">
          <h1 className="text-3xl font-bold mb-1">
            <button
              onClick={handleFavoriteClick}
              className="mr-5 ml-8 mx-1 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-2xl ${isInFavorites ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              />
            </button>
            {pet.name}
            {pet.featured && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral">
                FEATURED
              </span>
            )}
            {pet.tame && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral">
                TAME
              </span>
            )}
            {pet.pedigreeKnown && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral">
                PEDIGREE KNOWN
              </span>
            )}
          </h1>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <img
              className="rounded-lg w-full"
              src={`/images/pets/${petType}s/${pet.photo}`}
              alt={pet.name}
            />
          </div>
          <div className="w-full md:w-1/2 p-7">
            <p className="mb-2">
              <span className="font-bold">Type: </span>
              {pet.type}
            </p>
            <p className="mb-2">
              <span className="font-bold">Color: </span>
              {pet.color}
            </p>
            <p className="mb-2">
              <span className="font-bold">Age: </span>
              {pet.age}
            </p>
            <p className="mb-2">
              <span className="font-bold">Gender: </span>
              {pet.gender}
            </p>
            {petType === 'bird' && (
              <div className="mb-2">
                <p className="">
                  <span className="font-bold">Species: </span>
                  {pet.species}
                </p>
              </div>
            )}
            {petType !== 'bird' && (
              <div className="mb-2">
                <p className="">
                  <span className="font-bold">Breed: </span>
                  {pet.breed}
                </p>
              </div>
            )}
            <p className="mb-2">
              <span className="font-bold">Location: </span>
              {pet.location}
            </p>
            {(petType === 'bird' || petType === 'hamster') && (
              <div className="mb-2">
                <p className="">
                  <span className="font-bold">Health: </span>
                  {pet.health}
                </p>
              </div>
            )}
            {petType === 'bird' && (
              <div className="mb-2">
                <p className="">
                  <span className="font-bold">Special Needs: </span>
                  {pet.specialNeeds}
                </p>
              </div>
            )}
            {(petType === 'cat' ||
              petType === 'dog' ||
              petType === 'rabbit') && (
              <div className="mb-2">
                <p className="">
                  <span className="font-bold">Vaccination History: </span>
                  {pet.vaccinationHistory}
                </p>
                <p className="">
                  <span className="font-bold">Disability: </span>
                  {pet.disability}
                </p>
              </div>
            )}
            <p className="mb-2">
              <span className="font-bold">Description: </span>
              {pet.description}
            </p>
            <div className="flex justify-end rounded-xl">
              <Link
                to={`/pets/${petId}/enquiry`}
                className="btn btn-accent mt-4 rounded-xl font-bold"
              >
                <TbLocationQuestion />
                ENQUIRE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PetDetails;
