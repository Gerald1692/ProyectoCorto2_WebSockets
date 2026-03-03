import React, { useState } from 'react';
import './HostView.css';

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
        <div className="glass-panel host-view">
            <div className="host-view__topbar">
                <div>
                    <h2 className="text-gradient">🎤 Panel del Anfitrión</h2>
                    <p className="host-view__hint">Crea encuestas en vivo y recibe respuestas en tiempo real</p>
                </div>
                <div className="host-view__room-badge">🔐 Sala: <span>{roomId}</span></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>✍️ Pregunta de la Encuesta</label>
                    <input type="text" placeholder="ej. ¿Cuál es tu framework favorito?" value={questionText} onChange={(e) => setQuestionText(e.target.value)} maxLength={150} required />
                    <small className="host-view__counter">{questionText.length}/150 caracteres</small>
                </div>

                <div className="input-group">
                    <label>📋 Opciones de respuesta ({options.length}/4)</label>
                    <div className="host-view__options">
                        {options.map((opt, i) => (
                            <div key={i} className="host-view__option-row">
                                <span className="host-view__option-index">{i + 1}</span>
                                <input className="host-view__option-input" type="text" placeholder={`Opción ${i + 1}`} value={opt} onChange={(e) => updateOption(i, e.target.value)} maxLength={80} required />
                                {options.length > 2 && <button type="button" onClick={() => removeOption(i)} className="btn-outline host-view__remove">✕</button>}
                            </div>
                        ))}
                    </div>
                    {options.length < 4 && <button type="button" onClick={addOption} className="btn-outline host-view__add">+ Añadir Opción ({options.length}/4)</button>}
                </div>

                <button type="submit" className="btn-primary host-view__submit" disabled={!isFormValid || isCreatingQuestion}>{isCreatingQuestion ? '⏳ Lanzando...' : '🚀 Lanzar Encuesta'}</button>
            </form>

            <div className="host-view__tip"><strong>💡 Consejo:</strong> Crea preguntas claras y concisas para mejores resultados.</div>
        </div>
    );
};

export default HostView;
