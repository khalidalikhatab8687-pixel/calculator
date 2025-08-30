
import React, { useState, useCallback } from 'react';
import CalculatorButton from './components/CalculatorButton.tsx';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [isResult, setIsResult] = useState<boolean>(false);

  const handleNumberClick = useCallback((num: string) => {
    if (isResult) {
      setInput(num);
      setExpression('');
      setIsResult(false);
      return;
    }
    setInput(prev => (prev === '0' ? num : prev + num));
  }, [isResult]);

  const handleDecimalClick = useCallback(() => {
    if (isResult) {
      setInput('0.');
      setExpression('');
      setIsResult(false);
      return;
    }
    if (!input.includes('.')) {
      setInput(prev => prev + '.');
    }
  }, [input, isResult]);

  const handleOperatorClick = useCallback((op: string) => {
    if (input === 'Error') return;
    
    const lastCharOfExpr = expression.slice(-1).trim();
    const operators = ['+', '-', '*', '/'];

    if (input === '' && operators.includes(lastCharOfExpr)) {
        // Replace last operator
        setExpression(prev => prev.slice(0, -1) + op + ' ');
    } else {
        setExpression(prev => prev + input + ' ' + op + ' ');
    }
    setInput('');
    setIsResult(false);

  }, [input, expression]);

  const handleEqualsClick = useCallback(() => {
    if (input === 'Error' || expression === '') return;

    // Sanitize expression before evaluation
    const finalExpression = (expression + input).replace(/[^-()\d/*+.]/g, '');
    
    try {
      // Using Function constructor is slightly safer than direct eval
      const result = new Function('return ' + finalExpression)();
      
      if (!isFinite(result)) {
        setInput('Error');
      } else {
        setInput(String(result));
      }
      setExpression('');
      setIsResult(true);
    } catch (error) {
      setInput('Error');
      setExpression('');
      setIsResult(true);
    }
  }, [input, expression]);

  const handleClearClick = useCallback(() => {
    setInput('0');
    setIsResult(false);
  }, []);

  const handleAllClearClick = useCallback(() => {
    setInput('0');
    setExpression('');
    setIsResult(false);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-slate-900 to-black flex items-center justify-center font-mono p-4">
      <div className="w-full max-w-sm mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-500/10 border border-slate-700 overflow-hidden">
        {/* Screen */}
        <div className="p-6 text-right bg-black/20">
          <div className="h-8 text-slate-400 text-xl break-all truncate">
            {expression || <span className="opacity-0">.</span>}
          </div>
          <div className="text-white text-5xl font-bold break-all">
            {input || '0'}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2 p-4">
          <CalculatorButton label="AC" onClick={handleAllClearClick} className="bg-rose-500 hover:bg-rose-600 col-span-2" />
          <CalculatorButton label="C" onClick={handleClearClick} className="bg-rose-500 hover:bg-rose-600" />
          <CalculatorButton label="÷" onClick={() => handleOperatorClick('/')} className="bg-amber-500 hover:bg-amber-600" />

          <CalculatorButton label="7" onClick={() => handleNumberClick('7')} />
          <CalculatorButton label="8" onClick={() => handleNumberClick('8')} />
          <CalculatorButton label="9" onClick={() => handleNumberClick('9')} />
          <CalculatorButton label="×" onClick={() => handleOperatorClick('*')} className="bg-amber-500 hover:bg-amber-600" />

          <CalculatorButton label="4" onClick={() => handleNumberClick('4')} />
          <CalculatorButton label="5" onClick={() => handleNumberClick('5')} />
          <CalculatorButton label="6" onClick={() => handleNumberClick('6')} />
          <CalculatorButton label="-" onClick={() => handleOperatorClick('-')} className="bg-amber-500 hover:bg-amber-600" />
          
          <CalculatorButton label="1" onClick={() => handleNumberClick('1')} />
          <CalculatorButton label="2" onClick={() => handleNumberClick('2')} />
          <CalculatorButton label="3" onClick={() => handleNumberClick('3')} />
          <CalculatorButton label="+" onClick={() => handleOperatorClick('+')} className="bg-amber-500 hover:bg-amber-600" />

          <CalculatorButton label="0" onClick={() => handleNumberClick('0')} className="col-span-2" />
          <CalculatorButton label="." onClick={handleDecimalClick} />
          <CalculatorButton label="=" onClick={handleEqualsClick} className="bg-emerald-500 hover:bg-emerald-600" />
        </div>
      </div>
    </div>
  );
};

export default App;