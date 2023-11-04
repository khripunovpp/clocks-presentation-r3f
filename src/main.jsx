import {createRoot} from 'react-dom/client'
import App from "./App.jsx";
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import {Suspense} from "react";

studio.extend(extension);
studio.initialize();

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App/>
  </Suspense>
)