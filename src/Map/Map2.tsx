// import React, { useState } from 'react';
// import {  ImageOverlay, MapContainer } from 'react-leaflet';

// import { useDropzone } from 'react-dropzone';
// import GeoJSON from 'geojson';

// interface GeoJSONFeature {
//   type: 'Feature';
//   geometry: {
//     type: string;
//     coordinates: number[];
//   };
//   properties: {
//     [key: string]: any;
//   };
// }

// const MapComponent: React.FC = () => {
//   const [imageBounds, setImageBounds] = useState<LatLngBounds | null>(null);
//   const [geoJSONData, setGeoJSONData] = useState<GeoJSONFeature | null>(null);

//   const onDrop = (acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         try {
//           const geoJSONData = JSON.parse(event.target?.result as string) as GeoJSONFeature;
//           setGeoJSONData(geoJSONData);

//           // You need to specify the bounds of your image here
//           // For example, adjust the coordinates accordingly
//           const southWest: LatLngLiteral = { lat: 40, lng: -75 };
//           const northEast: LatLngLiteral = { lat: 45, lng: -70 };
//           setImageBounds(new LatLngBounds(southWest, northEast));
//         } catch (error) {
//           console.error('Error parsing GeoJSON:', error);
//         }
//       };

//       reader.readAsText(file);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: '.geojson',
//   });

//   return (
//     <div>
//       <div {...getRootProps()} style={dropzoneStyles}>
//         <input {...getInputProps()} />
//         <p>Drag & drop a GeoJSON file here, or click to select one.</p>
//       </div>
//       <MapContainer center={[42.5, -72.5]} zoom={6} style={{ height: '500px' }}>
//         {imageBounds && <ImageOverlay url="/your-image.jpg" bounds={imageBounds} />}
//         {geoJSONData && <GeoJSON data={geoJSONData} />}
//       </MapContainer>
//     </div>
//   );
// };

// const dropzoneStyles: React.CSSProperties = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

// export default MapComponent;

import React from 'react'

const Map2 = () => {

  return (
    <div>Map2</div>
  )
}

export default Map2