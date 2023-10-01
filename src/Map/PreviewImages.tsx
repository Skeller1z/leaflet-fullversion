import GeoJSON from 'geojson'
import React, { useRef, useState } from 'react'
import { Popup } from 'react-leaflet';

type State = {
    adminMode: boolean;
    imageUrl: string | null;
    polygonName: string;
    showModal: boolean;
    createdLayer: any | null;
    details: string;
};

const initialState: State = {
    adminMode: true,
    imageUrl: null,
    polygonName: "",
    showModal: false,
    createdLayer: null,
    details: "",
};

interface Props {
    geojson: React.ElementType; // 👈️ type it as React.ElementType
  }

const PreviewImages: React.FC<Props> = (props) => {
    const {geojson: GeoJSON} = props;
    const [polygonName, setPolygonName] = useState<string>("");
    const initialDraftData = localStorage.getItem("draftPolygons");
    const [draftPolygons, setDraftPolygons] = useState<any[]>(
        initialDraftData ? JSON.parse(initialDraftData) : []
    );
  
  return (
    <div>
 {draftPolygons.map((polygon, index) => (
            <GeoJSON
              key={index}
              data={polygon}
              style={() => ({
                fillColor: polygon.properties.color,
                color: "black",
                weight: 2,
                opacity: 1,
              })}
            >
              <Popup>
                <div>
                  <h3>{polygonName}</h3>
                  <img
                    src={polygon.imageUrl}
                    alt={polygon.polygonName}
                    width="100"
                  />
                  <p>{polygon.details || ""}</p>
                </div>
              </Popup>
            </GeoJSON>
          ))}
    </div>
  )
}

export default PreviewImages