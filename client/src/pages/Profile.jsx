import suyash from '../assets/images/about/suyash.jpg';
import yukitoshi from '../assets/images/about/Yuki.jpg';
import jodie from '../assets/images/about/jodie.jpg';
import defaultpic from '../assets/images/about/default.jpg';
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { REMOVE_FAVORITE } from '../utils/mutations';
import { FaTimes, FaPaw, FaUser } from 'react-icons/fa';
import Footer from '../components/Footer';

const Profile = () => {
  const { userId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userData = data?.user || {};
  const favoritePets = userData.favorites || [];

  const handleRemoveFavorite = async (petId) => {
    try {
      await removeFavorite({
        variables: { petId: petId },
        refetchQueries: [
          { query: QUERY_SINGLE_USER, variables: { userId: userId } },
        ],
      });

      alert('Pet removed from favorites!');
    } catch (error) {
      console.error('Error removing pet from favorites:', error);
    }
  };

  const getUserImage = (name) => {
    switch (name) {
      case 'Yukitoshi Imaizumi-Zhou':
        return yukitoshi;
      case 'Jodie Lee':
        return jodie;
      case 'Suyash Maharjan':
        return suyash;
      default:
        return defaultpic;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto section flex-grow">
        <section
          id="profile"
          className="flex max-w-4xl mx-auto bg-base-300 rounded-xl shadow-lg p-3 min-h-[600px] min-w-[800px]"
        >
          <div className="w-1/2 p-4 mr-4">
            <div className="flex items-center justify-center border-b border-neutral">
              <h2>
                <FaUser className="text-4xl mr-4" />
              </h2>
              <h2 className="text-[34px] font-bold text-center border-neutral mt-14">
                USER PROFILE
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={getUserImage(userData.name)}
                alt="User Profile"
                className="w-24 h-24 object rounded-full border border-grey shadow-lg mb-4"
              />
              <p className="text-[20px] mb-0 text-neutral">
                <span className="font-semibold">Name:</span> {userData.name}
              </p>
              <p className="text-[20px] mb-0 text-neutral">
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p className="text-[20px] mb-0 text-neutral">
                <span className="font-semibold">Birthday:</span>{' '}
                {moment.unix(userData.birthday / 1000).format('YYYY-MM-DD')}
              </p>
              <p className="text-[20px] mb-0 text-neutral">
                <span className="font-semibold">Favorite Pet:</span>{' '}
                {userData.favoritePet}
              </p>
            </div>
          </div>

          <div className="border-r border-base-100 mt-10 mb-10 mr-4"></div>

          <div className="w-1/2 p-4">
            <div className="flex items-center justify-center border-b border-neutral">
              <h2>
                <FaPaw className="text-4xl mr-4" />
              </h2>
              <h2 className="text-[34px] font-bold text-center border-neutral mt-14">
                FAVORITE PETS
              </h2>
            </div>
            {favoritePets.length === 0 ? (
              <p className="text-lg text-center mt-20 text-neutral">
                No favorite pets found.
              </p>
            ) : (
              favoritePets.map((pet) => (
                <div
                  key={pet._id}
                  className="rounded-lg p-3 hover:border hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={`/images/pets/${pet.type.toLowerCase()}s/${pet.photo}`}
                        alt={`favorite pet ${pet.name}`}
                        className="w-24 h-24 mr-4 object-cover rounded-full border border-grey shadow-lg"
                      />
                      <div>
                        <Link
                          to={`/pets/${pet._id}`}
                          className="text-neutral text-[21px] no-underline hover:opacity-75"
                        >
                          <h4 className="mb-0 font-bold">{pet.name}</h4>
                        </Link>
                        <p className="text-neutral text-[14px] mt-0 mb-0 italic">
                          {pet.breed || pet.species}
                        </p>
                        <p className="text-neutral text-[14px] mt-0">
                          {pet.location}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-[12px] rounded"
                      onClick={() => handleRemoveFavorite(pet._id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
