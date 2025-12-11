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
  } = useProducts();

  const [activeTab, setActiveTab] = useState<TabType>(TABS.SORTING);
  const isAllCategoriesSelected = selectedCategory === ALL_CATEGORIES;

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
            {/* Top Tabs - Sorting and Filtering */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab(TABS.SORTING)}
                  className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                    activeTab === TABS.SORTING
                      ? "bg-pink-300 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  Sorting
                </button>
                <button
                  onClick={() => setActiveTab(TABS.FILTERING)}
                  className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                    activeTab === TABS.FILTERING
                      ? "bg-pink-300 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  Filtering
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-gray-200 p-6 rounded-lg">
                {activeTab === TABS.SORTING && (
                  <SortControls
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    isAllCategoriesSelected={isAllCategoriesSelected}
                  />
                )}
                {activeTab === TABS.FILTERING && (
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
