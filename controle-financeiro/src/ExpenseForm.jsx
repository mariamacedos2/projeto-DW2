import { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [expense, setExpense] = useState({
    nome: '',
    categoria: 'Fixa',
    tipo: '',
    valor: '',
    data: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setExpense(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novaDespesa = { ...expense, id: Date.now() };
    onAdd(novaDespesa);
    setExpense({ nome: '', categoria: 'Fixa', tipo: '', valor: '', data: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={expense.nome} onChange={handleChange} required />
      <select name="categoria" value={expense.categoria} onChange={handleChange}>
        <option value="Fixa">Fixa</option>
        <option value="Variável">Variável</option>
      </select>
      <input name="tipo" placeholder="Tipo (ex: Internet, Alimentação...)" value={expense.tipo} onChange={handleChange} required />
      <input name="valor" type="number" placeholder="Valor" value={expense.valor} onChange={handleChange} required />
      <input name="data" type="date" value={expense.data} onChange={handleChange} required />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default ExpenseForm;
