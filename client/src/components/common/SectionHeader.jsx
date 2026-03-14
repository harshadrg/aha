import React from 'react';
import { Link } from 'react-router';

const SectionHeader = ({ title, sectionKey, showViewAll = true }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <h2 style={{ color: '#ffffff', fontWeight: 600, fontSize: '2rem', margin: 0 }}>
        {title}
      </h2>
      {(showViewAll && sectionKey) && (
        <Link
          to={`/collection/${sectionKey}`}
          style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 500, textDecoration: 'none' }}
        >
          See all
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
