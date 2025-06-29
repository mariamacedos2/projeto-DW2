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
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

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

  const alternarGrafico = () => {
    setMostrarGrafico(true);
  };

  const fecharGrafico = () => {
    setMostrarGrafico(false);
  };

  return (
    <div className="home-page">
      <div className="cabecalho">
        <h1>Controle Financeiro</h1>

        <button className="nova-despesa-btn" onClick={abrirFormulario}>
          + Nova Despesa
        </button>

        <button className="grafico-btn" onClick={alternarGrafico}>
          Mostrar Gráfico
        </button>
      </div>

      {mostrarFormulario && (
        <div className="modal-fundo">
          <div className="modal-conteudo">
            <DespesaForm
              onSave={setDespesas}
              despesaEditando={despesaEditando}
              limparEdicao={fecharFormulario}
            />
          </div>
        </div>
      )}

      {mostrarGrafico && (
        <div className="modal-fundo">
          <div className="modal-conteudo">
            <button className="fechar-modal" onClick={fecharGrafico}>×</button>
            <Chart despesas={despesas} />
          </div>
        </div>
      )}

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
      </div>
    </div>
  );
}

export default HomePage;