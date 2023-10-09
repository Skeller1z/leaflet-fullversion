import React, { Suspense } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import Map from './Map/Map';
import MapComponents from './Components/MapComponents'
import Router from "./routes/routes";
function App() {
  return (
    <>
    <Suspense>
    <Router />
    </Suspense>

    </>
  );
}

export default App;
