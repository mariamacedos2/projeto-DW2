function ExpenseList({ expenses, onDelete }) {
    return (
      <div>
        <h2>Despesas</h2>
        <ul>
          {expenses.map(exp => (
            <li key={exp.id}>
              {exp.nome} - R${exp.valor} - {exp.tipo} - {exp.data}
              <button onClick={() => onDelete(exp.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ExpenseList;
  