import React, { useState, useEffect } from 'react';
import { ChevronLeft, Home, BookOpen, Printer, ClipboardCheck, Trophy, Bot, Send, X, GraduationCap } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');
  const [olympiadView, setOlympiadView] = useState('selection');
  const [qcmView, setQcmView] = useState('selection');
  const [qcmAnswers, setQcmAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lessonsView, setLessonsView] = useState('selection');
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  // États pour l'agent IA
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour ! Je suis MathBot, votre assistant mathématiques. Je peux vous aider avec l\'algèbre, la géométrie, les fractions, les équations et bien plus ! Posez-moi vos questions.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Configuration des leçons
  const lessons = [
    { id: 1, title: 'Développement et factorisation', week: 1 },
    { id: 2, title: 'Équations', week: 2 },
    { id: 3, title: 'Symétrie centrale et parallélogrammes', week: 3 },
    { id: 4, title: 'Quadrilatères particuliers - Parallélogrammes et sécante', week: 4 },
    { id: 5, title: 'Cercle', week: 5 },
    { id: 6, title: 'Prisme droit et cylindre', week: 7 },
    { id: 7, title: 'Degrés et coordonnées', week: 8 },
    { id: 8, title: 'Proportionnalité', week: 9 },
    { id: 9, title: 'Statistiques', week: 10 }
  ];

  const controls = [
    { id: 1, title: 'Contrôle 1', week: 6, lessons: [1, 2, 3] },
    { id: 2, title: 'Contrôle 2', week: 11, lessons: [4, 5, 6] },
    { id: 3, title: 'Contrôle 3', week: 16, lessons: [7, 8, 9] }
  ];

  // Simuler la semaine actuelle (vous pouvez la calculer dynamiquement)
  const [currentWeek, setCurrentWeek] = useState(3);

  const getCurrentLesson = () => {
    return lessons.find(lesson => lesson.week === currentWeek);
  };

  const getLessonProgress = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return 0;
    if (lesson.week < currentWeek) return 100;
    if (lesson.week > currentWeek) return 0;
    // Simuler la progression dans la semaine (0-100%)
    return 45; // Vous pouvez calculer cela dynamiquement
  };

  const handlePrint = () => {
    window.print();
  };

  // Fonction pour gérer l'envoi de message à l'IA
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage;
    setInputMessage('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Tu es MathBot, un assistant pédagogique spécialisé en mathématiques pour les élèves de collège au Maroc (1ère et 2ème année). 
          
          Tu dois :
          - Répondre en français de manière claire et pédagogique
          - Expliquer les concepts étape par étape
          - Utiliser des exemples concrets
          - Encourager les élèves
          - Couvrir l'algèbre, la géométrie, les fractions, les équations, les puissances, le théorème de Pythagore, Thalès, etc.
          - Donner des astuces et méthodes de résolution
          - Être patient et bienveillant
          
          Reste toujours dans le contexte des mathématiques de collège. Si on te pose une question hors sujet, rappelle poliment que tu es là pour les mathématiques.`,
          messages: [
            { role: 'user', content: userMessage }
          ]
        })
      });
      
      const data = await response.json();
      const aiResponse = data.content.map(item => item.text || '').join('\n');
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Désolé, j\'ai rencontré un problème. Peux-tu reformuler ta question ?' 
      }]);
    }
    
    setIsTyping(false);
  };

  // Menu Principal
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">📚 Mathématiques</h1>
            <p className="text-2xl text-gray-600">Lycée Collège Mouad Ibn Jabal - Salé</p>
            <p className="text-xl text-gray-500 mt-2">Année Scolaire 2024-2025</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <button 
              onClick={() => setCurrentView('lessons')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-blue-200 hover:border-blue-400"
            >
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Leçons</h2>
              <p className="text-gray-600">Programme et progression</p>
            </button>

            <button 
              onClick={() => setCurrentView('homework')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-green-200 hover:border-green-400"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Devoirs</h2>
              <p className="text-gray-600">Consulter et imprimer les devoirs</p>
            </button>
            
            <button 
              onClick={() => setCurrentView('diagnostic')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-orange-200 hover:border-orange-400"
            >
              <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tests Diagnostiques</h2>
              <p className="text-gray-600">Tests de fin de semestre</p>
            </button>

            <button 
              onClick={() => setCurrentView('olympiads')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-yellow-200 hover:border-yellow-400"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Olympiades</h2>
              <p className="text-gray-600">Exercices de préparation</p>
            </button>

            <button 
              onClick={() => setCurrentView('qcm')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-purple-200 hover:border-purple-400"
            >
              <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">QCM</h2>
              <p className="text-gray-600">Quiz interactifs avec correction</p>
            </button>
          </div>
        </div>

        {/* Bouton flottant pour l'agent IA */}
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-50"
        >
          <Bot className="w-8 h-8" />
        </button>

        {/* Fenêtre de chat IA */}
        {showAIChat && (
          <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-purple-300">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">MathBot</h3>
                  <p className="text-xs opacity-90">Votre assistant mathématiques</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none">
                    <p className="text-sm">MathBot est en train d'écrire...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setInputMessage("Comment résoudre une équation du premier degré ?")}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200"
                >
                  Équations
                </button>
                <button
                  onClick={() => setInputMessage("Explique-moi le théorème de Pythagore")}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200"
                >
                  Pythagore
                </button>
                <button
                  onClick={() => setInputMessage("Comment calculer une fraction ?")}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200"
                >
                  Fractions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Section LEÇONS
  if (currentView === 'lessons') {
    const currentLesson = getCurrentLesson();
    
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📖 Programme de Leçons 2024-2025</h1>
          
          {/* Leçon en cours avec barre de progression */}
          {currentLesson && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-blue-600 mb-1">📚 LEÇON EN COURS - Semaine {currentWeek}</h3>
                  <h2 className="text-2xl font-bold text-gray-800">{currentLesson.title}</h2>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{getLessonProgress(currentLesson.id)}%</div>
                  <div className="text-sm text-gray-600">Progression</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${getLessonProgress(currentLesson.id)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Timeline des leçons et contrôles */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const control = controls.find(c => c.week === lesson.week + 1);
              const isCompleted = lesson.week < currentWeek;
              const isCurrent = lesson.week === currentWeek;
              const isUpcoming = lesson.week > currentWeek;
              
              return (
                <React.Fragment key={lesson.id}>
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    isCurrent ? 'bg-blue-50 border-blue-400 shadow-lg' :
                    isCompleted ? 'bg-green-50 border-green-300' :
                    'bg-gray-50 border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          isCurrent ? 'bg-blue-600' :
                          isCompleted ? 'bg-green-600' :
                          'bg-gray-400'
                        }`}>
                          {isCompleted ? '✓' : lesson.id}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500">Semaine {lesson.week}</div>
                          <h3 className="text-xl font-bold text-gray-800">{lesson.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                            En cours
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold">
                            Terminée
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="px-4 py-2 bg-gray-400 text-white rounded-full text-sm font-semibold">
                            À venir
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Afficher le contrôle après certaines leçons */}
                  {controls.map(control => {
                    if (control.lessons.includes(lesson.id) && lesson.id === Math.max(...control.lessons)) {
                      const controlPassed = currentWeek > control.week;
                      const controlComing = currentWeek < control.week;
                      const controlNow = currentWeek === control.week;
                      
                      return (
                        <div key={control.id} className={`ml-8 p-6 rounded-xl border-2 ${
                          controlNow ? 'bg-red-50 border-red-400 shadow-lg' :
                          controlPassed ? 'bg-gray-50 border-gray-300' :
                          'bg-yellow-50 border-yellow-400'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <ClipboardCheck className={`w-10 h-10 ${
                                controlNow ? 'text-red-600' :
                                controlPassed ? 'text-gray-600' :
                                'text-yellow-600'
                              }`} />
                              <div>
                                <div className="text-sm font-semibold text-gray-500">Semaine {control.week}</div>
                                <h3 className="text-xl font-bold text-gray-800">{control.title}</h3>
                                <p className="text-sm text-gray-600">
                                  Leçons évaluées : {control.lessons.map(id => lessons.find(l => l.id === id)?.id).join(', ')}
                                </p>
                              </div>
                            </div>
                            {controlNow && (
                              <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold animate-pulse">
                                ⚠️ Cette semaine !
                              </span>
                            )}
                            {controlPassed && (
                              <span className="px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold">
                                Passé
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentView('menu')}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour au Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... Le reste du code (devoirs, diagnostic, olympiades, QCM) reste identique
  // Je ne répète pas tout le code pour économiser de l'espace
  // Retournez à votre code original pour ces sections

  return null;
};

export default MathApp;
