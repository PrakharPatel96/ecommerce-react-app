import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setCategory,
  setPriceRange,
  setRating,
  setSorting,
  selectProducts,
} from "../../store/productSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const Filters = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector(selectProducts);

  const categories = ["", ...new Set(products.map((p) => p.category))];

  const priceRange = [
    { key: 0, value: "" }, // Blank option
    { key: 10, value: "Less than 50" },
    { key: 20, value: "50 - 100" },
    { key: 30, value: "100 - 150" },
    { key: 40, value: "150 - 200" },
    { key: 50, value: "Greater than 200" },
  ];

  const rating = [
    { key: 0, value: "" }, // Blank option
    { key: 1, value: "0 - 1" },
    { key: 2, value: "1 - 2" },
    { key: 3, value: "2 - 3" },
    { key: 4, value: "3 - 4" },
    { key: 5, value: "4 - 5" },
  ];

  const sorting = [
    { key: 0, value: "" }, // Blank option
    { key: 1, value: "Price: Low to High" },
    { key: 2, value: "Price: High to Low" },
    { key: 3, value: "Rating: Low to High" },
    { key: 4, value: "Rating: High to Low" },
  ];

  // Handle Reset Filters
  const handleResetFilters = () => {
    dispatch(setCategory(""));
    dispatch(setPriceRange(""));
    dispatch(setRating(""));
    dispatch(setSorting(""));
  };

  return (
    <Box>
      {/* Category Filter */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          onChange={(e) => dispatch(setCategory(e.target.value as string))}
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat === "" ? "Select a category" : cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Filter */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="price-select-label">Price</InputLabel>
        <Select
          labelId="price-select-label"
          onChange={(e) => dispatch(setPriceRange(e.target.value as string))}
        >
          {priceRange.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.value === "" ? "Select a Price Range" : item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Filter */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="rating-select-label">Rating</InputLabel>
        <Select
          labelId="rating-select-label"
          onChange={(e) => dispatch(setRating(e.target.value as string))}
        >
          {rating.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.value === "" ? "Select a Rating Range" : item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sorting */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sorting-select-label">Sorting</InputLabel>
        <Select
          labelId="sorting-select-label"
          onChange={(e) => dispatch(setSorting(e.target.value as string))}
        >
          {sorting.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.value === "" ? "Select a Sorting Option" : item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Reset Filters Button */}
      <Box sx={{ m: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
