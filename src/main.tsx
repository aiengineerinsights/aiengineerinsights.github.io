
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Main.tsx loaded successfully');

const rootElement = document.getElementById("root");
if (rootElement) {
  console.log('Root element found, rendering App');
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Root element not found. Please check the HTML structure.</div>';
}
