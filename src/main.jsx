import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";          // ✅ add
import { store } from "./store";                 // ✅ import your store
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>                     {/* ✅ wrap everything */}
      <App />
    </Provider>
  </StrictMode>
);
