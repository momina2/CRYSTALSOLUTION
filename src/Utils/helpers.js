
// Helper function for formatting numbers with commas
export const formatNumberWithCommas = (number) => {
  if (number === null || number === undefined || number === "") return "";
  const num = parseFloat(number);
  if (isNaN(num)) return number;
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Date/Time helpers for export
export const getCurrentDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
};

export const getCurrentTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};

//  Modified Tailwind CDN Loader
export const loadTailwind = () => {
  if (typeof document === "undefined") return;
  
  // 1. Inject Custom Scrollbar Style (No change)
  if (!document.getElementById("custom-scrollbar-style")) {
    const style = document.createElement("style");
    style.id = "custom-scrollbar-style";
    style.innerHTML = `
      /* Custom thin scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #9ca3af;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Configure Tailwind 
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          'custom': ['Inter', 'Arial', 'sans-serif'], 
        }
      }
    }
  };


  // 3. Load Tailwind CDN Script
  if (document.getElementById("tailwind-cdn")) return;
  const tailwindScript = document.createElement("script");
  tailwindScript.id = "tailwind-cdn";
  tailwindScript.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(tailwindScript);
  
};

// API Field Getter 
export const getField = (obj, ...keys) => {
  if (!obj || typeof obj !== "object") return undefined;
  for (const key of keys) {
    if (key in obj && obj[key] !== null && obj[key] !== undefined) {
      return obj[key];
    }
    const foundKey = Object.keys(obj).find(
      (k) => k.toLowerCase() === String(key).toLowerCase()
    );
    if (foundKey && obj[foundKey] !== null && obj[foundKey] !== undefined) {
      return obj[foundKey];
    }
  }
  return undefined;
};
