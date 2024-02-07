// components/MainContent.js
'use client';
import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const MainContent = () => {
  const canvasRef = useRef(null);
  let fabricCanvas;

  useEffect(() => {
    fabricCanvas = new fabric.Canvas(canvasRef.current, { selection: false });
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Function to handle image upload and display on canvas
  const displayImage = (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const fabricImage = new fabric.Image(img, {
            left: 0,
            top: 75,
            selectable: true,
            hasControls: true,
            hasBorders: true,
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: false,
            lockScalingY: false,
            cornerColor: 'blue',
          });

          fabricImage.set({
            scaleX: 150 / fabricImage.width,
            scaleY: 150 / fabricImage.width,
          });

          // fabricCanvas.clear(); // Enable to remove anything from the canvas after adding a new image
          fabricCanvas.add(fabricImage);
          fabricCanvas.renderAll();

          // Removing the image after 5 seconds as requested
          setTimeout(() => {
            fabricCanvas.remove(fabricImage);
          }, 5000);

          let start = performance.now();
          let duration = 1000; // Movement duration from side to side
          let startPosition = 0;
          let endPosition = 520 - fabricImage.getScaledWidth();
          let direction = 1;

          // Function to handle the image animation looped from side to side
          function animate(currentTime) {
            const elapsedTime = currentTime - start;
            const progress = Math.min(elapsedTime / duration, 1);
            let newPosition;

            if (direction === 1) {
              newPosition =
                startPosition + (endPosition - startPosition) * progress;
            } else {
              newPosition =
                endPosition - (endPosition - startPosition) * progress;
            }

            fabricImage.set('left', newPosition);
            fabricCanvas.renderAll();

            if (progress >= 1) {
              direction *= -1; // Reverse direction
              start = performance.now(); // Restart animation
            }
            requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  // Function for Editable Text
  const addEditableText = () => {
    const text = new fabric.IText('Editable Text', {
      left: 150,
      top: 250, // Left & Top parts for initial location
      fontSize: 30,
      fill: 'black', // Font Color
      fontFamily: 'Verdana',
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    // text.enterEditing(); // Enable to enter edit mode on start
    // text.selectAll(); // Enable to select all text before editing
    fabricCanvas.renderAll();
  };

  return (
    <div className="main-page">
      <div className="grid grid-cols-2 gap-8">
        {/* Video Section */}
        <div className="z-0 object-fill w-520 h-300">
          <video id="backVid" autoPlay loop width={520} height={300}>
            <source
              src="assets/corgivid.mp4"
              type="video/mp4"
              width={520}
              height={300}
              className="object-fill"
            />
          </video>
        </div>
        {/* Canvas Section */}
        <div className="absolute z-20">
          <canvas ref={canvasRef} id="c" width="520" height="300"></canvas>
        </div>
        {/* Form Section */}
        <div>
          <div className="text-xl font-bold my-2">Upload Image</div>
          <form className="imgForm">
            <label
              htmlFor="myfile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a file:
            </label>
            <input
              className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 bg-gray-700 border-gray-600 file:p-2 file:bg-gradient-to-br from-purple-500 to-cyan-500 file:border-none file:text-white hover:file:text-slate-300"
              type="file"
              id="myfile"
              name="myfile"
              onChange={displayImage}
            />
            <br />
          </form>
          <button
            className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 hover:bg-slate-800 text-white mt-3"
            onClick={addEditableText}
          >
            <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
              Add Editable Text
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
