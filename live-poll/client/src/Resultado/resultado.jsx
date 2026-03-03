import React from 'react';
import './resultado.css';
import ResultsChart from '../ResultsChart';

// Componente Resultado que renderiza el gráfico con los estilos externos
const Resultado = ({ options, counts, total }) => {
  return (
    <div className="chart-container">
      <ResultsChart options={options} counts={counts} total={total} />
    </div>
  );
};

export default Resultado;
