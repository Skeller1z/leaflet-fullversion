import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "../Login/Login";
import MapComponents from "../Components/MapComponents";
import Map from "../Map/Map";
import UserPreview from "../Components/UserPreview";
import Userview from "../Components/UserView/Userview";
import Tester from "../Components/Tester/Tester";
import ImageTest from "../Components/Tester/ImageTest";

export default function Router() {

  return useRoutes([
    {
      path: "/",
      element: <Login />,
      
    },
    {
      path: "MapComponents",
      element: <MapComponents/>,
    },
    {
      path: "Map",
      element: <Map/>,
    },
    {
      path: "UserPreview",
      element: <Userview/>,
    },
    {
      path: "Tester",
      element: <Tester/>,
    },
    {
      path: "ImageTest",
      element: <ImageTest/>,
    },
  ]);
}
