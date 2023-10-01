import React from "react";
import { ImageOverlay, LayersControl, TileLayer } from "react-leaflet";
import L, { LatLngBoundsLiteral } from "leaflet";
type Props = {};

const BaseMap = (props: Props) => {
    const bounds: LatLngBoundsLiteral = [
        [0, 0],
        [4000, 300],
    ];

    return (
        
                <ImageOverlay
                    bounds={bounds}
                    url="https://bsv-th-authorities.com/impage_pro/รายคณะ.jpg"
                />
           
       

    );
};

export default BaseMap;
