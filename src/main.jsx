import {createRoot} from 'react-dom/client'
import App from "./App.jsx";
import {Suspense} from "react";

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App/>
  </Suspense>
)