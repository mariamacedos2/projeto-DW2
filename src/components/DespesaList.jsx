import DespesaItem from './DespesaItem';

function DespesaList({ despesas, setDespesas, editarDespesa }) {
  return (
    <div>
      <h2>Despesas Cadastradas</h2>
      {despesas.length === 0 ? (
        <p>Nenhuma despesa cadastrada.</p>
      ) : (
        despesas.map((despesa) => (
          <DespesaItem
            key={despesa.id}
            despesa={despesa}
            setDespesas={setDespesas}
            editarDespesa={editarDespesa}
          />
        ))
      )}
    </div>
  );
}

export default DespesaList;