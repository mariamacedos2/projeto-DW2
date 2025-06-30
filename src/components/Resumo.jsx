import { useMemo } from 'react';

function Resumo({ despesas }) {
  const resumo = useMemo(() => {
    if (despesas.length === 0) return null;

    const total = despesas.reduce((acc, item) => acc + Number(item.valor), 0);

    const maior = despesas.reduce((max, item) => {
      return Number(item.valor) > Number(max.valor) ? item : max;
    }, despesas[0]);

    // Calcular média diária (considera mês atual)
    const diasUnicos = new Set(
      despesas.map((d) => new Date(d.data).getDate())
    );
    const media = total / diasUnicos.size;

    return {
      total,
      media: isNaN(media) ? 0 : media,
      maior,
    };
  }, [despesas]);

  if (!resumo) return <p>Nenhuma despesa registrada.</p>;

  return (
    <div className="resumo-box">
      <p><strong>💰 Total do mês:</strong> R$ {resumo.total.toFixed(2)}</p>
      <p><strong>📆 Média diária:</strong> R$ {resumo.media.toFixed(2)}</p>
      <p>
        <strong>🔥 Maior gasto:</strong> R$ {Number(resumo.maior.valor).toFixed(2)} ({resumo.maior.categoria})
      </p>
    </div>
  );
}

export default Resumo;