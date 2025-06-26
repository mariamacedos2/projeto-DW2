import { useState, useEffect } from 'react';
import { salvarDespesas, carregarDespesas } from '../utilarios/localStorage';

function ExpenseForm({ onSave, despesaEditando, limparEdicao }) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('fixa');

  useEffect(() => {
    if (despesaEditando) {
      setNome(despesaEditando.nome);
      setValor(despesaEditando.valor);
      setData(despesaEditando.data);
      setCategoria(despesaEditando.categoria);
      setTipo(despesaEditando.tipo);
    }
  }, [despesaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaDespesa = {
      id: despesaEditando ? despesaEditando.id : Date.now(), //cria um id unico com Date.now()
      nome,
      valor: parseFloat(valor),
      data,
      categoria,
      tipo,
    };

    const despesas = carregarDespesas();
    let novaLista;

    if (despesaEditando) {
      novaLista = despesas.map((d) => (d.id === despesaEditando.id ? novaDespesa : d));
    } else {
      novaLista = [...despesas, novaDespesa];
    }

    salvarDespesas(novaLista);
    onSave(novaLista);

    // limpar campos
    setNome('');
    setValor('');
    setData('');
    setCategoria('');
    setTipo('fixa');
    limparEdicao();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{despesaEditando ? 'Editar Despesa' : 'Adicionar Despesa'}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="fixa">Fixa</option>
        <option value="variavel">Variável</option>
      </select>
      <button type="submit">{despesaEditando ? 'Salvar Edição' : 'Salvar'}</button>
    </form>
  );
}

export default ExpenseForm;