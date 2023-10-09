import React from "react";
import { ImageOverlay } from "react-leaflet";
import  { LatLngBoundsLiteral } from "leaflet";
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
