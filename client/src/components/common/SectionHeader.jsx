import React from 'react';
import { Link } from 'react-router';

const SectionHeader = ({ title, sectionKey, showViewAll = true }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white font-semibold text-xl sm:text-2xl lg:text-3xl m-0">
        {title}
      </h2>
      {(showViewAll && sectionKey) && (
        <Link
          to={`/collection/${sectionKey}`}
          className="text-white font-medium no-underline text-sm sm:text-base lg:text-lg"
        >
          See all
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
