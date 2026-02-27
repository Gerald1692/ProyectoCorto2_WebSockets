import React from 'react';

const ResultsChart = ({ options, counts, total }) => {
    const getColorClass = (index) => {
        const colors = ['#00d9ff', '#6366f1', '#8b5cf6', '#ec4899'];
        return colors[index % colors.length];
    };

    const sortedData = options.map((option, index) => ({
        option,
        count: counts[index] || 0,
        index
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="chart-container">
            {sortedData.map((item) => {
                const percentage = total > 0 ? (item.count / total) * 100 : 0;

                return (
                    <div key={item.index} className="chart-item">
                        <div className="chart-label-row">
                            <span className="chart-label">{item.option}</span>
                            <span className="chart-value">{item.count} votos ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="chart-bar-bg">
                            <div
                                className="chart-bar-fill"
                                style={{ width: `${percentage}%`, background: `linear-gradient(90deg, ${getColorClass(item.index)}, ${getColorClass((item.index + 1) % 4)})` }}
                            />
                        </div>
                    </div>
                );
            })}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0' }}>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '1.1rem' }}>{total}</span> votos totales
                </p>
            </div>
        </div>
    );
};

export default ResultsChart;
