import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <div className="h-100 w-100">
        <Routes>
          {/* Landing Page */}
          <Route path="" element={<Home />} /> {/* Remove leading "/" */}
          {/* Product Details */}
          <Route path="product/:id" element={<ProductDetails />} />{" "}
          {/* Remove leading "/" */}
        </Routes>
      </div>
    </>
  );
}

export default App;
