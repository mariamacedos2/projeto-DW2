import { useState, useEffect } from 'react';
import { salvarDespesas, carregarDespesas } from '../utilarios/localStorage';

function DespesaForm({ onSave, despesaEditando, limparEdicao }) {
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
    } else {
      setNome('');
      setValor('');
      setData('');
      setCategoria('');
      setTipo('fixa');
    }
  }, [despesaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !valor || !data || !categoria || !tipo) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaDespesa = {
      id: despesaEditando ? despesaEditando.id : Date.now(),
      nome,
      valor: parseFloat(valor),
      data,
      categoria,
      tipo,
    };

    const despesasAtuais = carregarDespesas();

    const despesasAtualizadas = despesaEditando
      ? despesasAtuais.map((d) => (d.id === novaDespesa.id ? novaDespesa : d))
      : [...despesasAtuais, novaDespesa];

    salvarDespesas(despesasAtualizadas);
    onSave(despesasAtualizadas);
    limparEdicao(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{despesaEditando ? 'Editar Despesa' : 'Nova Despesa'}</h2>

      <input
        type="text"
        placeholder="Nome da despesa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="fixa">Fixa</option>
        <option value="variavel">Variável</option>
      </select>

      <button type="submit">
        {despesaEditando ? 'Salvar Alterações' : 'Salvar'}
      </button>

    </form>
  );
}

export default DespesaForm;