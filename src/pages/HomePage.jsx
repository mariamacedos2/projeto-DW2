import DespesaForm from '../components/DespesaForm'
import DespesaList from '../components/DespesaList';

function HomePage() {
  return (
    <div>
      <h1>Controle Financeiro</h1>
      <DespesaForm />
      <DespesaList />
    </div>
  );
}

export default HomePage;