import React, { useState, ChangeEvent, useCallback, useRef, useEffect } from "react";
import {
  MapContainer,
  FeatureGroup,
  ImageOverlay,
  Popup,
} from "react-leaflet";
import L, { LatLngBoundsLiteral, map } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { conformToRightHandRule } from "../ConvertRightHand";
import { GeoJSON } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import PolygonDetailsModal from "./PolygonDetailsModal";
import InfoModal from "./InfoModal";
import MapTable from "./MapTable";

type State = {
  adminMode: boolean;
  imageUrl: string | null;
  polygonName: string;
  showModal: boolean;
  infoModal: boolean;
  createdLayer: any | null;
  details: string;
  imageFile: File | null;
};

const initialState: State = {
  adminMode: true,
  imageUrl: null,
  polygonName: "",
  showModal: false,
  infoModal: false,
  createdLayer: null,
  details: "",
  imageFile: null,
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [4000, 300],
];

const MapComponents: React.FC = () => {
  const [adminMode, setAdminMode] = useState(true);
  const initialDraftData = localStorage.getItem("draftPolygons");
  const [draftPolygons, setDraftPolygons] = useState<any[]>(
    initialDraftData ? JSON.parse(initialDraftData) : []
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [state, setState] = useState<State>(initialState); // Use a single state object
  const [selectedColor, setSelectedColor] = useState("#FF5733"); // Default color
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([65, 150]);
  const [mapZoom, setMapZoom] = useState<number>(4);
  const [importedData, setImportedData] = useState<any[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [slideAnimation, setSlideAnimation] = useState<boolean>(false);

  const toggleTable = () => {
      setShowTable(!showTable);
      setSlideAnimation(true);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClickAdminButton = () => {
    setAdminMode(!adminMode);
    console.log(adminMode);
  };

  const onCreated = (e: any) => {
    const type = e.layerType;
    const layer = e.layer;
    const geoJSON = layer.toGeoJSON();
    const conformingGeoJSON = conformToRightHandRule(geoJSON);
    if (type === "marker") {
      // ...
    } else if (type === "polyline" || type === "polygon") {
      setState((prevState) => ({
        ...prevState,
        showModal: true,
        createdLayer: layer,
      }));
      setDraftPolygons((prevDrafts) => [...prevDrafts, conformingGeoJSON]);
      setGeoJson(conformingGeoJSON);

      // Fit the map to the bounds of the newly created polygon
      const polygonBounds = layer.getBounds();
      const map = layer._map; // Get a reference to the map
      map.fitBounds(polygonBounds);

      // Set the map center and zoom to the fitted bounds
      setMapCenter(map.getCenter());
      setMapZoom(map.getZoom());

      layer.on('click', function () {
        // Your onClick logic here
        console.log('Polygon clicked');
      });
    } else {
      // ...
    }
  };

  const savePolygonData = () => {
    geoJson.properties = {
      id: uuidv4(),
      name: state.polygonName,
      image: state.imageUrl,
      details: state.details,
      ...geoJson.properties,
      color: selectedColor,
    };
    setState((prevState) => ({ ...prevState, showModal: false }));
    console.log(geoJson)
    if (state.polygonName && state.createdLayer) {
      const content = `
        <h3>${state.polygonName}</h3>
        <img src="${state.imageUrl || state.imageFile}" alt="${state.polygonName}" width="100" />
        <p>${state.details || ""}</p>
      `;
      state.createdLayer.bindPopup(content).openPopup();
      state.createdLayer.setStyle({
        fillColor: selectedColor,
        color: selectedColor,
      });
      console.log(state.polygonName)
    } else {
    }
  };

  const exportDrafts = () => {
    const geoJSONData = {
      type: "FeatureCollection",
      features: draftPolygons,
    };
    const geoJSONString = JSON.stringify(geoJSONData, null, 2);
    const blob = new Blob([geoJSONString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "polygon_drafts.json";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setState((prevState) => ({ ...prevState, imageFile: file }));
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedData)) {
            setState((prevState) => ({
              ...prevState,
              imageFile: file,
            }));
          } else {
            console.error("Imported data is not an array.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const renderGeoJSONStyle = (feature: any) => {
    if (feature && feature.properties && feature.properties.color) {
      return {
        fillColor: feature.properties.color,
        color: feature.properties.color,
      };
    }
    return {};
  };

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
    <div className="flex border">
      <Sidebar
        adminMode={adminMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onClickAdminButton={onClickAdminButton}
        importGeoJson={importGeoJson}
        exportDrafts={exportDrafts}
        importedData={importedData}
        flyToFeature={flyToFeature}
        toggleTable={toggleTable}
      />

      <div className="w-full">
        <MapContainer ref={mapRef} center={mapCenter} zoom={mapZoom} style={{zIndex:1}} className="w-full h-screen">
          <ImageOverlay
            bounds={bounds}
            url="https://bsv-th-authorities.com/impage_pro/รายคณะ.jpg"
          />
          <FeatureGroup>
            {/* Add this FeatureGroup to contain the drawn polygons */}
            {adminMode ? (
              <EditControl
                position="topright"
                onCreated={onCreated}
                draw={{
                  rectangle: false,
                }}
              />
            ) : null}
          </FeatureGroup>
          {/* Display drawn polygons based on selected base layer */}
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={renderGeoJSONStyle} // Use the style function
              onEachFeature={renderGeoJSONOnEachFeature} // Use the onEachFeature function
            />

          )}
        </MapContainer>
      </div>

      <PolygonDetailsModal
        showModal={state.showModal}
        polygonName={state.polygonName}
        imageUrl={state.imageUrl}
        details={state.details}
        selectedColor={selectedColor}
        handleImageInputChange={handleImageInputChange}
        savePolygonData={savePolygonData}
        closeModal={() =>
          setState((prevState) => ({ ...prevState, showModal: false }))
        }
        setPolygonName={(name) => setState((prevState) => ({ ...prevState, polygonName: name }))}
        setImageUrl={(url) => setState((prevState) => ({ ...prevState, imageUrl: url }))}
        setDetails={(details) => setState((prevState) => ({ ...prevState, details: details }))}
        setSelectedColor={(color) => setSelectedColor(color)}
      />

      <InfoModal
        infoModal={state.infoModal}
        createdLayer={state.createdLayer}
        closeModal={() => setState((prevState) => ({ ...prevState, infoModal: false }))}
      />
      <MapTable
       showTable={showTable}
       slideAnimation={slideAnimation}
       toggleTable={toggleTable}
       importedData={importedData}
       flyToFeature={flyToFeature}
      />
    </div>
  );
};

export default MapComponents;
