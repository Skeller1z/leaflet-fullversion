import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import L, { LatLngBoundsLiteral } from "leaflet";

const bounds: LatLngBoundsLiteral = [
    [0, 0], // มุมบนซ้าย
    [4000, 300], // มุมล่างขวา
];

const PolygonMap: React.FC<{ polygons: any[] }> = ({ polygons }) => {
    const [map, setMap] = useState<any>(null);

    useEffect(() => {
        if (map && polygons.length > 0) {
            // เพิ่ม polygon ลงในแผนที่
            polygons.forEach((polygon) => {
                L.geoJSON(polygon.geoJSON).addTo(map);
            });
        }
    }, [map, polygons]);

    return (
        <MapContainer center={[65, 150]} zoom={4} className="w-full h-screen">
            <ImageOverlay bounds={bounds} url="https://bsv-th-authorities.com/impage_pro/รายคณะ.jpg" />
        </MapContainer>
    );
};

export default PolygonMap;
