import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchProducts, selectProducts } from "../../store/productSlice";
import ProductTile from "../../Components/ProductTile/ProductTile";
import Filters from "../../Components/Filters/Filters";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProducts);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (isFetching || loading) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if (currentScroll > scrollableHeight - 100) {
      setIsFetching(true);
      setTimeout(() => {
        dispatch(fetchProducts());
        setIsFetching(false);
      }, 500); // Add debounce of 500ms
    }
  }, [dispatch, isFetching, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="d-flex flex-column align-items-center p-2">
      {loading && products.length === 0 && (
        <div className="loader-container">
          <CircularProgress />
        </div>
      )}
      {error && <p>{error}</p>}
      {!loading && <Filters />}
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product, index) => (
          <ProductTile key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
      {loading && products.length > 0 && (
        <div className="loader-container">
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
};

export default Home;
