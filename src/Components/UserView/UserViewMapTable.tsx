import React, { useState } from 'react'

type MapTableProps = {
    showTable: boolean;
    slideAnimation: boolean;
    toggleTable: () => void;
    flyToFeature: (feature: any) => void;
    importedData: any[];
};


const UserViewMapTable: React.FC<MapTableProps> = ({ 
    flyToFeature, 
    toggleTable, 
    importedData, 
    showTable, 
    slideAnimation 
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeImagePreview = () => {
        setSelectedImage(null);
    };

  return (
   <>
            <div className="fixed bottom-4 right-4 m-6 z-[1000]">
                <button onClick={toggleTable} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
                    INFO
                </button>
            </div>
            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
                    <div className="max-w-screen-lg max-h-screen-3/4">
                        <button onClick={closeImagePreview} className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 focus:outline-none">
                            &times;
                        </button>
                        <img src={selectedImage} alt="Image Preview" className="max-w-full max-h-full" />
                    </div>
                </div>
            )}
            <div
                className={`fixed bottom-0 left-0 right-0 h-[300px] w-full bg-white p-4 transition-transform duration-300 transform ${showTable ? "translate-y-0" : "translate-y-full"
                    } z-50 overflow-y-scroll`}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                รหัส
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                รูป
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ชื่อ
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                รายละเอียด
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                สี
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {importedData.map((item, index) => (
                            <tr
                                key={index}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={item.properties.image} 
                                    alt={item.properties.name} 
                                    className="w-12 h-12 rounded-full object-cover cursor-pointer" 
                                    onClick={() => handleImageClick(item.properties.image)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.properties.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.properties.details}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.properties.color}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => flyToFeature(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                                        ดู
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
  )
}

export default UserViewMapTable