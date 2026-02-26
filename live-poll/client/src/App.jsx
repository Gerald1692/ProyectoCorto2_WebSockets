import React, { useState, useEffect } from 'react';
import './App.css';
import { useWebSocket } from './useWebSocket';
import JoinScreen from './JoinScreen';
import HostView from './HostView';
import PlayerView from './PlayerView';
import ResultsChart from './ResultsChart';

function App() {
  const [user, setUser] = useState(null); // { name, roomId, role }
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

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ margin: 0 }}>EncuestasEnVivo.io</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          {connected ? '● Conectado' : '○ Reconectando...'}
        </p>
      </header>

      <main>
        {error && (
          <div className="error-badge" style={{ maxWidth: '400px', margin: '0 auto 2rem auto' }}>
            Error: {error}
            <button onClick={clearError} style={{ marginLeft: '1rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>✕</button>
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
                  <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                    <h3 className="text-gradient">Resultados en Vivo: {pollState.question.text}</h3>
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

      <footer style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Construido con React & WebSockets
      </footer>
    </div>
  );
}

export default App;
