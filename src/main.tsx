   import { createRoot } from 'react-dom/client';
   import App from './App.tsx';
   import './index.css';

   console.log('Main.tsx loaded successfully');

   document.addEventListener('DOMContentLoaded', () => {
     const rootElement = document.getElementById("root");
     if (rootElement) {
       console.log('Root element found, rendering App');
       try {
         createRoot(rootElement).render(<App />);
         console.log('App rendered successfully');
       } catch (error) {
         console.error('Error rendering App:', error);
       }
     } else {
       console.error("Root element not found");
       document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial, sans-serif;">Root element not found. Please check the HTML structure.</div>';
     }
   });