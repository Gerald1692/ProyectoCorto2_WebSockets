import React, { useState } from 'react';
import Resultado from '../Resultado/resultado';
import './player.css';

// Player component extracted from PlayerView.jsx with styles moved to CSS (BEM-like classes)
const Player = ({ roomId, name, state, onVote }) => {
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
      <div className="glass-panel player-empty-container">
        <div className="player-empty-info">
          <h2 className="text-gradient">⏳ Esperando Encuesta</h2>
          <p className="player-empty-subtext">El anfitrión aún no ha iniciado una encuesta. ¡Mantente a la espera!</p>
        </div>
        <div className="player-meta">
          <div className="player-meta-grid">
            <div>
              <span className="player-meta-label">👤 Usuario</span>
              <p className="player-meta-value">{name}</p>
            </div>
            <div>
              <span className="player-meta-label">🔐 Sala</span>
              <p className="player-meta-value">{roomId}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel player-container">
      {/* Header */}
      <div className="player-header">
        <span className="player-header-badge">📊 ENCUESTA ACTIVA</span>
        <h2 style={{ marginTop: '0.75rem', marginBottom: 0 }}>{question.text}</h2>
      </div>

      {!hasVoted ? (
        <>
          <p className="player-subtitle">Selecciona una opción y envía tu voto</p>
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
            className="btn-primary player-submit"
          >
            {selectedOption === null ? '👆 Selecciona una opción' : '✓ Enviar Voto'}
          </button>
        </>
      ) : (
        <div>
          <div className="success-badge">✓ ¡Gracias por votar! Aquí están los resultados en vivo:</div>
          <Resultado options={question.options} counts={counts} total={total} />
        </div>
      )}

      <div className="player-footer">
        👤 {name} | 🔐 {roomId} {hasVoted && ' | ✓ Voto registrado'}
      </div>
    </div>
  );
};

export default Player;
