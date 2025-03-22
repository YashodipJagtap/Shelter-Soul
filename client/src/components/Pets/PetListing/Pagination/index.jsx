import React from 'react';

const Pagination = ({
  startIndex,
  endIndex,
  totalCount,
  hasNextPage,
  handleMore,
}) => {
  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      {/* <!-- Help text --> */}
      <span className="text-sm ">
        Showing{' '}
        <span className="font-semibold  text-neutral">{startIndex}</span> to{' '}
        <span className="font-semibold  text-neutral">{endIndex}</span> of{' '}
        <span className="font-semibold text-neutralte">{totalCount}</span> Pets
      </span>
      {/* <!-- Buttons --> */}
      <div className="inline-flex xs:mt-0">
        {endIndex !== totalCount ? (
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium  border-0 border-s rounded-e bg-base-200 border-base-100 hover:bg-secondary hover:text-neutral"
            onClick={handleMore}
          >
            Show More
          </button>
        ) : (
          <p>No more pets to show. </p>
        )}
      </div>
    </div>
  );
};

export default Pagination;
