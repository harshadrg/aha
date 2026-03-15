import React from 'react';
import { Link } from 'react-router';

const SectionHeader = ({ title, sectionKey, showViewAll = true }) => {
  return (
    <div className="flex items-center justify-between mb-4 mt-2">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>
      {showViewAll && sectionKey && (
        <Link
          to={`/collection/${sectionKey}`}
          className="text-white hover:text-yellow-500 text-sm md:text-base font-semibold transition-colors"
        >
          See all
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
