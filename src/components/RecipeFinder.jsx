// src/components/RecipeFinder.jsx
import React, { useState } from "react";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found. Try another keyword!");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchRecipes();
    } else {
      setError("Please enter a recipe name!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
     <h1 
  className="text-2xl font-bold text-center cursor-pointer" 
  onClick={() => window.location.reload()}
>
  🍽️ Recipe Finder
</h1>

      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l mr-10"
          placeholder="Search for a recipe..."
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-r hover:bg-green-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading recipes...</p>}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="mt-4">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="border p-4 mb-4 rounded">
            <h2 className="font-semibold">{recipe.strMeal}</h2>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded"
            />
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 block mt-2"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;
