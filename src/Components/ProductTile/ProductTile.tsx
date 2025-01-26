import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./IProductDetail";

interface ProductProps {
  product: Product;
}

const ProductTile: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleClickTile = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div
        className="product-tile border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
        onClick={() => handleClickTile(product.id)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-1">
          Category: {product.category}
        </p>
        <p className="text-green-600 font-bold text-md">
          Price: ${product.price}
        </p>
        <p className="text-green-600 font-bold text-md">
          Rating: {product.rating.rate}
        </p>
      </div>
    </>
  );
};

export default ProductTile;
