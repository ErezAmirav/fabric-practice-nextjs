import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

export default function VideoController() {
  const canvasRef = useRef(null);
  let line = null;

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current);

    // Draw progress line
    line = new fabric.Line([50, 50, 250, 50], {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
    });
    canvas.add(line);

    // Logic to control video timeline
    line.on('mousedown', function (options) {
      // Calculate new progress based on mouse position
      const newProgress = (options.pointer.x - 50) / 200;
      // Update video timeline based on new progress
      updateVideoTimeline(newProgress);
    });
    return () => {
        canvas.dispose();
      };
  }, []);

  // Function to update video timeline
  const updateVideoTimeline = (progress) => {
    // Logic to update video timeline
    console.log('Updating video timeline to:', progress);
    // Example: You can use this progress to update the video currentTime
  };

  return (
    <div>
      <video controls width="300">
        <source src="/assets/corgividLonger.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} width={300} height={100} />
    </div>
  );
}
