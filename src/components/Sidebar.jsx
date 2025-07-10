
import cofreImg from '../assets/cofre.img.png';
import Cotacao from './Cotacao';

function Sidebar({ onNova, onGrafico, onDespesas, onToggleSidebar }) {
  return (
    <div className="sidebar">
      {/* Botão Ocultar */}
      <button className="btn-ocultar" onClick={onToggleSidebar}>Ocultar ✕</button>

      <div className="logo">
        <img src={cofreImg} alt="Logo" className="sidebar-img" />
        <Cotacao/>
      </div>

      <nav className="menu">
        <button className='nova-despesa-btn' onClick={onNova}>+ Nova Despesa</button>
        <button className='grafico-btn' onClick={onGrafico}>Mostrar Gráfico</button>
        <button className='btn-ver-despesas' onClick={onDespesas}>Ver Despesas</button>
      </nav>
    </div>
  );
}

export default Sidebar;
