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

    return (
        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="text-gradient">Unirse a la Encuesta</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Ingresa un ID de sala para participar o crear una encuesta en vivo.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Tu Nombre</label>
                    <input
                        type="text"
                        placeholder="ej. Alex"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>ID de la Sala</label>
                    <input
                        type="text"
                        placeholder="ej. SALA-123"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Rol</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="player">Jugador</option>
                        <option value="host">Anfitrión (Host)</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Comenzar
                </button>
            </form>
        </div>
    );
};

export default JoinScreen;
