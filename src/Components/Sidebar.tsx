import L, { map } from "leaflet";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from 'antd'
type SidebarProps = {
  adminMode: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onClickAdminButton: () => void;
  importGeoJson: (event: React.ChangeEvent<HTMLInputElement>) => void;
  exportDrafts: () => void;
  importedData: any[];
  flyToFeature: (feature: any) => void;
  toggleTable: () => void;
  SelectImageOverlay: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  adminMode,
  isSidebarOpen,
  toggleSidebar,
  onClickAdminButton,
  importGeoJson,
  exportDrafts,
  importedData,
  flyToFeature,
  toggleTable,
  SelectImageOverlay
}) => {

  const navigate = useNavigate();
  const Logout = () => {
    navigate('/')
  }

  return (
    <div
      className={`relative bg-gray-200 transition-all duration-300 ease-in-out z-50 ${
        isSidebarOpen ? "w-92" : "w-0"
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
              className={`${adminMode ? "bg-green-500" : "bg-red-500"} rounded-md`}
            >
              {adminMode ? "Admin Mode" : "Edit Mode"}
            </button>
            <input className="" type="file" accept="image/*" onChange={SelectImageOverlay} />
            <input
              id="geoJsonInput"
              type="file"
              accept=".json"
              onChange={importGeoJson}
              style={{ display: "none" }}
            />
            <button onClick={() => document.getElementById("geoJsonInput")?.click()}>Import Drafts</button>
            <button onClick={exportDrafts}>Export Drafts</button>
            <button onClick={Logout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col border">
        {/* Other sidebar content */}
        <h3 className="text-lg font-semibold mb-2">Imported Data</h3>
        <ul>
        {importedData.map((item, index) => (
            <li
            key={index}
            id={`listItem-${index}`}
            onClick={() => flyToFeature(item)}
            className="cursor-pointer"
          >
              {/* Render each item from the imported data */}
              <span>{item.properties.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="fixed bottom-4 right-4 m-6 z-[10000]">
  <button onClick={toggleTable} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
    INFO
  </button>
</div> */}

    </div>
  );
};

export default Sidebar;
