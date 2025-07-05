import { useMemo, useState } from 'react';

// Função para deixar a primeira letra maiúscula
function capitalizar(texto) {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export default function Resumo({ despesas }) {
  const hoje = new Date();
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());
  const [mesSelecionado, setMesSelecionado] = useState(
    String(hoje.getMonth() + 1).padStart(2, '0')
  );

  const anoMes = `${anoSelecionado}-${mesSelecionado}`;

  const despesasFiltradas = useMemo(() => {
    return despesas.filter((d) => {
      const [ano, mes] = d.data.split('-');
      return `${ano}-${mes}` === anoMes;
    });
  }, [despesas, anoMes]);

  const resumo = useMemo(() => {
    if (despesasFiltradas.length === 0) return null;

    const total = despesasFiltradas.reduce((acc, item) => acc + Number(item.valor), 0);

    const maior = despesasFiltradas.reduce((max, item) => {
      return Number(item.valor) > Number(max.valor) ? item : max;
    }, despesasFiltradas[0]);

    const diasUnicos = new Set(
      despesasFiltradas.map((d) => new Date(d.data).getDate())
    );
    const media = total / diasUnicos.size;

    return {
      total,
      media: isNaN(media) ? 0 : media,
      maior,
    };
  }, [despesasFiltradas]);

  return (
    <div className="resumo-box">
      <div
        className="toggle-filtro"
        onClick={() => setMostrarFiltro(!mostrarFiltro)}
      >
        📅 Escolha o mês {mostrarFiltro ? '▲' : '▼'}
      </div>

      {mostrarFiltro && (
        <div className="filtro-mes-separado">
          <input
            type="number"
            className="input-mes-custom"
            value={mesSelecionado}
            onChange={(e) => {
              const val = e.target.value.padStart(2, '0');
              if (val >= 1 && val <= 12) setMesSelecionado(val);
            }}
            placeholder="MM"
            min="1"
            max="12"
          />
          <span className="barra-separadora">/</span>
          <input
            type="number"
            className="input-ano-custom"
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
            placeholder="AAAA"
            min="2000"
            max="2100"
          />
        </div>
      )}

      {resumo ? (
        <div className="resumo-info">
          <p><strong>• Total do mês:</strong> R$ {resumo.total.toFixed(2)}</p>
          <p><strong>• Média diária:</strong> R$ {resumo.media.toFixed(2)}</p>
          <p>
            <strong>• Maior gasto:</strong> R$ {Number(resumo.maior.valor).toFixed(2)} (
            {capitalizar(resumo.maior.categoria)})
          </p>
        </div>
      ) : (
        <p>Nenhuma despesa registrada para este mês.</p>
      )}
    </div>
  );
}
