import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Chart({ expenses }) {
  const categorias = {};

  expenses.forEach(exp => {
    categorias[exp.tipo] = (categorias[exp.tipo] || 0) + parseFloat(exp.valor);
  });

  const data = {
    labels: Object.keys(categorias),
    datasets: [{
      label: 'Gastos por tipo',
      data: Object.values(categorias),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };

  return (
    <div>
      <h2>Gráfico de Gastos</h2>
      <Bar data={data} />
    </div>
  );
}

export default Chart;
