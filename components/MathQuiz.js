import React, { useState } from 'react';
import { ChevronLeft, Home, BookOpen, Printer, ClipboardCheck, Trophy, Bot, Send, X } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');
  const [olympiadView, setOlympiadView] = useState('selection');
  const [qcmView, setQcmView] = useState('selection');
  const [qcmAnswers, setQcmAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '\ud83d\udc4b Bonjour ! Je suis MathBot, votre assistant math\u00e9matiques. Je peux vous aider avec l\'alg\u00e8bre, la g\u00e9om\u00e9trie, les fractions, les \u00e9quations et bien plus ! Posez-moi vos questions.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handlePrint = () => { window.print(); };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Tu es MathBot, un assistant p\u00e9dagogique sp\u00e9cialis\u00e9 en math\u00e9matiques pour les \u00e9l\u00e8ves de coll\u00e8ge au Maroc (1\u00e8re et 2\u00e8me ann\u00e9e). Tu dois r\u00e9pondre en fran\u00e7ais de mani\u00e8re claire et p\u00e9dagogique, expliquer les concepts \u00e9tape par \u00e9tape, utiliser des exemples concrets, encourager les \u00e9l\u00e8ves, couvrir l'alg\u00e8bre, la g\u00e9om\u00e9trie, les fractions, les \u00e9quations, les puissances, le th\u00e9or\u00e8me de Pythagore, Thal\u00e8s, etc. Reste toujours dans le contexte des math\u00e9matiques de coll\u00e8ge.`,
          messages: [{ role: 'user', content: userMessage }]
        })
      });
      const data = await response.json();
      const aiResponse = data.content.map(item => item.text || '').join('\n');
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '\u274c D\u00e9sol\u00e9, j\'ai rencontr\u00e9 un probl\u00e8me. Peux-tu reformuler ta question ?' }]);
    }
    setIsTyping(false);
  };

  // \u2500\u2500\u2500 MENU PRINCIPAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">\ud83d\udcda Math\u00e9matiques</h1>
            <p className="text-2xl text-gray-600">Lyc\u00e9e Coll\u00e8ge Mouad Ibn Jabal - Sal\u00e9</p>
            <p className="text-xl text-gray-500 mt-2">Ann\u00e9e Scolaire 2024-2025</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <button onClick={() => setCurrentView('homework')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-green-200 hover:border-green-400">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Devoirs</h2>
              <p className="text-gray-600">Consulter et imprimer les devoirs</p>
            </button>
            <button onClick={() => setCurrentView('diagnostic')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-orange-200 hover:border-orange-400">
              <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tests Diagnostiques</h2>
              <p className="text-gray-600">Tests de fin de semestre</p>
            </button>
            <button onClick={() => setCurrentView('olympiads')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-yellow-200 hover:border-yellow-400">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Olympiades</h2>
              <p className="text-gray-600">Exercices de pr\u00e9paration</p>
            </button>
            <button onClick={() => setCurrentView('qcm')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-purple-200 hover:border-purple-400">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">QCM</h2>
              <p className="text-gray-600">Quiz interactifs avec correction</p>
            </button>
          </div>
        </div>

        <button onClick={() => setShowAIChat(!showAIChat)} className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all z-50">
          <Bot className="w-8 h-8" />
        </button>

        {showAIChat && (
          <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z
