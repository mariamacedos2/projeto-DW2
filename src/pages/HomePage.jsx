import { useState, useEffect } from 'react';
import DespesaForm from '../components/DespesaForm';
import DespesaList from '../components/DespesaList';
import Chart from '../components/Chart';
import { carregarDespesas } from '../utilarios/localStorage';

function HomePage() {
  const [despesas, setDespesas] = useState([]);
  const [despesaEditando, setDespesaEditando] = useState(null);

  // Carrega as despesas ao iniciar a página
  useEffect(() => {
    const dados = carregarDespesas();
    setDespesas(dados);
  }, []);

  return (
    <div>
      <h1>Controle Financeiro</h1>

      <DespesaForm
        onSave={setDespesas}
        despesaEditando={despesaEditando}
        limparEdicao={() => setDespesaEditando(null)}
      />

      <DespesaList
        despesas={despesas}
        setDespesas={setDespesas}
        editarDespesa={setDespesaEditando}
      />

      <Chart />
    </div>
  );
}

export default HomePage;