import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Router basename="/ecommerce-react-app">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
