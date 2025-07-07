import React, { useEffect, useState } from 'react';

const Cotacao = () => {
  const [dolar, setDolar] = useState(null);
  const [euro, setEuro] = useState(null);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL')
      .then(res => res.json())
      .then(data => {
        setDolar(data.USDBRL.bid);
        setEuro(data.EURBRL.bid);
      })
      .catch(err => console.error('Erro na cotação:', err));
  }, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h3>Cotação Atual</h3>
      {dolar && euro ? (
        <>
          <p>💵 Dólar: US$ {parseFloat(dolar).toFixed(2)}</p>
          <p>💶 Euro: € {parseFloat(euro).toFixed(2)}</p>
        </>
      ) : (
        <p>Carregando cotações...</p>
      )}
    </div>
  );
};

export default Cotacao;
