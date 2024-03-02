// components/VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [bufferingBar, setBufferingBar] = useState(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      // Initialize the Fabric canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 320,
        height: 30, // Adjust based on your needs
        selection: false, // Disables object selection
      });
      setFabricCanvas(canvas);
      canvas.dispose()

      // Create and add the buffering bar
      const bufferingRect = new fabric.Rect({
        left: 0,
        top: 10,
        fill: '#ccc',
        width: 1, // Initial minimal width
        height: 10,
        selectable: false,
      });
      canvas.add(bufferingRect);
      setBufferingBar(bufferingRect);

      // Create and add the progress bar
      const progressRect = new fabric.Rect({
        left: 0,
        top: 10,
        fill: 'red',
        width: 1, // Initial minimal width
        height: 10,
        selectable: false,
      });
      canvas.add(progressRect);
      setProgressBar(progressRect);
    }
 
  }, [fabricCanvas]);

  // Update progress and buffering as the video plays and buffers
  useEffect(() => {
    const video = videoRef.current;
    if (video && fabricCanvas && progressBar && bufferingBar) {
      const updateProgress = () => {
        const progress =
          (video.currentTime / video.duration) * fabricCanvas.width;
        progressBar.set({ width: progress });
        fabricCanvas.renderAll();
      };

      const updateBuffering = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          const width = (bufferedEnd / duration) * fabricCanvas.width;
          bufferingBar.set({ width });
          fabricCanvas.renderAll();
        }
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('progress', updateBuffering);

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('progress', updateBuffering);
      };
    }
  }, [fabricCanvas, progressBar, bufferingBar]);

  return (
    <div>
      <video ref={videoRef} width="320" height="240" src={src} controls />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default VideoPlayer;
