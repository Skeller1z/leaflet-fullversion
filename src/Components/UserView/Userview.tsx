import { LatLngBoundsLiteral } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { ImageOverlay, MapContainer } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
import Topbar from './Topbar';
import UserViewIInfoModal from './UserViewIInfoModal';
import UserViewMapTable from './UserViewMapTable';
import { data } from './data/data';
import { data2 } from './data/data2';

const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [4000, 300],
];

const Userview = () => {
  const [selectedData, setSelectedData] = useState(data); // เริ่มต้นด้วย data
  const [mapCenter, setMapCenter] = useState<[number, number]>([65, 150]);
  const [mapZoom, setMapZoom] = useState<number>(4);
  const mapRef = useRef<any>(null);

  const handleDataChange = (newData:any) => {
    setSelectedData(newData);
  };

  return (
    <div className="">
      <div>
        <h2>Select Data:</h2>
        <ul>
          <li>
            <button onClick={() => handleDataChange(data)}>Data 1</button>
          </li>
          <li>
            <button onClick={() => handleDataChange(data2)}>Data 2</button>
          </li>
        </ul>
      </div>

      <div className="w-full">
        <MapContainer
          ref={mapRef}
          center={mapCenter}
          zoom={mapZoom}
          style={{ zIndex: 1 }}
          className="w-full h-screen"
        >
          <ImageOverlay
            bounds={bounds}
            url={selectedData.imageOverlayUrl} // ใช้ URL จาก selectedData
          />
          {selectedData && (
            <GeoJSON
              data={selectedData}
              key={JSON.stringify(selectedData)}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Userview;
