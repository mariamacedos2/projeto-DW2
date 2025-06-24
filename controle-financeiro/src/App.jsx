import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('despesas');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (novaDespesa) => {
    setExpenses([...expenses, novaDespesa]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div>
      <h1>Controle de Gastos</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
