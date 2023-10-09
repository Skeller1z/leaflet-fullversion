import React from "react";

type PolygonDetailsModalProps = {
    showModal: boolean;
    polygonName: string;
    imageUrl: string | null;
    details: string;
    selectedColor: string;
    handleImageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    savePolygonData: () => void;
    closeModal: () => void;
    setPolygonName: (name: string) => void; // Add these props
    setImageUrl: (url: string | null) => void; // Add these props
    setDetails: (details: string) => void; // Add these props
    setSelectedColor: (color: string) => void; // Add these props
};

const PolygonDetailsModal: React.FC<PolygonDetailsModalProps> = ({
    showModal,
    polygonName,
    imageUrl,
    details,
    selectedColor,
    handleImageInputChange,
    savePolygonData,
    closeModal,
    setPolygonName, // Add these props
    setImageUrl, // Add these props
    setDetails, // Add these props
    setSelectedColor, // Add these props
}) => {
    if (!showModal) {
        return null;
    }
    return (
        <div className="bg-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Enter Polygon Details</h3>
        <div className="mb-4">
            <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                placeholder="Polygon Name"
                value={polygonName}
                onChange={(e) => setPolygonName(e.target.value)} // Use setPolygonName prop
            />
        </div>
        <div className="mb-4">
            <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                placeholder="Image URL"
                value={imageUrl || ""}
                onChange={(e) => setImageUrl(e.target.value)} // Use setImageUrl prop
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
                value={details}
                onChange={(e) => setDetails(e.target.value)} // Use setDetails prop
            />
        </div>
        <div className="mb-4">
            <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)} // Use setSelectedColor prop
            />
        </div>
        <div className="flex justify-end">
            <button
                className="px-4 py-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
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
    );
};

export default PolygonDetailsModal;
