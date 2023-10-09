import React, { useState, ChangeEvent, useRef } from "react";
import {
    MapContainer,
    FeatureGroup,
    ImageOverlay,
} from "react-leaflet";
import L, { LatLngBoundsLiteral } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { conformToRightHandRule } from "../ConvertRightHand";
import { GeoJSON } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import BaseMap from "./BaseMap";
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

const Map: React.FC = () => {
    const [adminMode, setAdminMode] = useState(true);
    const initialDraftData = localStorage.getItem("draftPolygons");
    const [draftPolygons, setDraftPolygons] = useState<any[]>(
        initialDraftData ? JSON.parse(initialDraftData) : []
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [state, setState] = useState<State>(initialState); 
    const [selectedColor, setSelectedColor] = useState("#FF5733"); 
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [geoJson, setGeoJson] = useState<any>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([65, 150]);
    const [mapZoom, setMapZoom] = useState<number>(4);
    const [importedData, setImportedData] = useState<any[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<any>(null);
    const mapRef = useRef<any>(null);
    
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
            <img src="${state.imageUrl || state.imageFile}" alt="${state.polygonName
                }" width="100" />
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
    return (
        <div className="flex border ">
            <div
                className={`relative bg-gray-200 transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? " w-92" : "w-0"
                    } overflow-x-hidden`}
            >
                <div className="flex flex-col items-center justify-center p-4">
                    {/* Hamburger menu button */}
                    <button
                        onClick={toggleSidebar}
                        className="hamburger-menu bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        ☰
                    </button>

                    {/* Content in the sidebar */}
                    <div className={`w-96 mt-4  ${isSidebarOpen ? "block" : "hidden"}`}>
                        <div className="flex flex-col border">
                            <button
                                onClick={onClickAdminButton}
                                className={`${adminMode ? "bg-green-500" : "bg-red-500"
                                    } rounded-md `}
                            >
                                {adminMode ? "Admin Mode" : "Edit Mode"}
                            </button>
                            <input
                                id="geoJsonInput"
                                type="file"
                                accept=".json"
                                onChange={importGeoJson}
                                style={{ display: "none" }}
                            />
                            <button
                                onClick={() => document.getElementById("geoJsonInput")?.click()}
                            >
                                Import Drafts
                            </button>
                            <button onClick={exportDrafts}>Export Drafts</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border">
                    {/* Other sidebar content */}
                    <h3 className="text-lg font-semibold mb-2">Imported Data</h3>
                    <ul>
                        {importedData.map((item, index) => (
                            <li key={index}
                            onClick={() => flyToFeature(item)}
                            className="cursor-pointer"
                            >
                                {/* Render each item from the imported data */}
                                <span>{item.properties.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {state.showModal && (
                    <div className="bg-gray-200 p-4 ">
                        <h3 className="text-lg font-semibold mb-4">
                            Enter Polygon Details
                        </h3>
                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="text"
                                placeholder="Polygon Name"
                                onChange={(e) =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        polygonName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="text"
                                placeholder="Image URL"
                                onChange={(e) =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        imageUrl: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                onChange={handleImageInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="text"
                                placeholder="Details"
                                onChange={(e) =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        details: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md"
                                type="color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() =>
                                    setState((prevState) => ({ ...prevState, showModal: false }))
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                                onClick={savePolygonData}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {state.infoModal ? (
                    <div className="bg-red-600">
                        <p>{state.createdLayer?.feature?.properties?.name}</p>
                        <img src={state.createdLayer?.feature?.properties?.image || ""} alt={state.createdLayer?.feature?.properties?.name} width="100" />
                        <p>{state.createdLayer?.feature?.properties?.details || ""}</p>
                    </div>
                ) : null}
            </div>

            <div className="w-full">
                <MapContainer ref={mapRef} center={[65, 150]} zoom={4} className="w-full h-screen">
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
                            style={(feature) => {
                                if (feature && feature.properties && feature.properties.color) {
                                    return {
                                        fillColor: feature.properties.color,
                                        color: feature.properties.color,
                                    };
                                }
                                return {};
                            }}
                            onEachFeature={(feature, layer) => {
                                if (feature.properties) {
                                    const popupContent = `
                                                <h3>${feature.properties.name}</h3>
                                                <img src="${feature.properties.image || ""}" alt="${feature.properties.name}" width="100" />
                                                <p>${feature.properties.details || ""}</p>`;
                                    layer.bindPopup(popupContent);

                                    layer.on('click', function () {
                                        setState((prevState) => ({
                                            ...prevState,
                                            infoModal: true,
                                            createdLayer: layer, // ส่งเลเยอร์ของ polygon ที่คลิกไปยัง state
                                        }));
                                        setSelectedFeature(feature);
                                    });
                                }
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
