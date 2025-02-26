import React from 'react';
import RecipeFinder from './components/RecipeFinder';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RecipeFinder />
    </div>
  );
};

export default App;