import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiConstants } from "../configs/apiConstants";
import { RootState } from "./index";
import { Product } from "../Components/ProductTile/IProductDetail";

interface ProductState {
  products: Product[];
  filters: {
    category: string;
    priceRange: string;
    rating: string;
    sorting: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filters: {
    category: "",
    priceRange: "",
    rating: "",
    sorting: "",
  },
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConstants.fetchProductsApi}/products`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<string>) => {
      state.filters.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<string>) => {
      state.filters.rating = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.filters.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, ...action.payload]; // Append products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, setPriceRange, setRating, setSorting } =
  productSlice.actions;

export const selectProducts = (state: RootState) => {
  const { products, filters } = state.products;

  // Apply filters to the products
  let filteredProducts = [...products];

  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === filters.category
    );
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split(" - ").map(Number);
    filteredProducts = filteredProducts.filter((p) =>
      isNaN(max) ? p.price > min : p.price >= min && p.price <= max
    );
  }

  if (filters.rating) {
    const [min, max] = filters.rating.split(" - ").map(Number);
    filteredProducts = filteredProducts.filter((p) =>
      isNaN(max)
        ? p.rating.rate > min
        : p.rating.rate >= min && p.rating.rate <= max
    );
  }

  if (filters.sorting === "Price: Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sorting === "Price: High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filters.sorting === "Rating: Low to High") {
    filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
  } else if (filters.sorting === "Rating: High to Low") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return {
    products: filteredProducts,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default productSlice.reducer;
