import React, { useState } from 'react';
import ResultsChart from './ResultsChart';

const PlayerView = ({ roomId, name, state, onVote }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    const { question, counts, total } = state || {};

    const handleVote = () => {
        if (selectedOption !== null && !hasVoted) {
            onVote(selectedOption);
            setHasVoted(true);
        }
    };

    if (!question) {
        return (
            <div className="glass-panel" style={{ textAlign: 'center' }}>
                <h2 className="text-gradient">Esperando Encuesta...</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    El anfitrión aún no ha iniciado una encuesta. ¡Mantente a la espera!
                </p>
                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Sala: {roomId} | Usuario: {name}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600' }}>ENCUESTA ACTIVA</span>
                <h2 style={{ marginTop: '0.5rem' }}>{question.text}</h2>
            </div>

            {!hasVoted ? (
                <>
                    <div className="grid-options">
                        {question.options.map((option, index) => (
                            <div
                                key={index}
                                className={`card-option ${selectedOption === index ? 'selected' : ''}`}
                                onClick={() => setSelectedOption(index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleVote}
                        disabled={selectedOption === null}
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '2rem', opacity: selectedOption === null ? 0.5 : 1 }}
                    >
                        Enviar Voto
                    </button>
                </>
            ) : (
                <div>
                    <div className="error-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        ¡Gracias por votar! Aquí están los resultados en vivo:
                    </div>
                    <ResultsChart options={question.options} counts={counts} total={total} />
                </div>
            )}

            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Conectado como {name} | Sala: {roomId}
            </div>
        </div>
    );
};

export default PlayerView;
