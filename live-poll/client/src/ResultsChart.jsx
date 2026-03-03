import React from 'react';

function ResultsChart({ options = [], counts = [], total = 0 }) {
  const safeTotal = Math.max(total || 0, counts.reduce((a, b) => a + (Number(b) || 0), 0));

  return (
    <div>
      {options.map((label, idx) => {
        const value = Number(counts[idx]) || 0;
        const pct = safeTotal > 0 ? Math.round((value / safeTotal) * 100) : 0;
        return (
          <div key={idx} className="chart-item">
            <div className="chart-label-row">
              <span className="chart-label">{label}</span>
              <span className="chart-value">{value} votos • {pct}%</span>
            </div>
            <div className="chart-bar-bg">
              <div
                className="chart-bar-fill"
                data-bar-index={(idx + 1).toString()}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="chart-total">
        <p className="chart-total-text">
          Total de votos: <span className="chart-total-number">{safeTotal}</span>
        </p>
      </div>
    </div>
  );
}

export default ResultsChart;
