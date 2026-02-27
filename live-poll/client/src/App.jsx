import React, { useState, useEffect } from 'react';
import './App.css';
import { useWebSocket } from './useWebSocket';
import JoinScreen from './JoinScreen';
import HostView from './HostView';
import PlayerView from './PlayerView';
import ResultsChart from './ResultsChart';

function App() {
  const [user, setUser] = useState(null);
  const { lastMessage, connected, error, send, clearError } = useWebSocket('ws://localhost:8080');
  const [pollState, setPollState] = useState(null);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'STATE') {
      setPollState(lastMessage.payload);
    }
  }, [lastMessage]);

  const handleJoin = (userData) => {
    setUser(userData);
    send('JOIN', userData);
  };

  const handleSetQuestion = (question) => {
    send('HOST_SET_QUESTION', { question });
  };

  const handleVote = (optionIndex) => {
    send('VOTE', {
      questionId: pollState.question.id,
      optionIndex,
      name: user.name
    });
  };

  const handleGoBack = () => {
    setUser(null);
    setPollState(null);
    clearError();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ textAlign: 'center', padding: '2rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative' }}>
        {user && (
          <button 
            onClick={handleGoBack}
            className="btn-nav-back"
            title="Volver a la pantalla anterior"
          >
            ← Atrás
          </button>
        )}
        <h1 className="text-gradient" style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>Bienvenido</h1>
        <p style={{ color: 'var(--text-tertiary)', margin: '0', fontSize: '0.9rem' }}>
          {connected ? '🟢 Conectado' : '🔴 Reconectando...'}
        </p>
        {user && (
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              👤 <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{user.name}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              🔐 Sala: <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{user.roomId}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              🎭 <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{user.role === 'host' ? 'Anfitrión' : 'Jugador'}</span>
            </div>
          </div>
        )}
      </header>

      <main style={{ flex: 1, padding: '2rem 1rem' }}>
        {error && (
          <div className="error-badge" style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            {error} <button onClick={clearError} style={{ marginLeft: '1rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>X</button>
          </div>
        )}

        {!user ? (
          <JoinScreen onJoin={handleJoin} />
        ) : (
          <>
            {user.role === 'host' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <HostView roomId={user.roomId} onSetQuestion={handleSetQuestion} />
                {pollState?.question && (
                  <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
                    <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
                      <h3 className="text-gradient" style={{ margin: 0 }}>Resultados en Vivo</h3>
                      <p style={{ color: 'var(--text-tertiary)', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>{pollState.question.text}</p>
                    </div>
                    <ResultsChart options={pollState.question.options} counts={pollState.counts} total={pollState.total} />
                  </div>
                )}
              </div>
            ) : (
              <PlayerView
                roomId={user.roomId}
                name={user.name}
                state={pollState}
                onVote={handleVote}
              />
            )}
          </>
        )}
      </main>

      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
        <p style={{ margin: 0 }}>Construido con React y WebSockets | 2026</p>
      </footer>
    </div>
  );
}

export default App;
