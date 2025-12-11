import {
  SORT_TYPES,
  SORT_LABELS,
  LABELS,
  MESSAGES,
  type SortType,
} from "../../constants";

interface ISortControlsProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  isAllCategoriesSelected: boolean;
}

const SortControls = ({
  sortBy,
  onSortChange,
  isAllCategoriesSelected,
}: ISortControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black">{LABELS.SORT_BY}</label>
      <select
        value={sortBy}
        onChange={(changeEvent) =>
          onSortChange(changeEvent.target.value as SortType)
        }
        className="px-3 py-2 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={SORT_TYPES.PRICE_ASC}>{SORT_LABELS.PRICE_ASC}</option>
        <option value={SORT_TYPES.PRICE_DESC}>{SORT_LABELS.PRICE_DESC}</option>
        <option
          value={SORT_TYPES.DISCOUNT}
          disabled={!isAllCategoriesSelected}
          title={
            !isAllCategoriesSelected ? MESSAGES.DISCOUNT_SORT_UNAVAILABLE : ""
          }
        >
          {SORT_LABELS.DISCOUNT}
        </option>
      </select>
      {!isAllCategoriesSelected && sortBy === SORT_TYPES.DISCOUNT && (
        <p className="text-xs text-gray-600">
          {MESSAGES.DISCOUNT_SORT_REQUIRES_ALL_CATEGORIES}
        </p>
      )}
    </div>
  );
};

export default SortControls;
