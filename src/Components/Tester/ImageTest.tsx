import React, { ChangeEvent, useState } from 'react';

const ImageTest: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setImage(base64data);
        if (typeof base64data === 'string') {
          console.log('Base64:', base64data); // Log the base64 data to the console
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <h2>Preview Image</h2>
          <img src={image as string} alt="preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ImageTest;
