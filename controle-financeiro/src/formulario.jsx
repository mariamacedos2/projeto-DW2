import { useState } from 'react';

function FormularioDespesa({ aoSalvar }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('fixa');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !categoria || !valor || !data) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    const novaDespesa = {
      id: Date.now(),
      nome,
      categoria,
      tipo,
      valor: parseFloat(valor),
      data,
    };
    aoSalvar(novaDespesa);
    // Limpa o formulário
    setNome('');
    setCategoria('');
    setTipo('fixa');
    setValor('');
    setData('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Despesa</h2>
      <input
        type="text"
        placeholder="Nome da despesa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="fixa">Fixa</option>
        <option value="variável">Variável</option>
      </select>
      <input
        type="number"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit">Salvar Despesa</button>
    </form>
  );
}

export default FormularioDespesa;
