import React, { useState } from 'react';

const JoinScreen = ({ onJoin }) => {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [role, setRole] = useState('player');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && roomId) {
            onJoin({ name, roomId, role });
        }
    };

    const isFormValid = name.trim() !== '' && roomId.trim() !== '';

    return (
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Cien Camilos Dijeron </h1>
                <p style={{ color: 'var(--text-tertiary)', margin: '0' }}>Encuestas en vivo colaborativas</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>👤 Tu Nombre</label>
                    <input type="text" placeholder="ej. Alex, María, Juan" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} required />
                </div>

                <div className="input-group">
                    <label>🔐 ID de la Sala</label>
                    <input type="text" placeholder="ej. SALA-ABC123" value={roomId} onChange={(e) => setRoomId(e.target.value.toUpperCase())} maxLength={20} required />
                </div>

                <div className="input-group">
                    <label>🎭 Selecciona tu Rol</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="player">👥 Jugador (Responde encuestas)</option>
                        <option value="host">🎤 Anfitrión (Crea encuestas)</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700' }} disabled={!isFormValid}>
                    🚀 Comenzar
                </button>
            </form>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textAlign: 'center', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Características</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0, 217, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 217, 255, 0.1)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0' }}>Tiempo Real</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0' }}>Seguro</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0, 217, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 217, 255, 0.1)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0' }}>Resultados</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0' }}>Fácil Uso</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinScreen;
