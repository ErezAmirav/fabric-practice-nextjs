'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoDuration } from '@/store/action';
import { useSelector } from 'react-redux';

const BackgroundVideo = () => {
  const [videoPath, setVideoPath] = useState(null);
  // const [videoDuration, setVideoDuration] = useState(null);
  const dispatch = useDispatch();
  const videoDuration = useSelector((state) => state.videoDuration);
  // Function to handle changes in the input field
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const path = URL.createObjectURL(file);
      setVideoPath(path);
      setVideoDuration(null);
    }
  };

  // Function to get uploaded video duration
  const handleVideoLoadedMetadata = (e) => {
    const duration = e.target.duration;
    dispatch(setVideoDuration(duration));
  };

  const removeVid = () => {
    setVideoPath(null);
    setVideoDuration(null);
  };

  return (
    <div className="w-[520px] h-[300px]">
      <h1 className="text-xl font-bold my-2">Upload Video</h1>
      <form className="imgForm">
        <label
          htmlFor="myfile"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Video:
        </label>
        <input
          className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 bg-gray-700 border-gray-600 file:p-2 file:bg-gradient-to-br from-purple-500 to-cyan-500 file:border-none file:text-white hover:file:text-slate-300"
          type="file"
          id="myfile"
          name="myfile"
          accept="video/*"
          onChange={handleVideoChange}
        />
      </form>
      <button
        className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 hover:bg-slate-800 text-white text-sm mt-3 mb-3"
        onClick={removeVid}
      >
        <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-3 py-1">
          Remove Video
        </span>
      </button>
      {videoPath && (
        <div className="left-[50%] z-0">
          <video
            autoPlay
            muted
            loop
            controls
            width={520}
            height={300}
            style={{ position: 'relative', left: '18rem', zIndex: '0' }}
            onLoadedMetadata={handleVideoLoadedMetadata}
          >
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {videoDuration && (
        <p className="text-sm mt-2">
          Video Duration: {videoDuration.toFixed(2)} seconds
        </p>
      )}
    </div>
  );
};

export default BackgroundVideo;
