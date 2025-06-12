import React from 'react';
import { Link } from 'react-router';

const MyQueries = () => {
    return (
        <div>
        <Link to="/add-query" className="btn btn-accent">Add New Query</Link>

        </div>
    );
};

export default MyQueries;