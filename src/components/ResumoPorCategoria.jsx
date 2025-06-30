import { useState } from 'react';

function ResumoPorCategoria({ despesas }) {
  const categorias = {};

  // Agrupar por categoria
  despesas.forEach((d) => {
    if (!categorias[d.categoria]) {
      categorias[d.categoria] = {
        total: 0,
        itens: [],
      };
    }
    categorias[d.categoria].total += Number(d.valor);
    categorias[d.categoria].itens.push(d);
  });

  const [aberta, setAberta] = useState(null); // controla qual está expandida

  return (
    <div className="resumo-categorias">
      <h3>Resumo por Categoria</h3>
      {Object.entries(categorias).map(([categoria, dados]) => (
        <div key={categoria} className="categoria-box">
          <div
            className="categoria-header"
            onClick={() => setAberta(aberta === categoria ? null : categoria)}
          >
            <strong>{categoria}</strong>: R$ {dados.total.toFixed(2)}
            <span className="toggle">{aberta === categoria ? '▲' : '▼'}</span>
          </div>

          {aberta === categoria && (
            <ul className="detalhes">
              {dados.itens.map((item, i) => (
                <li key={i}>
                  {item.nome} – R$ {Number(item.valor).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default ResumoPorCategoria;