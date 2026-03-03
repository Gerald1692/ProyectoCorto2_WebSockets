import React, { useState } from 'react';
import './JoinScreen.css';

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
        <div className="glass-panel join-screen" >
            <div className="join-screen__header">
                <h1 className="text-gradient join-screen__title">Cien Camilos Dijeron </h1>
                <p className="join-screen__subtitle">Encuestas en vivo colaborativas</p>
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

                <button type="submit" className="btn-primary join-screen__submit" disabled={!isFormValid}>
                    🚀 Comenzar
                </button>
            </form>
        </div>
    );
};

export default JoinScreen;
