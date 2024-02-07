### NextJS & FabricJS Practice

#### About
The `FabricCanvas` component is a Next component designed to display a video, an image uploaded by the user, and editable text on a canvas.
It utilizes the Fabric.js library for canvas manipulation.

#### Features
- Upload and display images on a canvas.<br>
- Animate uploaded images from side to side.<br>
- Remove uploaded images after a specified duration.<br>
- Add editable text to the canvas.

#### How It Works
- Image Upload: 
Users can select an image file using the provided file input. Upon selection, the image is displayed on the canvas.

- Image Animation: 
The uploaded image is animated from side to side continuously using the Fabric.js library.

- Image Removal: 
After a specified duration (default: 5 seconds), the uploaded image is automatically removed from the canvas.

- Editable Text: 
Users can add editable text to the canvas by clicking the "Add Editable Text" button. The text can be edited directly on the canvas.