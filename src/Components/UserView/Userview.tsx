import { LatLngBoundsLiteral } from 'leaflet';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ImageOverlay, MapContainer } from 'react-leaflet'
import { GeoJSON } from "react-leaflet";
import Topbar from './Topbar';
import UserViewIInfoModal from './UserViewIInfoModal';
import UserViewMapTable from './UserViewMapTable';
import { data } from './data';
type State = {
    imageUrl: string | null;
    polygonName: string;
    showModal: boolean;
    infoModal: boolean;
    createdLayer: any | null;
    details: string;
    imageFile: File | null;
  };
  
  const initialState: State = {
    imageUrl: null,
    polygonName: "",
    showModal: false,
    infoModal: false,
    createdLayer: null,
    details: "",
    imageFile: null,
  };

const bounds: LatLngBoundsLiteral = [
    [0, 0],
    [4000, 300],
  ];
  
const Userview = () => {
    const [state, setState] = useState<State>(initialState); // Use a single state object
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([65, 150]);
    const [mapZoom, setMapZoom] = useState<number>(4);
    const [importedData, setImportedData] = useState<any[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<any>(null);
    const mapRef = useRef<any>(null);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [slideAnimation, setSlideAnimation] = useState<boolean>(false);
  
    const renderGeoJSONStyle = (feature: any) => {
        if (feature && feature.properties && feature.properties.color) {
          return {
            fillColor: feature.properties.color,
            color: feature.properties.color,
          };
        }
        return {};
      };

      useEffect(()=> {
        setGeoJsonData(data)
      },[])

      const renderGeoJSONOnEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
          const popupContent = `
            <h3>${feature.properties.name}</h3>
            <img src="${feature.properties.image || ""}" alt="${feature.properties.name}" width="100" />
            <p>${feature.properties.details || ""}</p>`;
          layer.bindPopup(popupContent);
          layer.on('mouseover', function () {
            layer.openPopup();
          });
      
          layer.on('mouseout', function () {
            layer.closePopup();
          });
      
        
          layer.on('click', function () {
            setState((prevState) => ({
              ...prevState,
              infoModal: true,
              createdLayer: layer,
            }));
            setSelectedFeature(feature);
          });
        }
      };

      const importGeoJson = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
              const importedData = JSON.parse(e.target?.result as string);
              setImportedData(importedData.features || []);
              setGeoJsonData(importedData);
              console.log("GeoJSON import successful!"); // Log success message
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          };
          reader.readAsText(file);
        }
      };

      const toggleTable = () => {
        setShowTable(!showTable);
        setSlideAnimation(true);
    };

    const flyToFeature = (feature: any) => {
        if (feature && feature.geometry && feature.geometry.type === "Polygon") {
            const coordinates = feature.geometry.coordinates[0]; 
            if (coordinates.length > 0) {
                const sumLatLng = coordinates.reduce(
                    (acc: [number, number], coord: [number, number]) => {
                        return [acc[0] + coord[0], acc[1] + coord[1]];
                    },
                    [0, 0]
                );
                const avgLatLng = [
                    sumLatLng[1] / coordinates.length,
                    sumLatLng[0] / coordinates.length,
                ];
                const map = mapRef.current;
                if (map) {
                    map.flyTo(avgLatLng, 6);
                }
            }
        }
    };
    
    return (
        <div className="">
            <Topbar
            importGeoJson={importGeoJson}
            />
            <div className="w-full">
                <MapContainer ref={mapRef} center={mapCenter} zoom={mapZoom} style={{ zIndex: 1 }} className="w-full h-screen">
                    <ImageOverlay
                        bounds={bounds}
                        url="https://bsv-th-authorities.com/impage_pro/รายคณะ.jpg"
                    />
                    {geoJsonData && (
                        <GeoJSON
                            data={data}
                            style={renderGeoJSONStyle} // Use the style function
                            onEachFeature={renderGeoJSONOnEachFeature} // Use the onEachFeature function
                        />

                    )}
                </MapContainer>
            </div>
            <UserViewIInfoModal
        infoModal={state.infoModal}
        createdLayer={state.createdLayer}
        closeModal={() => setState((prevState) => ({ ...prevState, infoModal: false }))}
      />
      <UserViewMapTable
       showTable={showTable}
       slideAnimation={slideAnimation}
       toggleTable={toggleTable}
       importedData={importedData}
       flyToFeature={flyToFeature}
      />
        </div>

    )
}

export default Userview