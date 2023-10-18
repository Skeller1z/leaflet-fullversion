import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Topbar: React.FC = () => {
    const [showTable, setShowTable] = useState<boolean>(false);

    const navigate = useNavigate();
    const Logout = () => {
        navigate('/')
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const setTable = () => {
        setShowTable(!showTable)
    }
    return (
        <div className="fixed top-0 right-0 m-8 z-[1000]">
      <div className={`relative ${isOpen ? 'z-[1000]' : ''}`}>
        <button
          className={`w-12 h-12 bg-blue-500 rounded-full text-white flex justify-center items-center`}
          onClick={toggleMenu}
        >
          <span>Menu</span>
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-32 rounded-lg bg-white shadow-lg py-2 -bottom-4 transform translate-y-full right-0">
                 {/* <input
              id="geoJsonInput"
              type="file"
              accept=".json"
              onChange={importGeoJson}
              style={{ display: "none" }}
            />
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300"
              onClick={() => document.getElementById("geoJsonInput")?.click()}
            >
              Import
            </a> */}
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300"
              onClick={Logout}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
            /* <div className={`fixed top-0 left-0 right-0 h-[80px] w-full bg-blue-400 p-4 transition-transform duration-300 transform ${showTable ? "translate-y-full" : "translate-y-0"
                } z-50 overflow-y-scroll`}>
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl font-semibold cursor-pointer" onClick={setTable}>BSV Map</h1>
                        <ul className="flex space-x-4">
                            <input
                                id="geoJsonInput"
                                type="file"
                                accept=".json"
                                onChange={importGeoJson}
                                style={{ display: "none" }}
                            />
                            <li className="text-white cursor-pointer"
                                onClick={() => document.getElementById("geoJsonInput")?.click()}
                            >
                                Import
                            </li>
                            <li className="text-white cursor-pointer">About</li>
                            <li className="text-white cursor-pointer">Services</li>
                            <li className="text-white cursor-pointer" onClick={Logout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div> */
    )
}

export default Topbar