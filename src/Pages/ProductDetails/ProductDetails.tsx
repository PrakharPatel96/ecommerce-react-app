import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/productSlice";
import { Box, Button } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useSelector(selectProducts);
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id || "", 10));
  console.log(product);
  if (!product) {
    return <h1>Oh Oh :( Product not found!</h1>;
  }
  return (
    <div>
      <Box sx={{ m: 1, textAlign: "left" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          className="hover:underline mb-4"
        >
          &larr; Back to Products
        </Button>
      </Box>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center max-w-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-40 h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
            style={{ height: "400px", width: "400px" }}
          />
          <h3 className="text-xl font-semibold mb-2 text-center">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            <b>Category:</b> {product.category}
          </p>
          <p className="text-lg font-bold text-green-600">
            <b>Description:</b> {product.description}
          </p>
          <p className="text-lg font-bold text-green-600">
            <b>Price:</b> ${product.price}
          </p>
          <p className="text-md font-medium text-yellow-500 mt-2">
            <b>Rating:</b> {product.rating.rate}
          </p>
          <p className="text-md font-medium text-yellow-500 mt-2">
            <b>Available Units:</b> {product.rating.count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
