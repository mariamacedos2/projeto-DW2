import { useState, useEffect } from 'react';
import DespesaForm from '../components/DespesaForm';
import DespesaList from '../components/DespesaList';
import Chart from '../components/Chart';
import { carregarDespesas } from '../utilarios/localStorage';
import './HomePage.css';
import cofreImg from '../assets/cofre.jpeg';
import Resumo from '../components/Resumo';
import ResumoPorCategoria from '../components/ResumoPorCategoria';


function HomePage() {
  const [despesas, setDespesas] = useState([]);
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [mostrarModalDespesas, setMostrarModalDespesas] = useState(false);

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
        <img src={cofreImg} alt="cofre" className='imagem-cofre' />
        <h1>Controle Financeiro</h1>

        <ResumoPorCategoria despesas={despesas} />

        <Resumo despesas={despesas}/>

        <button className="nova-despesa-btn" onClick={abrirFormulario}>
          + Nova Despesa
        </button>

        <button className="grafico-btn" onClick={alternarGrafico}>
          Mostrar Gráfico
        </button>

        <button onClick={() => setMostrarModalDespesas(true)} className="btn-ver-despesas">
          Mostrar Despesas
        </button>
      </div>

      {mostrarFormulario && (
        <div className="modal-fundo">
          <button className="btn-fechar" onClick={fecharFormulario}>Sair</button>
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
          <button className="btn-fechar" onClick={fecharGrafico}>Sair</button>
          <div className="modal-conteudo">
            <Chart despesas={despesas} />
          </div>
        </div>
      )}

      {mostrarModalDespesas && (
          <div className="modal-fundo">
            <button onClick={() => setMostrarModalDespesas(false)}
                className="btn-fechar"> Sair </button>
            <div className="modal-despesas">

              <DespesaList
                despesas={despesas}
                setDespesas={setDespesas}
                editarDespesa={(d) => {
                  setDespesaEditando(d);
                  setMostrarFormulario(true);
                  setMostrarModalDespesas(false); // fecha modal ao editar
                }}
              />
              <button onClick={() => setMostrarModalDespesas(false)}
                className="btn-fechar"> Sair </button>
              
            </div>
          </div>
        )}
      </div>
  );
}

export default HomePage;