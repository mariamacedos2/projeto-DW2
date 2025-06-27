import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { carregarDespesas } from '../utilarios/localStorage';

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const despesas = carregarDespesas();

  const totalFixa = despesas
    .filter((d) => d.tipo === 'fixa')
    .reduce((soma, d) => soma + Number(d.valor), 0);

  const totalVariavel = despesas
    .filter((d) => d.tipo === 'variavel')
    .reduce((soma, d) => soma + Number(d.valor), 0);

  const data = {
    labels: ['Fixa', 'Variável'],
    datasets: [
      {
        data: [totalFixa, totalVariavel],
        backgroundColor: ['#00a8ff', '#e84118'],
        borderColor: ['#dcdde1', '#dcdde1'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <h2>Gráfico de Despesas</h2>
      <Pie data={data} />
    </div>
  );
}

export default Chart;