import React from 'react';

const SearchButton = ({ searchTerm, handleSearch }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name or ..."
                style={{ padding: '0.5rem' }}
            />
        </div>
    );
};

export default SearchButton;
