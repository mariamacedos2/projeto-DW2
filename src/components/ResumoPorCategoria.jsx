import { useState } from 'react';

//Deixa a primeira letra maiúscula
function formatarCategoria(texto) {
  const t = texto.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}  

function ResumoPorCategoria({ despesas }) {
  const categorias = {};

  // Agrupar despesas com base em categoria normalizada (minúscula)
  despesas.forEach((d) => {
    const cat = d.categoria.toLowerCase(); // 🔹 normaliza

    if (!categorias[cat]) {
      categorias[cat] = {
        nomeFormatado: formatarCategoria(cat), // salva a versão bonitinha
        total: 0,
        itens: [],
      };
    }

    categorias[cat].total += Number(d.valor);
    categorias[cat].itens.push(d);
  });

  const [aberta, setAberta] = useState(null);

  return (
    <div className="resumo-categorias">
      <h3>Resumo por Categoria</h3>
      {Object.entries(categorias).map(([chave, dados]) => (
        <div key={chave} className="categoria-box">
          <div
            className="categoria-header"
            onClick={() => setAberta(aberta === chave ? null : chave)}
          >
            <strong>{dados.nomeFormatado}</strong>: R$ {dados.total.toFixed(2)}
            <span className="toggle">{aberta === chave ? '▲' : '▼'}</span>
          </div>

          {aberta === chave && (
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