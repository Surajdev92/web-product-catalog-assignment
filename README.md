# Product Catalog Assignment

A modern, responsive e-commerce product catalog application built with React, TypeScript, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.0
- **API**: FakeStoreAPI (https://fakestoreapi.com)

## 🚀 Core Features

- **Category Navigation**: Browse products by category with an intuitive sidebar navigation
- **Product Listing**: Display products in a responsive grid layout (3 columns on desktop, 1 column on mobile)
- **Price Range Filtering**: Filter products using a dual-handle price range slider
- **Product Sorting**: Sort products by:
  - Price: Low to High
  - Price: High to Low
  - Discount (only available when "All categories" is selected)
- **Discount System**:
  - 10% discount on jewellery products
  - 30% discount on men's clothing
  - Visual discount badges on discounted products
- **Discount Sorting**: Sort products by discount amount (highest discount first)

## 📁 Project Structure

```
src/
├── api/
│   └── fakeStoreApi.ts          # API service layer
├── components/
│   ├── CategoryList/
│   │   └── CategoryList.tsx    # Category navigation sidebar
│   ├── Filter/
│   │   ├── PriceRangeSlider.tsx # Price range filter component
│   │   └── SortControls.tsx     # Sorting dropdown component
│   └── ProductList/
│       ├── ProductCard.tsx     # Individual product card
│       └── ProductList.tsx      # Product grid container
├── constants/
│   └── index.ts                # Centralized constants and configuration
├── hooks/
│   ├── useCategories.ts        # Category data fetching hook
│   └── useProducts.ts          # Product state management hook
├── pages/
│   └── Home.tsx                # Main page component
├── types/
│   └── product.ts             # TypeScript type definitions
├── utils/
│   └── discount.ts            # Discount calculation utilities
├── App.tsx                     # Root component
└── main.tsx                    # Application entry point
```

## 🚦 Setup and Run

### Prerequisites

- Node.js (v20.19.0 or >=22.12.0 recommended)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-catalog-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```
