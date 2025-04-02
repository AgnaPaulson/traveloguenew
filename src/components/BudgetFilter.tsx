
import React, { useState } from "react";
import { DollarSign, Filter } from "lucide-react";

interface BudgetFilterProps {
  onFilterChange: (minBudget: number, maxBudget: number) => void;
}

const BudgetFilter: React.FC<BudgetFilterProps> = ({ onFilterChange }) => {
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinBudget(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxBudget(value);
  };

  const handleApply = () => {
    onFilterChange(minBudget, maxBudget);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="h-4 w-4 text-travel-primary" />
        <span>Budget Filter</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-lg p-4 z-10 border">
          <h3 className="font-medium text-travel-secondary mb-4">Budget Range</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm text-gray-600 mb-2">
                <DollarSign className="h-4 w-4 mr-1" />
                Minimum Budget
              </label>
              <input
                type="range"
                min="0"
                max="9000"
                step="100"
                value={minBudget}
                onChange={handleMinChange}
                className="w-full accent-travel-primary"
              />
              <div className="text-right text-sm font-medium">${minBudget.toLocaleString()}</div>
            </div>
            
            <div>
              <label className="flex items-center text-sm text-gray-600 mb-2">
                <DollarSign className="h-4 w-4 mr-1" />
                Maximum Budget
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={maxBudget}
                onChange={handleMaxChange}
                className="w-full accent-travel-primary"
              />
              <div className="text-right text-sm font-medium">${maxBudget.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 border rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1.5 bg-travel-primary text-white rounded text-sm"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetFilter;
