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

  // 2. Fonction d'appel à l'IA (Exemple OpenRouter/OpenAI)
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyARp6crFKVeznW02lb9yY51w-mFn0PFWF0` // Remplacez ici
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: updatedMessages
        })
      });

      const data = await response.json();
      
      if (data.choices) {
        const botReply = { role: 'assistant', content: data.choices[0].message.content };
        setMessages(prev => [...prev, botReply]);
      } else {
        throw new Error("Réponse invalide de l'API");
      }
    } catch (error) {
      console.error('Erreur Chatbot:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur est survenue." }]);
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
                <span style={{ background: m.role === 'user' ? '#007bff' : '#eee', color: m.role === 'user' ? 'white' : 'black', padding: '5px 10px', borderRadius: '10px', display: 'inline-block' }}>
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && <p style={{ fontSize: '12px' }}>MathBot réfléchit...</p>}
          </div>
          
          <div style={{ display: 'flex' }}>
            <input 
              style={{ flex: 1, padding: '8px' }}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ex: Résous x + 2 = 5"
            />
            <button onClick={handleSendMessage} disabled={isTyping} style={{ padding: '8px' }}>
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathApp;
