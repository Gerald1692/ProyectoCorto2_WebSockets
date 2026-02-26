import React from 'react';

const ResultsChart = ({ options, counts, total }) => {
    return (
        <div className="chart-container">
            {options.map((option, index) => {
                const count = counts[index] || 0;
                const percentage = total > 0 ? (count / total) * 100 : 0;

                return (
                    <div key={index} style={{ marginBottom: '0.5rem' }}>
                        <div className="chart-bar-bg">
                            <div
                                className="chart-bar-fill"
                                style={{ width: `${percentage}%` }}
                            ></div>
                            <span className="chart-label">{option}</span>
                            <span className="chart-value">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                    </div>
                );
            })}
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Votos Totales: {total}
            </div>
        </div>
    );
};

export default ResultsChart;
