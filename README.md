# E-Commerce Application

## Overview

This application is a React-based e-commerce platform with a focus on modularity, scalability, and user-friendly design. It includes features like product listing, filtering, sorting, infinite scrolling, and product details navigation.

---

## Features

1. **Landing Page**

   - Displays a grid of product tiles fetched from a mock API (`https://fakestoreapi.com/products`).
   - Infinite scrolling to load more products as the user scrolls down.
   - Filters for category, price range, and rating.
   - Sorting options for price and rating.
   - Reset functionality to clear all filters.

2. **Product Details Page**
   - Displays detailed information about a selected product.
   - Navigates using dynamic routes (e.g., `/product/:id`).

---

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For navigation and dynamic routing.
- **Material-UI**: For styling and UI components.

---

## Folder Structure

```
src/
├── components/
│   ├── Filters/Filters.tsx
│   ├── ProductTile/ProductTile.tsx
├── pages/
│   ├── Home/Home.tsx
│   ├── ProductDetails/ProductDetails.tsx
├── store/
│   ├── index.ts
│   ├── productSlice.ts
├── config/
│   ├── apiConstant.ts
├── App.tsx
```

### Key Components

#### 1. **Filters**

- Handles filtering for category, price range, and rating.
- Utilizes Material-UI for dropdown menus and reset button.
- Manages state for selected filter options and updates the Redux store.

#### 2. **ProductTile**

- Displays a single product with image, title, and price.
- On click, navigates to the product details page.

#### 3. **Home**

- Fetches and displays products from the API.
- Implements infinite scrolling with debouncing to prevent excessive API calls.
- Integrates filters and sorting options.

#### 4. **ProductDetails**

- Displays detailed information about a selected product based on the `id` from the route.
- Fetches product data from the Redux store.

#### 5. **Redux Store**

- **productSlice.ts**: Handles state for products, including fetching and applying filters.

---

## API Integration

- **Base URL**: `https://fakestoreapi.com/products`
- **Endpoints**:
  - `/products`: Fetch all products.

---

## Key Design Decisions

1. **State Management**

   - Used Redux to manage global state for products and filters.
   - Ensures a single source of truth and facilitates scalability.

2. **Dynamic Routing**

   - Utilized `react-router-dom` for navigation.
   - Dynamic routes (`/product/:id`) provide easy access to product details.

3. **Infinite Scrolling**

   - Implemented with a debouncing mechanism to optimize API requests.

4. **UI Components**
   - Material-UI was chosen for its pre-built components and ease of customization.

---

## How to Run

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Future Enhancements

1. Image Optimizations and Lazy Loading

When alloted more time, would add image optimizations and more lazy loading.

2. Authentication

Add user login and registration features.

3. Cart Functionality

Implement shopping cart with add/remove item functionality.

4. Backend Integration

Replace the mock API with a real backend service.

5. Testing

Add unit and integration tests for critical components.

---
