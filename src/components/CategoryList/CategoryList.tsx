import useCategories from "../../hooks/useCategories";
import { LABELS } from "../../constants";
import Spinner from "../Spinner/Spinner";

interface ICategoryListProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryList = ({
  selectedCategory,
  onCategorySelect,
}: ICategoryListProps) => {
  const { categories, isLoading } = useCategories();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-black">
        {LABELS.ALL_CATEGORIES_HEADING}
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spinner size="md" />
        </div>
      ) : (
        <ul className="list-none p-0 space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded transition-colors capitalize ${
                  selectedCategory === category
                    ? "bg-pink-200 text-black font-bold"
                    : "bg-transparent text-black hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
