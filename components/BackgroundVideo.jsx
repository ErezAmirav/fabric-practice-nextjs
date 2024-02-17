'use client'
import React, { useState } from 'react';

const BackgroundVideo = () => {
  const [videoPath, setVideoPath] = useState('');

  // Function to handle changes in the input field
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Get the path of the selected file
      const path = URL.createObjectURL(file);
      // Update the state with the file path
      setVideoPath(path);
    }
  };

  return (
    <div>
      {/* Input field for selecting a video file */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
      />
      {/* Display the selected video */}
      {videoPath && (
        <video controls width={400}>
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default BackgroundVideo;
