import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add keyframes to the document for the animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
