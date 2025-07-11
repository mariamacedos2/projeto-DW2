import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ despesas }) {

  //Agrupa despesas por categoria
  const despesasPorCategoria = despesas.reduce((total, despesa) => {
    const categoria = despesa.categoria.trim().toLowerCase();
    if (!total[categoria]) {
      total[categoria] = 0;
    }
    total[categoria] += parseFloat(despesa.valor);
    return total;
  }, {});

  //Cria os rótulos e valores para o gráfico
  const labels = Object.keys(despesasPorCategoria).map((cat) =>
    cat.charAt(0).toUpperCase() + cat.slice(1)
  );
  const valores = Object.values(despesasPorCategoria);

  //configurando o gráfico
  const data = {
    labels,
    datasets: [
      {
        label: 'Despesas por Categoria',
        data: valores,
        backgroundColor: [
          '#ff009d', '#6d0043', '#ffb9e1',
          '#cb7dc8', '#7cfffb', '#34495e',
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