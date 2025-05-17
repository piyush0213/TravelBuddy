import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { Wallet, Plus, DollarSign, PieChart, BarChart } from 'lucide-react';
import { BudgetItem } from '../../types';

const BudgetTracker: React.FC = () => {
  const { budgetItems, setBudgetItems } = useAppContext();
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Transportation');
  
  const categories = useMemo(() => 
    Array.from(new Set(budgetItems.map(item => item.category))),
    [budgetItems]
  );
  
  const totalBudget = useMemo(() => 
    budgetItems.reduce((sum, item) => sum + item.amount, 0),
    [budgetItems]
  );
  
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    
    budgetItems.forEach(item => {
      if (!totals[item.category]) {
        totals[item.category] = 0;
      }
      totals[item.category] += item.amount;
    });
    
    return Object.entries(totals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [budgetItems]);
  
  const handleAddItem = () => {
    if (!newDescription || !newAmount) return;
    
    const amount = parseFloat(newAmount);
    if (isNaN(amount)) return;
    
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      description: newDescription,
      amount,
      category: newCategory,
      date: new Date().toISOString().split('T')[0]
    };
    
    setBudgetItems([...budgetItems, newItem]);
    setNewDescription('');
    setNewAmount('');
  };
  
  const handleDeleteItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };
  
  // Generate colors for categories
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'Transportation': 'bg-blue-500',
      'Accommodation': 'bg-purple-500',
      'Food': 'bg-green-500',
      'Activities': 'bg-yellow-500',
      'Shopping': 'bg-red-500'
    };
    
    return colorMap[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="bg-teal-50">
            <div className="flex items-center">
              <Wallet className="text-teal-600 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Budget Summary</h2>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="text-center p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Budget</h3>
              <div className="text-3xl font-bold text-teal-700">
                ${totalBudget.toLocaleString()}
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              <h3 className="text-sm font-medium text-gray-700">Spending by Category</h3>
              
              {categoryTotals.map(({ category, amount }) => {
                const percentage = Math.round((amount / totalBudget) * 100);
                
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{category}</span>
                      <span className="text-gray-800 font-medium">${amount.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`${getCategoryColor(category)} h-2 rounded-full`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="bg-teal-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="text-teal-600 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Expense Details</h2>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {budgetItems.length > 0 ? (
                budgetItems.map(item => (
                  <div 
                    key={item.id}
                    className="p-3 border border-gray-200 rounded-md flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{item.description}</div>
                      <div className="flex items-center mt-1">
                        <span className={`w-2 h-2 rounded-full ${getCategoryColor(item.category)} mr-1`}></span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-800 font-medium mr-3">
                        ${item.amount.toLocaleString()}
                      </span>
                      <button 
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Wallet size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-md">
                  <DollarSign size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No expenses added yet</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Add New Expense</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                
                <input
                  type="number"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <Button
                  variant="primary"
                  icon={<Plus size={16} />}
                  onClick={handleAddItem}
                >
                  Add Expense
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTracker;