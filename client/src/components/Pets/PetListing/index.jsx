import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import Pagination from './Pagination';

const PetListing = ({
  loading,
  pets,
  fetchMore,
  petsLimit,
  handleMore,
  searchQuery,
}) => {
  const edges = pets?.edges || [];
  const totalCount = pets?.totalCount || 0;
  const [endIndex, setEndIndex] = useState(petsLimit);
  const [hasNextPage, setHasNextPage] = useState(
    pets?.pageInfo?.hasNextPage || false,
  );

  useEffect(() => {
    setHasNextPage(pets?.pageInfo?.hasNextPage || false);
    setEndIndex(edges.length);
  }, [pets]);

  return (
    <main className="flex justify-center items-center flex-col pb-6">
      <div className="grid grid-cols-auto-fill gap-4">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          edges.map((edge, index) => (
            <div key={index} className="no-underline">
              <PetCard key={index} index={index} pet={edge.node || edge} />
            </div>
          ))
        )}
      </div>
      {!searchQuery && hasNextPage && (
        <div className="flex justify-center">
          <Pagination
            startIndex={1}
            endIndex={endIndex}
            hasNextPage={hasNextPage}
            totalCount={totalCount}
            handleMore={handleMore}
          />
        </div>
      )}
    </main>
  );
};

export default PetListing;
