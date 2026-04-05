import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import App from "./App";

export default function RootApp() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <SplashScreen onLoadingComplete={() => setShowApp(true)} />
      {showApp && <App />}
    </>
  );
}
