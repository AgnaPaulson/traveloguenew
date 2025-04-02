
import React, { useState } from "react";
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  UtilityPole, 
  Coffee, 
  Plane, 
  Bed, 
  Bus,
  Plus,
  Trash2
} from "lucide-react";

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const FinanceTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: "Transportation", amount: 85, date: "2023-06-15", description: "Flight to Barcelona" },
    { id: 2, category: "Accommodation", amount: 120, date: "2023-06-16", description: "Hotel - 1 night" },
    { id: 3, category: "Food", amount: 45, date: "2023-06-16", description: "Dinner at local restaurant" },
    { id: 4, category: "Transportation", amount: 15, date: "2023-06-17", description: "Bus fare" },
  ]);
  
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    category: "Food",
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });
  
  const totalBudget = 1000;
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  const handleAddExpense = () => {
    if (newExpense.amount <= 0 || !newExpense.description) return;
    
    const expense: Expense = {
      ...newExpense,
      id: Date.now(),
    };
    
    setExpenses([...expenses, expense]);
    setNewExpense({
      category: "Food",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: "",
    });
  };
  
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  const categoryIcons: Record<string, React.ReactNode> = {
    "Transportation": <Plane className="h-4 w-4" />,
    "Accommodation": <Bed className="h-4 w-4" />,
    "Food": <Coffee className="h-4 w-4" />,
    "Activities": <TrendingUp className="h-4 w-4" />,
    "Utilities": <UtilityPole className="h-4 w-4" />,
  };
  
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Transportation": "bg-blue-100 text-blue-600",
      "Accommodation": "bg-purple-100 text-purple-600",
      "Food": "bg-orange-100 text-orange-600",
      "Activities": "bg-green-100 text-green-600",
      "Utilities": "bg-gray-100 text-gray-600",
    };
    
    return colors[category] || "bg-gray-100 text-gray-600";
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b">
        <h2 className="text-xl font-semibold text-travel-secondary flex items-center">
          <DollarSign className="h-6 w-6 text-travel-primary mr-2" />
          Travel Finance Tracker
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 border-b">
        <div className="bg-gradient-to-br from-travel-light to-travel-primary/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Budget</h3>
          <div className="text-2xl font-bold text-travel-secondary">${totalBudget.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-travel-light to-travel-primary/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h3>
          <div className="text-2xl font-bold text-travel-secondary">${totalSpent.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-travel-light to-travel-primary/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Remaining</h3>
          <div className="text-2xl font-bold text-travel-secondary">${remaining.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Budget Usage</h3>
          <div className="text-sm text-gray-500">{percentSpent.toFixed(1)}% used</div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-travel-primary rounded-full"
            style={{ width: `${Math.min(percentSpent, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="font-medium mb-4">Recent Expenses</h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                  {categoryIcons[expense.category]}
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium text-travel-secondary">{expense.description}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span>{expense.date}</span>
                    <span className="mx-2">•</span>
                    <span>{expense.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-travel-secondary">${expense.amount}</div>
                  <button 
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {expenses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No expenses recorded yet
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Add New Expense</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Transportation">Transportation</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Food">Food</option>
                <option value="Activities">Activities</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                  className="pl-10 p-2 w-full border rounded-md"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                className="p-2 w-full border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className="p-2 w-full border rounded-md"
                placeholder="Brief description"
              />
            </div>
            
            <button
              onClick={handleAddExpense}
              className="w-full bg-travel-primary text-white py-2 rounded-md flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;
