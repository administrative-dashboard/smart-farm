import React from 'react';

const SearchButton = ({ searchTerm, handleSearch }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name, role, phone number, or email"
                style={{ padding: '0.5rem' }}
            />
        </div>
    );
};

export default SearchButton;
