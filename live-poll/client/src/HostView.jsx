import React, { useState } from 'react';

const HostView = ({ roomId, onSetQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '']);

    const addOption = () => {
        if (options.length < 4) setOptions([...options, '']);
    };

    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionText && options.every(o => o.trim() !== '')) {
            onSetQuestion({
                id: Date.now().toString(),
                text: questionText,
                options: options.map(o => o.trim())
            });
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="text-gradient">Panel del Anfitrión</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sala: {roomId}</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Pregunta de la Encuesta</label>
                    <input
                        type="text"
                        placeholder="¿Cuál es tu framework favorito?"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Opciones (2-4)</label>
                    {options.map((opt, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input
                                style={{ flex: 1 }}
                                type="text"
                                placeholder={`Opción ${i + 1}`}
                                value={opt}
                                onChange={(e) => updateOption(i, e.target.value)}
                                required
                            />
                            {options.length > 2 && (
                                <button type="button" onClick={() => removeOption(i)} className="btn-outline" style={{ padding: '0.5rem' }}>
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {options.length < 4 && (
                        <button type="button" onClick={addOption} className="btn-outline" style={{ marginTop: '0.5rem' }}>
                            + Añadir Opción
                        </button>
                    )}
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                    Lanzar Encuesta
                </button>
            </form>
        </div>
    );
};

export default HostView;
