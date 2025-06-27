import { useState, useEffect } from 'react';
import DespesaForm from '../components/DespesaForm';
import DespesaList from '../components/DespesaList';
import Chart from '../components/Chart';
import { carregarDespesas } from '../utilarios/localStorage';
import './HomePage.css';

function HomePage() {
  const [despesas, setDespesas] = useState([]);
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const dados = carregarDespesas();
    setDespesas(dados);
  }, []);

  const abrirFormulario = () => {
    setDespesaEditando(null);
    setMostrarFormulario(true);
  };

  const fecharFormulario = () => {
    setMostrarFormulario(false);
    setDespesaEditando(null);
  };

  return (
    <div className="home-page">
      {/* TOPO COM TÍTULO E BOTÃO */}
      <div className="topo">
        <h1>Controle Financeiro</h1>
        <button className="nova-despesa-btn" onClick={abrirFormulario}>
          + Nova Despesa
        </button>
      </div>

      {/* FORMULÁRIO DE ADIÇÃO/EDIÇÃO */}
      {mostrarFormulario && (
        <DespesaForm
          onSave={setDespesas}
          despesaEditando={despesaEditando}
          limparEdicao={fecharFormulario}
        />
      )}

      {/* CONTEÚDO PRINCIPAL: LISTA + GRÁFICO */}
      <div className="conteudo">
        <div className="lista">
          <DespesaList
            despesas={despesas}
            setDespesas={setDespesas}
            editarDespesa={(d) => {
              setDespesaEditando(d);
              setMostrarFormulario(true);
            }}
          />
        </div>

        <div className="grafico">
          <Chart despesas={despesas} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;