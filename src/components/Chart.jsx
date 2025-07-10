import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

function Chart({ despesas }) {
  // Agrupar por categoria (case-insensitive)
  const despesasPorCategoria = despesas.reduce((total, despesa) => {
    const categoria = despesa.categoria.trim().toLowerCase();
    if (!total[categoria]) {
      total[categoria] = 0;
    }
    total[categoria] += parseFloat(despesa.valor);
    return total;
  }, {});

  const labels = Object.keys(despesasPorCategoria).map((cat) =>
    cat.charAt(0).toUpperCase() + cat.slice(1)
  );
  const valores = Object.values(despesasPorCategoria);

  const data = {
    labels,
    datasets: [
      {
        label: 'Despesas por Categoria',
        data: valores,
        backgroundColor: [
          '#3498db', '#e74c3c', '#f1c40f',
          '#2ecc71', '#9b59b6', '#34495e',
          '#fd79a8', '#00cec9'
        ],
        borderColor: '#fff',
        borderWidth: 2,
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