import { carregarDespesas, salvarDespesas } from '../utilarios/localStorage';

function ExpenseItem({ despesa, index, atualizarLista }) {
  const handleDelete = () => {
    const lista = carregarDespesas();
    lista.splice(index, 1); // remove a despesa pelo índice
    salvarDespesas(lista);
    atualizarLista(lista); // atualiza a lista exibida
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <p><strong>Nome:</strong> {despesa.nome}</p>
      <p><strong>Valor:</strong> R$ {despesa.valor.toFixed(2)}</p>
      <p><strong>Data:</strong> {despesa.data}</p>
      <p><strong>Categoria:</strong> {despesa.categoria}</p>
      <p><strong>Tipo:</strong> {despesa.tipo}</p>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
}

export default ExpenseItem;