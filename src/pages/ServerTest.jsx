// ServerTest.jsx
import React from 'react';
import ServerTesting from '../components/ServerTesting'; // Adjust the path based on your folder structure

const ServerTest = () => {
    return (
        <div className="server-test-page">
            <h1 className="text-2xl font-bold mb-4">Server Test Page</h1>
            <ServerTesting /> {/* Render the ServerTesting component */}
        </div>
    );
};

export default ServerTest;
