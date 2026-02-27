import React, { useState } from 'react';

const HostView = ({ roomId, onSetQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

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
            setIsCreatingQuestion(true);
            setTimeout(() => {
                onSetQuestion({
                    id: Date.now().toString(),
                    text: questionText,
                    options: options.map(o => o.trim())
                });
                setQuestionText('');
                setOptions(['', '']);
                setIsCreatingQuestion(false);
            }, 300);
        }
    };

    const isFormValid = questionText.trim() !== '' && options.every(o => o.trim() !== '');

    return (
        <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div>
                    <h2 className="text-gradient">🎤 Panel del Anfitrión</h2>
                    <p style={{ color: 'var(--text-tertiary)', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>Crea encuestas en vivo y recibe respuestas en tiempo real</p>
                </div>
                <div style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.2)', borderRadius: '12px', padding: '0.75rem 1.25rem', fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: '600', whiteSpace: 'nowrap' }}>🔐 Sala: <span style={{ fontWeight: '800' }}>{roomId}</span></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>✍️ Pregunta de la Encuesta</label>
                    <input type="text" placeholder="ej. ¿Cuál es tu framework favorito?" value={questionText} onChange={(e) => setQuestionText(e.target.value)} maxLength={150} required />
                    <small style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '-0.5rem' }}>{questionText.length}/150 caracteres</small>
                </div>

                <div className="input-group">
                    <label>📋 Opciones de respuesta ({options.length}/4)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {options.map((opt, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', animation: 'fadeIn 0.3s ease-out' }}>
                                <span style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #00d9ff 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: '700', fontSize: '0.8rem' }}>{i + 1}</span>
                                <input style={{ flex: 1 }} type="text" placeholder={`Opción ${i + 1}`} value={opt} onChange={(e) => updateOption(i, e.target.value)} maxLength={80} required />
                                {options.length > 2 && <button type="button" onClick={() => removeOption(i)} className="btn-outline" style={{ padding: '0.75rem 0.9rem', minWidth: 'auto' }}>✕</button>}
                            </div>
                        ))}
                    </div>
                    {options.length < 4 && <button type="button" onClick={addOption} className="btn-outline" style={{ marginTop: '0.75rem', width: '100%', borderStyle: 'dashed', color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}>+ Añadir Opción ({options.length}/4)</button>}
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700' }} disabled={!isFormValid || isCreatingQuestion}>{isCreatingQuestion ? '⏳ Lanzando...' : '🚀 Lanzar Encuesta'}</button>
            </form>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 217, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 217, 255, 0.1)', fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: '1.6' }}><strong style={{ color: 'var(--accent-color)' }}>💡 Consejo:</strong> Crea preguntas claras y concisas para mejores resultados.</div>
        </div>
    );
};

export default HostView;
