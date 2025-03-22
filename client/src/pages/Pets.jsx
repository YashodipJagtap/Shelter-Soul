import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Search from '../components/Pets/Search';
import PetListing from '../components/Pets/PetListing';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_PETS, QUERY_ALL_PETS } from '../utils/queries';

const Pets = () => {
  const petsLimit = 6;
  const { loading, data, fetchMore } = useQuery(QUERY_PETS, {
    variables: { petsLimit },
  });

  const [loadAllPets, { data: allPetsData }] = useLazyQuery(QUERY_ALL_PETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredPets(data.pets.edges);
    }
  }, [data]);

  useEffect(() => {
    if (allPetsData) {
      setAllPets(allPetsData.allPets);
      const filtered = allPetsData.allPets.filter((pet) => {
        const name = pet.name ? pet.name.toLowerCase() : '';
        const breed = pet.breed ? pet.breed.toLowerCase() : '';
        const species = pet.species ? pet.species.toLowerCase() : '';
        const type = pet.type ? pet.type.toLowerCase() : '';
        const color = pet.color ? pet.color.toLowerCase() : '';
        const gender = pet.gender ? pet.gender.toLowerCase() : '';
        const location = pet.location ? pet.location.toLowerCase() : '';
        const health = pet.health ? pet.health.toLowerCase() : '';
        const tame = pet.tame ? pet.tame.toLowerCase() : '';
        const specialNeeds = pet.specialNeeds
          ? pet.specialNeeds.toLowerCase()
          : '';
        const vaccinationHistory = pet.vaccinationHistory
          ? pet.vaccinationHistory.toLowerCase()
          : '';
        const pedigreeKnown = pet.pedigreeKnown
          ? pet.pedigreeKnown.toLowerCase()
          : '';
        const disability = pet.disability ? pet.disability.toLowerCase() : '';
        return (
          name.includes(searchQuery) ||
          breed.includes(searchQuery) ||
          species.includes(searchQuery) ||
          type.includes(searchQuery) ||
          color.includes(searchQuery) ||
          gender.includes(searchQuery) ||
          location.includes(searchQuery) ||
          health.includes(searchQuery) ||
          tame.includes(searchQuery) ||
          specialNeeds.includes(searchQuery) ||
          vaccinationHistory.includes(searchQuery) ||
          pedigreeKnown.includes(searchQuery) ||
          disability.includes(searchQuery)
        );
      });
      setFilteredPets(filtered);
    }
  }, [allPetsData, searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
    if (query) {
      loadAllPets();
    } else {
      setFilteredPets(data.pets.edges);
    }
  };

  const handleMore = () => {
    fetchMore({
      variables: { petsLimit, cursor: data.pets.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.pets.edges;
        const newPageInfo = fetchMoreResult.pets.pageInfo;
        return {
          pets: {
            __typename: prevResult.pets.__typename,
            edges: [...prevResult.pets.edges, ...newEdges],
            pageInfo: newPageInfo,
            totalCount: fetchMoreResult.pets.totalCount,
          },
        };
      },
    });
  };

  const petsData = {
    edges: filteredPets,
    pageInfo: data?.pets.pageInfo,
    totalCount: data?.pets.totalCount,
  };

  return (
    <section
      id="pets"
      className="section flex-col justify-between relative pt-10"
    >
      <div className="container mx-auto">
        <div className="bg-base-200 flex-col lg:flex-row justify-center items-center">
          <div className="flex justify-start">
            <Search handleSearchChange={handleSearchChange} />
          </div>
          <PetListing
            loading={loading}
            pets={petsData}
            fetchMore={fetchMore}
            petsLimit={petsLimit}
            handleMore={handleMore}
            endIndex={filteredPets.length}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pets;
