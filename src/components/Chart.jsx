import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

/* Ativa os recursos importados dentro do Chart.js. Sem isso, o gráfico não renderizaria corretamente.*/
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ despesas }) {
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
        backgroundColor: ['#ff009d', '#ffcae5'],
        borderColor: ['#610030', '#610030'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grafico'>
      <h2>Gráfico de Despesas</h2>
      <Pie data={data} />
    </div>
  );
}

export default Chart;