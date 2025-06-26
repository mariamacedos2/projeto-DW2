import { useEffect, useState } from 'react';
import { carregarDespesas } from '../utilarios/localStorage';
import DespesaItem from './DespesaItem';

function ExpenseList() {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const dados = carregarDespesas();
    setDespesas(dados);
  }, []);

  if (despesas.length === 0) {
    return <p>Não há despesas cadastradas.</p>;
  }

  return (
    <div>
      <h2>Lista de Despesas</h2>
      {despesas.map((despesa, index) => (
        <DespesaItem key={index} despesa={despesa} index={index} atualizarLista={setDespesas} />
      ))}
    </div>
  );
}

export default ExpenseList;