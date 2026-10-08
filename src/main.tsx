   import { createRoot, hydrateRoot } from 'react-dom/client';
   import App from './App.tsx';
   import './index.css';

   console.log('Main.tsx loaded successfully');

   document.addEventListener('DOMContentLoaded', () => {
     const rootElement = document.getElementById("root");
     if (rootElement) {
       console.log('Root element found, rendering App');
       try {
         // Prerendered routes ship full HTML in #root: hydrate it in place so the
         // content stays painted. createRoot would wipe it, show the Suspense
         // fallback until the route chunk loads, then re-render (slow LCP/INP).
         if (rootElement.hasChildNodes()) {
           hydrateRoot(rootElement, <App />, {
             onRecoverableError: (error) => console.warn('Hydration fallback:', error),
           });
         } else {
           createRoot(rootElement).render(<App />);
         }
         console.log('App rendered successfully');
       } catch (error) {
         console.error('Error rendering App:', error);
       }
     } else {
       console.error("Root element not found");
       document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial, sans-serif;">Root element not found. Please check the HTML structure.</div>';
     }
   });