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
            <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 className="text-gradient">⏳ Esperando Encuesta</h2>
                    <p style={{ color: 'var(--text-tertiary)', marginBottom: '0' }}>El anfitrión aún no ha iniciado una encuesta. ¡Mantente a la espera!</p>
                </div>
                <div style={{ background: 'rgba(0, 217, 255, 0.05)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(0, 217, 255, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
                        <div><span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>👤 Usuario</span><p style={{ margin: '0.4rem 0 0 0', color: 'var(--accent-color)', fontWeight: '700', fontSize: '1rem' }}>{name}</p></div>
                        <div><span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>🔐 Sala</span><p style={{ margin: '0.4rem 0 0 0', color: 'var(--accent-color)', fontWeight: '700', fontSize: '1rem' }}>{roomId}</p></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📊 ENCUESTA ACTIVA</span>
                <h2 style={{ marginTop: '0.75rem', marginBottom: '0' }}>{question.text}</h2>
            </div>

            {!hasVoted ? (
                <>
                    <p style={{ color: 'var(--text-tertiary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Selecciona una opción y envía tu voto</p>
                    <div className="grid-options">
                        {question.options.map((option, index) => (
                            <div key={index} className={`card-option ${selectedOption === index ? 'selected' : ''}`} onClick={() => setSelectedOption(index)}>
                                {option}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleVote} disabled={selectedOption === null} className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700' }}>
                        {selectedOption === null ? '👆 Selecciona una opción' : '✓ Enviar Voto'}
                    </button>
                </>
            ) : (
                <div>
                    <div className="success-badge">
                        ✓ ¡Gracias por votar! Aquí están los resultados en vivo:
                    </div>
                    <ResultsChart options={question.options} counts={counts} total={total} />
                </div>
            )}

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                👤 {name} | 🔐 {roomId} {hasVoted && ' | ✓ Voto registrado'}
            </div>
        </div>
    );
};

export default PlayerView;
