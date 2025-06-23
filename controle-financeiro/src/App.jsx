
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState, useEffect } from 'react';
import Formulario from './formulario';

function App() {
  const [despesas, setDespesas] = useState([]);

  // Carrega despesas do localStorage ao iniciar
  useEffect(() => {
    const despesasSalvas = localStorage.getItem('despesas');
    if (despesasSalvas) {
      setDespesas(JSON.parse(despesasSalvas));
    }
  }, []);

  // Salva as despesas no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(despesas));
  }, [despesas]);

  // Função para adicionar uma nova despesa
  const adicionarDespesa = (despesa) => {
    setDespesas([...despesas, despesa]);
  };

  // Função para remover despesa (opcional)
  const removerDespesa = (id) => {
    const despesasFiltradas = despesas.filter((d) => d.id !== id);
    setDespesas(despesasFiltradas);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Controle Financeiro Pessoal</h1>

      <FormularioDespesa aoSalvar={adicionarDespesa} />

      <h2>Despesas cadastradas:</h2>
      <ul>
        {despesas.length === 0 && <li>Nenhuma despesa cadastrada</li>}
        {despesas.map((d) => (
          <li key={d.id}>
            {d.nome} | {d.categoria} | {d.tipo} | R$ {d.valor.toFixed(2)} | {d.data}
            <button onClick={() => removerDespesa(d.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
