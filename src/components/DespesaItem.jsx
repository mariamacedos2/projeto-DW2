import { carregarDespesas, salvarDespesas } from '../utilarios/localStorage';

function DespesaItem({ despesa, setDespesas, editarDespesa }) {
  const handleDelete = () => {
    const lista = carregarDespesas().filter((d) => d.id !== despesa.id);
    salvarDespesas(lista);
    setDespesas(lista);
  };

  return (
    <div className="expense-item">
      <p><strong>{despesa.nome}</strong></p>
      <p>R$ {despesa.valor.toFixed(2)}</p>
      <p>{despesa.data}</p>
      <p>Categoria: {despesa.categoria}</p>
      <p>Tipo: {despesa.tipo}</p>
      <button onClick={() => editarDespesa(despesa)}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
}

export default DespesaItem;