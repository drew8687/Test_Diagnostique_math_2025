import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Home, BookOpen, Printer, ClipboardCheck, Trophy, Bot, Send, X } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');
  const [olympiadView, setOlympiadView] = useState('selection');
  const [qcmView, setQcmView] = useState('selection');
  const [qcmAnswers, setQcmAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  // États pour l'agent IA
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `👋 Marhba bik! Ana MathBot!

🇫🇷 Français: Je peux t'aider avec l'algèbre, la géométrie, les fractions, les équations!
🇲🇦 Darija: Nقder n3awnek f lalgèbre, lhandasa, lkousourat, lmou3adalat!` 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePrint = () => {
    window.print();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA9IhsOIcY3qLOtqNNWwE2NWxIA_CaGwuY`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Tu es MathBot bilingue FR/Darija. Réponds TOUJOURS:
🇫🇷 En Français: [explication]
🇲🇦 Darija: [نفس الشرح]
Question: ${userMessage}`
            }]
          }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
        })
      });
      
      const data = await response.json();
      let aiResponse = '🇫🇷 Erreur technique\n🇲🇦 Mouchkil technique';
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🇫🇷 Problème de connexion\n🇲🇦 Mouchkil f connexion' 
      }]);
    }
    setIsTyping(false);
  };

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">📚 Mathématiques</h1>
            <p className="text-2xl text-gray-600">Lycée Collège Mouad Ibn Jabal - Salé</p>
            <p className="text-xl text-gray-500 mt-2">Année 2024-2025</p>
            <div className="mt-4 inline-block bg-green-100 px-6 py-2 rounded-full">
              <p className="text-sm text-green-800 font-semibold">
                🤖 Google AI Gratuit • 🇫🇷 Français + 🇲🇦 Darija
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button onClick={() => setCurrentView('homework')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-green-200">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Devoirs</h2>
              <p className="text-gray-600">À imprimer</p>
            </button>
            
            <button onClick={() => setCurrentView('diagnostic')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-orange-200">
              <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tests</h2>
              <p className="text-gray-600">Diagnostiques</p>
            </button>

            <button onClick={() => setCurrentView('olympiads')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-yellow-200">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Olympiades</h2>
              <p className="text-gray-600">Préparation</p>
            </button>

            <button onClick={() => setCurrentView('qcm')} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-purple-200">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">QCM</h2>
              <p className="text-gray-600">Quiz interactifs</p>
            </button>
          </div>
        </div>

        <button onClick={() => setShowAIChat(!showAIChat)} className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-pulse">
          <Bot className="w-8 h-8" />
        </button>

        {showAIChat && (
          <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-purple-300">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">MathBot 🇫🇷🇲🇦</h3>
                  <p className="text-xs opacity-90">Google AI Gratuit</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start"><div className="bg-gray-100 p-3 rounded-2xl"><p className="text-sm">Écrit...</p></div></div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ta question..." className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                <button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button onClick={() => setInputMessage("Comment résoudre 2x + 5 = 13 ?")} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Équations 🇫🇷</button>
                <button onClick={() => setInputMessage("Kifach n7el 3x - 4 = 8 ?")} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Equations 🇲🇦</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'homework') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8">📚 Devoirs</h1>
          <p className="text-center mb-6">Section Devoirs disponible</p>
          <div className="text-center">
            <button onClick={() => setCurrentView('menu')} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              <Home className="inline w-5 h-5 mr-2" />Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'diagnostic') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8">🎯 Tests Diagnostiques</h1>
          <p className="text-center mb-6">Tests fin de semestre</p>
          <div className="text-center">
            <button onClick={() => setCurrentView('menu')} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              <Home className="inline w-5 h-5 mr-2" />Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'olympiads') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8">🏆 Olympiades</h1>
          <p className="text-center mb-6">Exercices de préparation</p>
          <div className="text-center">
            <button onClick={() => setCurrentView('menu')} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              <Home className="inline w-5 h-5 mr-2" />Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'qcm') {
    if (qcmView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-8">📝 QCM Interactifs</h1>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => { setQcmView('1apic'); setQcmAnswers({}); setShowResults(false); }} className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white p-8 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-2">1ère Année</div>
                <div className="text-lg opacity-90">10 questions</div>
              </button>
              <button onClick={() => { setQcmView('2apic'); setQcmAnswers({}); setShowResults(false); }} className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-8 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-2">2ème Année</div>
                <div className="text-lg opacity-90">12 questions</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('menu')} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                <Home className="inline w-5 h-5 mr-2" />Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    const questions1 = [
      { id: 1, question: "125 + 75 - 50 ?", options: ["100", "150", "200", "250"], correct: 1 },
      { id: 2, question: "3/4 + 1/4 ?", options: ["4/8", "4/4", "1/2", "2/4"], correct: 1 },
      { id: 3, question: "Somme angles triangle ?", options: ["90°", "180°", "360°", "270°"], correct: 1 },
      { id: 4, question: "(-5)² ?", options: ["-25", "25", "-10", "10"], correct: 1 },
      { id: 5, question: "Périmètre carré 5 cm ?", options: ["10 cm", "15 cm", "20 cm", "25 cm"], correct: 2 },
      { id: 6, question: "Équivalent à 2/3 ?", options: ["3/4", "4/6", "5/6", "1/3"], correct: 1 },
      { id: 7, question: "Intersection médianes ?", options: ["Circonscrit", "Gravité", "Orthocentre", "Inscrit"], correct: 1 },
      { id: 8, question: "2³ ?", options: ["6", "8", "9", "12"], correct: 1 },
      { id: 9, question: "Aire 8×5 cm ?", options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"], correct: 2 },
      { id: 10, question: "Triangle 90° ?", options: ["Équilatéral", "Isocèle", "Rectangle", "Quelconque"], correct: 2 }
    ];

    const questions2 = [
      { id: 1, question: "(-3)³ ?", options: ["-27", "27", "-9", "9"], correct: 0 },
      { id: 2, question: "45000 scientifique ?", options: ["4,5×10³", "45×10³", "4,5×10⁴", "0,45×10⁵"], correct: 2 },
      { id: 3, question: "Parallèles à même droite ?", options: ["Perpendiculaires", "Sécantes", "Parallèles", "Confondues"], correct: 2 },
      { id: 4, question: "Pythagore: a²+b²=?", options: ["a+b", "c²", "ab", "c"], correct: 1 },
      { id: 5, question: "Thalès calcule ?", options: ["Angles", "Longueurs", "Aires", "Volumes"], correct: 1 },
      { id: 6, question: "2⁻³ ?", options: ["-8", "1/8", "-6", "6"], correct: 1 },
      { id: 7, question: "Cercle inscrit ?", options: ["Médiatrices", "Médianes", "Hauteurs", "Bissectrices"], correct: 3 },
      { id: 8, question: "Triangle 6-8-10 ?", options: ["Équilatéral", "Isocèle", "Rectangle", "Quelconque"], correct: 2 },
      { id: 9, question: "(3²)³ ?", options: ["3⁵", "3⁶", "9³", "27"], correct: 1 },
      { id: 10, question: "Médiane relie à ?", options: ["Hauteur", "Milieu côté", "Centre", "Orthocentre"], correct: 1 },
      { id: 11, question: "5⁰ ?", options: ["0", "1", "5", "Impossible"], correct: 1 },
      { id: 12, question: "60°+60°+? dans triangle", options: ["30°", "60°", "90°", "120°"], correct: 1 }
    ];

    const questions = qcmView === '1apic' ? questions1 : questions2;
    const handleAnswer = (qId, idx) => setQcmAnswers({...qcmAnswers, [qId]: idx});
    const score = showResults ? questions.filter(q => qcmAnswers[q.id] === q.correct).length : 0;
    const pct = showResults ? (score / questions.length * 100).toFixed(0) : 0;

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8 border-b-2 pb-6">
            <h1 className="text-3xl font-bold mb-2">📝 QCM {qcmView === '1apic' ? '1ère' : '2ème'} Année</h1>
            <button onClick={() => { setQcmView('selection'); setQcmAnswers({}); setShowResults(false); }} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg">
              <ChevronLeft className="inline w-4 h-4 mr-2" />Retour
            </button>
          </div>

          {showResults && (
            <div className={`mb-6 p-6 rounded-lg border-2 ${pct >= 80 ? 'bg-green-50 border-green-400' : pct >= 60 ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'}`}>
              <h2 className="text-2xl font-bold text-center mb-2">Résultat: {score}/{questions.length}</h2>
              <p className="text-xl text-center font-semibold">Score: {pct}%</p>
              <p className="text-center mt-2">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Bon travail!' : '💪 Continue!'}</p>
            </div>
          )}

          <div className="space-y-6">
            {questions.map(q => (
              <div key={q.id} className="border-2 rounded-lg p-6 bg-gray-50">
                <h3 className="font-bold text-lg mb-4">Q{q.id}: {q.question}</h3>
                <div className="space-y-3">
                  {q.options.map((opt, idx) => {
                    const sel = qcmAnswers[q.id] === idx;
                    const cor = idx === q.correct;
                    return (
                      <button key={idx} onClick={() => !showResults && handleAnswer(q.id, idx)} disabled={showResults}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResults ? (cor ? 'bg-green-100 border-green-500 font-semibold' : sel ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300')
                          : sel ? 'bg-purple-100 border-purple-500' : 'bg-white border-gray-300 hover:border-purple-300'
                        }`}>
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                        {showResults && cor && <span className="ml-2">✓</span>}
                        {showResults && sel && !cor && <span className="ml-2">✗</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            {!showResults ? (
              <button onClick={() => setShowResults(true)} className="px-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-lg hover:bg-purple-700 shadow-lg">
                Voir résultats
              </button>
            ) : (
              <button onClick={() => { setQcmAnswers({}); setShowResults(false); }} className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 shadow-lg">
                Recommencer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MathApp;
