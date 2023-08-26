//component/ResetFilter.js

import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useResourceContext } from 'react-admin';


export const ResetFilters = () => {
    const resource = useResourceContext();
    return (
        <Button
            sx={{ color: '#38A505', }}
            component={Link}
            to={{
                pathname: `/${resource}`,
                search: 'filter={}&displayedFilters={}',
            }}
        >
            Reset filters
        </Button>
    );
};
