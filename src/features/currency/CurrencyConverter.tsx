import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { Currency as Currencies, ArrowRight, RotateCcw } from 'lucide-react';
import { Currency } from '../../types';

const CurrencyConverter: React.FC = () => {
  const { currencies } = useAppContext();
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  
  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency]); // Auto-convert when currencies change
  
  const handleConvert = () => {
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum)) {
      setConvertedAmount(null);
      return;
    }
    
    const fromCurrencyObj = currencies.find(c => c.code === fromCurrency);
    const toCurrencyObj = currencies.find(c => c.code === toCurrency);
    
    if (!fromCurrencyObj || !toCurrencyObj) {
      setConvertedAmount(null);
      return;
    }
    
    // Convert to USD, then to target currency
    const amountInUSD = amountNum / fromCurrencyObj.rate;
    const amountInTargetCurrency = amountInUSD * toCurrencyObj.rate;
    
    setConvertedAmount(amountInTargetCurrency);
  };
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-teal-50">
          <div className="flex items-center">
            <Currencies className="text-teal-600 mr-2" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Currency Converter</h2>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="max-w-lg mx-auto">
            <div className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onBlur={handleConvert}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">{fromCurrency}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                    onClick={handleSwapCurrencies}
                  >
                    <RotateCcw size={18} className="text-teal-600" />
                  </button>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                  <div className="relative bg-white border border-gray-300 rounded-md px-3 py-2 pr-10">
                    <span className="text-gray-800">
                      {convertedAmount !== null ? convertedAmount.toFixed(2) : '—'}
                    </span>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">{toCurrency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Currency</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Currency</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleConvert}
              >
                Convert
              </Button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Exchange rates are for demonstration purposes only and may not reflect current rates.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyConverter;