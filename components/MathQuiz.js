import React, { useState, useEffect } from 'react';

const MathApp = () => {
  // Navigation
  const [currentView, setCurrentView] = useState('menu');
  const [visitorCount, setVisitorCount] = useState(0);

  // États du Chatbot
  const [showAIChat, setShowAIChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour ! Je suis MathBot. Posez-moi vos questions de maths !' }
  ]);

  // 1. Gestion du compteur de visiteurs
  useEffect(() => {
    const count = localStorage.getItem('visitor-count') || 0;
    const newCount = parseInt(count) + 1;
    localStorage.setItem('visitor-count', newCount);
    setVisitorCount(newCount);
  }, []);

  // 2. Fonction d'appel à l'IA corrigée pour GOOGLE GEMINI
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // VOTRE CLÉ GEMINI (Extraite de votre code précédent)
    const API_KEY = "AIzaSyARp6crFKVeznW02lb9yY51w-mFn0PFWF0";
    // URL spécifique à Gemini
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: inputMessage }]
          }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content) {
        const botText = data.candidates[0].content.parts[0].text;
        const botReply = { role: 'assistant', content: botText };
        setMessages(prev => [...prev, botReply]);
      } else {
        console.error("Réponse API invalide:", data);
        throw new Error("Format de réponse incorrect");
      }
    } catch (error) {
      console.error('Erreur Chatbot:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur est survenue lors de la connexion à l'IA." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>MathApp 📐</h1>
      <p>Visiteurs : {visitorCount}</p>

      {/* Menu Simple */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowAIChat(!showAIChat)}>
          {showAIChat ? "Fermer le Chat" : "Ouvrir MathBot"}
        </button>
      </div>

      {/* Interface Chatbot */}
      {showAIChat && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', maxWidth: '400px' }}>
          <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', background: '#f9f9f9', padding: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                <span style={{ 
                  background: m.role === 'user' ? '#007bff' : '#eee', 
                  color: m.role === 'user' ? 'white' : 'black', 
                  padding: '5px 10px', 
                  borderRadius: '10px', 
                  display: 'inline-block',
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap' 
                }}>
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && <p style={{ fontSize: '12px', color: '#666' }}>MathBot réfléchit...</p>}
          </div>
          
          <div style={{ display: 'flex' }}>
            <input 
              style={{ flex: 1, padding: '8px', borderRadius: '4px 0 0 4px', border: '1px solid #ccc' }}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ex: Résous x + 2 = 5"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isTyping} 
              style={{ padding: '8px', borderRadius: '0 4px 4px 0', cursor: isTyping ? 'not-allowed' : 'pointer' }}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathApp;
