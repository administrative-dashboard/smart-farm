import React from 'react';

const ChooseFilterButton = ({ filters, handleFilterChange }) => {
    return (
        <div>
            <label>Choose Filters:</label>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="userName"
                        checked={filters.userName}
                        onChange={handleFilterChange}
                    />
                    User Name
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="role"
                        checked={filters.role}
                        onChange={handleFilterChange}
                    />
                    Role
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="phoneNumber"
                        checked={filters.phoneNumber}
                        onChange={handleFilterChange}
                    />
                    Phone Number
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="email"
                        checked={filters.email}
                        onChange={handleFilterChange}
                    />
                    Email
                </label>
            </div>
        </div>
    );
};

export default ChooseFilterButton;
