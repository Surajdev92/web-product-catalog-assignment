import { useState } from "react";
import CategoryList from "../components/CategoryList/CategoryList";
import ProductList from "../components/ProductList/ProductList";
import PriceRangeSlider from "../components/Filter/PriceRangeSlider";
import SortControls from "../components/Filter/SortControls";
import useProducts from "../hooks/useProducts";
import { ALL_CATEGORIES, TABS, type TabType } from "../constants";

const Home = () => {
  const {
    products,
    filteredProducts,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    priceRange,
    selectedCategory,
    sortBy,
    isLoading,
    isFiltering,
    clearPriceFilter,
    initialPriceRange,
  } = useProducts();

  const [activeTab, setActiveTab] = useState<TabType>(TABS.SORT);
  const isAllCategoriesSelected = selectedCategory === ALL_CATEGORIES;

  // Check if price filter is active (only check price range, not category or sort)
  const hasActivePriceFilter =
    priceRange[0] !== initialPriceRange[0] ||
    priceRange[1] !== initialPriceRange[1];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Sidebar - CategoryList */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-gray-200 p-4 rounded-lg sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto">
              <CategoryList
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Top Tabs - Sort and Filter */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setActiveTab(TABS.SORT)}
                  className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                    activeTab === TABS.SORT
                      ? "bg-pink-300 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  Sort
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab(TABS.FILTER)}
                    className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                      activeTab === TABS.FILTER
                        ? "bg-pink-300 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    Filter
                  </button>
                  {hasActivePriceFilter && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        clearPriceFilter();
                      }}
                      className="ml-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                      title="Clear price filter"
                      aria-label="Clear price filter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-gray-200 p-6 rounded-lg">
                {activeTab === TABS.SORT && (
                  <SortControls
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    isAllCategoriesSelected={isAllCategoriesSelected}
                  />
                )}
                {activeTab === TABS.FILTER && (
                  <PriceRangeSlider
                    products={products}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                  />
                )}
              </div>
            </div>

            {/* Product List */}
            <ProductList
              products={filteredProducts}
              showDiscount={isAllCategoriesSelected}
              isLoading={isLoading}
              isFiltering={isFiltering}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
