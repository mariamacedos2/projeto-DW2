import { useState, useEffect } from 'react';
import DespesaForm from '../components/DespesaForm';
import DespesaList from '../components/DespesaList';
import Chart from '../components/Chart';
import { carregarDespesas } from '../utilarios/localStorage';
import cofreImg from '../assets/cofre.img.png';
import Resumo from '../components/Resumo';
import ResumoPorCategoria from '../components/ResumoPorCategoria';
import Cotacao from '../components/Cotacao';
import Sidebar from '../components/Sidebar';
import './HomePage.css';


function HomePage() {
  const [despesas, setDespesas] = useState([]);
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [mostrarModalDespesas, setMostrarModalDespesas] = useState(false);
  const [mostrarSidebar, setMostrarSidebar] = useState(true);

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

  const abrirGrafico = () => setMostrarGrafico(true);
  const fecharGrafico = () => setMostrarGrafico(false);

  const abrirDespesas = () => setMostrarModalDespesas(true);
  const fecharDespesas = () => setMostrarModalDespesas(false);

  const toggleSidebar = () => setMostrarSidebar(!mostrarSidebar);


  return (
   
    <div className="home-container">
      {/* Sidebar Condicional */}
      {mostrarSidebar && (
        <Sidebar
          onNova={abrirFormulario}
          onGrafico={abrirGrafico}
          onDespesas={abrirDespesas}
          onToggleSidebar={toggleSidebar}
        />
      )}

      {/* Botão para mostrar o menu, visível apenas quando oculto */}
      {!mostrarSidebar && (
        
        <button className="btn-ocultar" onClick={toggleSidebar}>
          ☰ Menu
        </button>
        
      )}
    
      <main className="conteudo-principal">
         <h1>Controle Financeiro</h1>
        <ResumoPorCategoria despesas={despesas} />
        <Resumo despesas={despesas} />
      </main>

      {mostrarFormulario && (
        <div className="modal-fundo">
          <div className="modal-conteudo">
            <DespesaForm
              onSave={setDespesas}
              despesaEditando={despesaEditando}
              limparEdicao={fecharFormulario}
            />
          </div>
          <button className="btn-fechar" onClick={fecharFormulario}>Sair</button>
        </div>
      )}

      {mostrarGrafico && (
        <div className="modal-fundo">
          <div className="modal-conteudo">
            <Chart despesas={despesas} />
          </div>
          <button className="btn-fechar" onClick={fecharGrafico}>Sair</button>
        </div>
      )}

      {mostrarModalDespesas && (
        <div className="modal-fundo">
          <div className="modal-despesas">
            <DespesaList
              despesas={despesas}
              setDespesas={setDespesas}
              editarDespesa={(d) => {
                setDespesaEditando(d);
                setMostrarFormulario(true);
                fecharDespesas();
              }}
            />
          </div>
          <button className="btn-fechar" onClick={fecharDespesas}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;