// PopupContent.tsx (สร้างไฟล์ใหม่)
import React from "react";

type PopupContentProps = {
    polygonName: string;
    imageUrl: string;
    details?: string;
};

const PopupContent: React.FC<PopupContentProps> = ({
    polygonName,
    imageUrl,
    details,
}) => {
    return (
        <div>
            <h3 className="bg-red-600">{polygonName}</h3>
            <img src={imageUrl} alt={polygonName} width="100" />
            <p>{details}</p>
        </div>
    );
};

export default PopupContent;
