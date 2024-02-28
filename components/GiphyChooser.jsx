'use client';
import React, { useState } from 'react';

const GiphyChooser = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [chosenGIF, setChosenGIF] = useState('');
  const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=20`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-bold my-2">Search GIF</h1>
      <input
        className="text-sm border rounded-md text-gray-400 bg-gray-700 border-gray-600 w-full outline-none"
        type="text"
        placeholder="Search GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='text-sm bg-gray-700 rounded-md text-gray-400 border border-gray-600' onClick={handleSearch}>Search</button>
      <div className="items-center">
        <div className="grid grid-cols-5">
          {gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-20 h-20 object-contain"
              onClick={() => setChosenGIF(gif.images.fixed_height.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiphyChooser;
