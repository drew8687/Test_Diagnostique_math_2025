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
    { role: 'assistant', content: '👋 Bonjour ! Je suis MathBot, votre assistant mathématiques. Je peux vous aider avec l\'algèbre, la géométrie, les fractions, les équations et bien plus ! Posez-moi vos questions.' }
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
          system: `Tu es MathBot, un assistant pédagogique spécialisé en mathématiques pour les élèves de collège au Maroc (1ère et 2ème année). Tu dois répondre en français de manière claire et pédagogique, expliquer les concepts étape par étape, utiliser des exemples concrets, encourager les élèves, couvrir l'algèbre, la géométrie, les fractions, les équations, les puissances, le théorème de Pythagore, Thalès, etc. Reste toujours dans le contexte des mathématiques de collège.`,
          messages: [{ role: 'user', content: userMessage }]
        })
      });
      const data = await response.json();
      const aiResponse = data.content.map(item => item.text || '').join('\n');
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Désolé, j\'ai rencontré un problème. Peux-tu reformuler ta question ?' }]);
    }
    setIsTyping(false);
  };

  // ─── MENU PRINCIPAL ───────────────────────────────────────────────────────────
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">📚 Mathématiques</h1>
            <p className="text-2xl text-gray-600">Lycée Collège Mouad Ibn Jabal - Salé</p>
            <p className="text-xl text-gray-500 mt-2">Année Scolaire 2024-2025</p>
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
              <p className="text-gray-600">Exercices de préparation</p>
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
          <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-purple-300">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">MathBot</h3>
                  <p className="text-xs opacity-90">Votre assistant mathématiques</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="hover:bg-white/20 p-1 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
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
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Posez votre question..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                <button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-5 h-5" /></button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button onClick={() => setInputMessage("Comment résoudre une équation du premier degré ?")} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200">Équations</button>
                <button onClick={() => setInputMessage("Explique-moi le théorème de Pythagore")} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">Pythagore</button>
                <button onClick={() => setInputMessage("Comment calculer une fraction ?")} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200">Fractions</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── SECTION DEVOIRS ──────────────────────────────────────────────────────────
  if (currentView === 'homework') {

    if (homeworkView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📚 Devoirs à Domicile</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => setHomeworkView('1apic-list')} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Voir les devoirs</div>
              </button>
              <button onClick={() => setHomeworkView('2apic-list')} className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Voir les devoirs</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('menu')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Home className="w-5 h-5 mr-2" /> Retour au Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── Liste devoirs 1ère année ────────────────────────────────────────────────
    if (homeworkView === '1apic-list') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📚 Devoirs - 1ère Année APIC</h1>
            <div className="space-y-4 mb-8">
              <button onClick={() => setHomeworkView('1apic-devoir1')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-2xl font-bold mb-2">📝 Devoir N°1 — Semestre 2</div>
                <div className="text-sm opacity-90">Algèbre (développer, factoriser) · Équations · Géométrie</div>
              </button>
              <button onClick={() => setHomeworkView('1apic-devoir2')} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-2xl font-bold mb-2">📐 Devoir N°2 — Semestre 2</div>
                <div className="text-sm opacity-90">Angles · Droites parallèles · Parallélogrammes · Symétrie</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setHomeworkView('selection')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-2" /> Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── DEVOIR N°1 — SEMESTRE 2 — 1ÈRE ANNÉE ─────────────────────────────────
    if (homeworkView === '1apic-devoir1') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°1 — Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-1">1ère Année APIC — Semestre 2</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal — Salé</p>
              <p className="text-lg font-semibold text-gray-700">Année Scolaire 2024-2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" /> Imprimer
                </button>
                <button onClick={() => setHomeworkView('1apic-list')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Retour
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 1</div>
                <p className="font-semibold text-base mb-3">① Développer les expressions suivantes :</p>
                <div className="ml-5 space-y-2 text-gray-800">
                  <p>A = 3(n + 2) + 5(n + 1)</p>
                  <p>B = 7n + 2 × (−n + 3)</p>
                  <p>C = (n + 2)²</p>
                  <p>D = (n − 3)²</p>
                  <p>E = (n + 5)(n − 5)</p>
                </div>
                <p className="font-semibold text-base mt-7 mb-3">② Factoriser les expressions suivantes :</p>
                <div className="ml-5 space-y-2 text-gray-800">
                  <p>A = 2x + 4</p>
                  <p>B = 7x − 7</p>
                  <p>C = 5x² + 2x</p>
                  <p>D = x² + 2x + 1</p>
                  <p>E = (2x)² − 8x + 4</p>
                  <p>F = 25 − z²</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 2</div>
                <p className="font-semibold text-base mb-3">① Résoudre les équations suivantes :</p>
                <div className="ml-5 space-y-2 text-gray-800">
                  <p>x − 1 = 2</p>
                  <p>3x − 6 = 0</p>
                  <p>5x − 1 = 3x + 3</p>
                </div>
                <p className="font-semibold text-base mt-7 mb-2">
                  ② Déterminer deux nombres entiers naturels successifs dont la somme est 7.
                </p>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 3</div>
                <div className="space-y-4 text-gray-800">
                  <p><span className="font-semibold">①</span> Construire un triangle ABC tel que AB = 3 cm, AC = 4 cm et BC = 5 cm.</p>
                  <p><span className="font-semibold">②</span> Construire les points symétriques B′, B″ et C′ de A, B et C par rapport au point A.</p>
                  <p><span className="font-semibold">③</span> Montrer que (BC) ∥ (B′C′).</p>
                  <p><span className="font-semibold">④</span> Soit E un point de (BC). Construire son symétrique par rapport à A.</p>
                  <p><span className="font-semibold">⑤</span> Calculer AB′ et AC′.</p>
                  <p><span className="font-semibold">⑥</span> Montrer que BB′C′C est un parallélogramme.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises et soignées</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // ── DEVOIR N°2 — SEMESTRE 2 — 1ÈRE ANNÉE (NOUVEAU) ──────────────────────
    if (homeworkView === '1apic-devoir2') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">

            {/* En-tête */}
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°2 — Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-1">1ère Année APIC — Semestre 2</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal — Salé</p>
              <p className="text-lg font-semibold text-gray-700">Année Scolaire 2024-2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" /> Imprimer
                </button>
                <button onClick={() => setHomeworkView('1apic-list')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Retour
                </button>
              </div>
            </div>

            <div className="space-y-8">

              {/* ── EXERCICE 1 : Angles avec droites sécantes ── */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 1</div>

                <p className="text-gray-800 mb-4 italic">Voir la figure ci-contre : deux droites parallèles (BE) et (CF) coupées par deux sécantes passant par A et D.</p>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-5">
                  {/* Figure corrigée : droites (BE) et (CF) parallèles, sécante (HAD) et sécante (EAD→) */}
                  <svg viewBox="0 0 340 270" className="w-full max-w-sm mx-auto">
                    {/* Droite (BE) horizontale supérieure */}
                    <line x1="20" y1="100" x2="310" y2="100" stroke="black" strokeWidth="2"/>
                    {/* Droite (CF) horizontale inférieure */}
                    <line x1="20" y1="190" x2="310" y2="190" stroke="black" strokeWidth="2"/>

                    {/* Sécante 1 : H (en haut) → A (sur BE) → D (sur CF) → G (en bas) */}
                    <line x1="130" y1="20" x2="210" y2="260" stroke="black" strokeWidth="2"/>

                    {/* Sécante 2 : passe par A (sur BE) vers bas-droite et haut-gauche */}
                    <line x1="60" y1="20" x2="310" y2="200" stroke="black" strokeWidth="2"/>

                    {/* Points droite BE */}
                    <circle cx="75" cy="100" r="5" fill="#5b6acd"/>
                    <text x="58" y="96" fontSize="13" fill="#5b6acd" fontWeight="bold">B</text>

                    {/* A = intersection sécante1 et droite BE */}
                    <circle cx="152" cy="100" r="5" fill="black"/>
                    <text x="155" y="89" fontSize="13" fill="#333" fontWeight="bold">A</text>

                    <circle cx="245" cy="100" r="5" fill="#5b6acd"/>
                    <text x="250" y="96" fontSize="13" fill="#5b6acd" fontWeight="bold">E</text>

                    {/* H au-dessus de A sur sécante 1 */}
                    <circle cx="138" cy="48" r="5" fill="#5b6acd"/>
                    <text x="143" y="46" fontSize="13" fill="#5b6acd" fontWeight="bold">H</text>

                    {/* Points droite CF */}
                    <circle cx="90" cy="190" r="5" fill="#5b6acd"/>
                    <text x="73" y="187" fontSize="13" fill="#5b6acd" fontWeight="bold">C</text>

                    {/* D = intersection sécante1 et droite CF */}
                    <circle cx="178" cy="190" r="5" fill="black"/>
                    <text x="181" y="183" fontSize="13" fill="#333" fontWeight="bold">D</text>

                    <circle cx="265" cy="190" r="5" fill="#5b6acd"/>
                    <text x="270" y="187" fontSize="13" fill="#5b6acd" fontWeight="bold">F</text>

                    {/* G en bas de sécante 1 */}
                    <circle cx="196" cy="238" r="5" fill="#5b6acd"/>
                    <text x="201" y="252" fontSize="13" fill="#5b6acd" fontWeight="bold">G</text>
                  </svg>
                </div>

                <p className="font-semibold text-base mb-3">① À partir de la figure :</p>
                <div className="ml-5 space-y-2 text-gray-800">
                  <p>• Citer les angles alternes-internes.</p>
                  <p>• Citer les angles correspondants.</p>
                  <p>• Citer deux angles opposés par le sommet.</p>
                  <p>• Citer deux angles supplémentaires.</p>
                  <p>• Citer deux angles adjacents.</p>
                </div>

                <p className="font-semibold text-base mt-6 mb-3">
                  ② Si les droites (BE) et (CF) sont parallèles et B̂AD = 158°, déterminer la mesure de l'angle ÂDF.
                </p>
              </div>

              {/* ── EXERCICE 2 : Parallélogrammes et symétrie ── */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 2</div>

                <p className="font-semibold text-base mb-3">① Répondre par « Vrai » ou « Faux » :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-blue-50 p-4 rounded-lg">
                  <p>a) Le losange possède quatre axes de symétrie. « ...... »</p>
                  <p>b) Le carré possède seulement deux axes de symétrie. « ...... »</p>
                  <p>c) Les axes de symétrie d'un rectangle sont ses diagonales. « ...... »</p>
                  <p>d) Le rectangle possède seulement deux axes de symétrie. « ...... »</p>
                </div>

                <p className="font-semibold text-base mt-6 mb-3">② Compléter par « Parallélogramme / Rectangle / Losange / Carré » :</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border-2 border-gray-800 p-3 text-left">Figure</th>
                        <th className="border-2 border-gray-800 p-3">Parallélogramme ?</th>
                        <th className="border-2 border-gray-800 p-3">Rectangle ?</th>
                        <th className="border-2 border-gray-800 p-3">Losange ?</th>
                        <th className="border-2 border-gray-800 p-3">Carré ?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-800 p-3">Côtés 6 et 4, angles droits</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-800 p-3">Côtés 7 et 3, angle 100°</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-800 p-3">Côtés tous égaux à 5, angles droits</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-800 p-3">Diagonales égales de 6, côtés 3 et 4</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-800 p-3">Côtés tous égaux à 3, diagonales perpendiculaires</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                        <td className="border-2 border-gray-800 p-3 text-center">............</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── EXERCICE 3 : Construction parallélogramme ── */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 3</div>

                <p className="font-semibold text-base mb-4">
                  ① Construire un parallélogramme ABCD tel que : AB = 3 cm, BC = 4 cm et B̂ = 60°.
                </p>

                <p className="font-semibold text-base mb-3">② En justifiant votre réponse, déterminer dans chacun des cas suivants si le quadrilatère ABCD est un parallélogramme ou non :</p>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                    <p className="font-semibold text-center mb-3">1er cas</p>
                    {/* 1er cas : ABCD avec A haut-gauche, B haut-droite, C bas-droite, D bas-gauche
                        angles A=120°, B=60°, C=120°, D=60° — c'est un parallélogramme */}
                    <svg viewBox="0 0 220 170" className="w-full max-w-xs mx-auto mb-3">
                      {/* Forme : côté AB horizontal en haut, D et C décalés vers la droite */}
                      <polygon points="30,50 170,50 190,130 50,130" fill="none" stroke="black" strokeWidth="2"/>
                      <text x="18" y="47" fontSize="12" fontWeight="bold">A</text>
                      <text x="174" y="47" fontSize="12" fontWeight="bold">B</text>
                      <text x="194" y="142" fontSize="12" fontWeight="bold">C</text>
                      <text x="36" y="142" fontSize="12" fontWeight="bold">D</text>
                      {/* Arcs d'angles */}
                      <path d="M 45,50 A 15,15 0 0,1 30,63" fill="none" stroke="black" strokeWidth="1.2"/>
                      <path d="M 170,63 A 15,15 0 0,1 155,50" fill="none" stroke="black" strokeWidth="1.2"/>
                      <path d="M 50,118 A 15,15 0 0,0 64,130" fill="none" stroke="black" strokeWidth="1.2"/>
                      <path d="M 176,130 A 15,15 0 0,0 190,117" fill="none" stroke="black" strokeWidth="1.2"/>
                      <text x="48" y="72" fontSize="11" fill="#333">120°</text>
                      <text x="140" y="72" fontSize="11" fill="#333">60°</text>
                      <text x="55" y="122" fontSize="11" fill="#333">60°</text>
                      <text x="155" y="122" fontSize="11" fill="#333">120°</text>
                    </svg>
                    <p className="text-sm mt-2">Réponse : ..........</p>
                    <p className="text-sm mt-1">Justification :</p>
                    <p className="text-sm text-gray-400">......</p>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                    <p className="font-semibold text-center mb-3">2ème cas</p>
                    {/* 2ème cas : ABCD avec A haut-gauche, B haut-droite, C bas-droite, D bas-gauche
                        angle A=70°, angle D=130° — pas un parallélogramme */}
                    <svg viewBox="0 0 220 170" className="w-full max-w-xs mx-auto mb-3">
                      {/* Forme trapèze : côté AB en haut plus court, base DC plus large */}
                      <polygon points="40,45 175,45 200,135 15,135" fill="none" stroke="black" strokeWidth="2"/>
                      <text x="24" y="42" fontSize="12" fontWeight="bold">A</text>
                      <text x="178" y="42" fontSize="12" fontWeight="bold">B</text>
                      <text x="204" y="147" fontSize="12" fontWeight="bold">C</text>
                      <text x="5" y="147" fontSize="12" fontWeight="bold">D</text>
                      {/* Arc angle A */}
                      <path d="M 55,45 A 15,15 0 0,1 40,58" fill="none" stroke="black" strokeWidth="1.2"/>
                      {/* Arc angle D */}
                      <path d="M 15,122 A 15,15 0 0,0 28,135" fill="none" stroke="black" strokeWidth="1.2"/>
                      <text x="45" y="65" fontSize="11" fill="#333">70°</text>
                      <text x="22" y="120" fontSize="11" fill="#333">130°</text>
                    </svg>
                    <p className="text-sm mt-2">Réponse : ..........</p>
                    <p className="text-sm mt-1">Justification :</p>
                    <p className="text-sm text-gray-400">......</p>
                  </div>
                </div>
              </div>

              {/* ── EXERCICE 4 : Droites parallèles, angle ABC ── */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 4</div>

                <p className="text-gray-800 mb-4 italic">On considère la figure suivante :</p>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-5">
                  {/* Figure corrigée : deux droites parallèles EAF (haut) et HBC (bas),
                      une seule sécante passant par G (haut), A, B, puis vers le bas-gauche
                      angle GAF = 30° en A, angle HBA = 150° en B */}
                  <svg viewBox="0 0 340 240" className="w-full max-w-sm mx-auto">
                    {/* Droite (EAF) horizontale supérieure */}
                    <line x1="20" y1="80" x2="310" y2="80" stroke="black" strokeWidth="2"/>
                    {/* Droite (HBC) horizontale inférieure */}
                    <line x1="20" y1="165" x2="310" y2="165" stroke="black" strokeWidth="2"/>

                    {/* Sécante : de G (haut-droite) passant par A puis B puis sortant en bas-gauche */}
                    {/* G est en haut à droite, la sécante descend vers gauche passant par A puis B */}
                    <line x1="270" y1="15" x2="80" y2="220" stroke="black" strokeWidth="2"/>

                    {/* Points droite EAF */}
                    <circle cx="95" cy="80" r="5" fill="#5b6acd"/>
                    <text x="78" y="76" fontSize="13" fill="#5b6acd" fontWeight="bold">E</text>

                    {/* A = intersection sécante et droite EAF */}
                    <circle cx="197" cy="80" r="5" fill="black"/>
                    <text x="202" y="70" fontSize="13" fill="#333" fontWeight="bold">A</text>

                    <circle cx="275" cy="80" r="5" fill="#5b6acd"/>
                    <text x="280" y="76" fontSize="13" fill="#5b6acd" fontWeight="bold">F</text>

                    {/* G au-dessus de A sur la sécante */}
                    <circle cx="242" cy="32" r="5" fill="#5b6acd"/>
                    <text x="248" y="30" fontSize="13" fill="#5b6acd" fontWeight="bold">G</text>

                    {/* Points droite HBC */}
                    <circle cx="80" cy="165" r="5" fill="#5b6acd"/>
                    <text x="60" y="161" fontSize="13" fill="#5b6acd" fontWeight="bold">H</text>

                    {/* B = intersection sécante et droite HBC */}
                    <circle cx="152" cy="165" r="5" fill="black"/>
                    <text x="157" y="158" fontSize="13" fill="#333" fontWeight="bold">B</text>

                    <circle cx="245" cy="165" r="5" fill="#5b6acd"/>
                    <text x="250" y="161" fontSize="13" fill="#5b6acd" fontWeight="bold">C</text>

                    {/* Angle 30° à A (entre sécante descendant vers B et direction AF→droite) */}
                    <path d="M 215,80 A 18,18 0 0,1 205,66" fill="none" stroke="black" strokeWidth="1.2"/>
                    <text x="210" y="100" fontSize="12" fill="#333">30°</text>

                    {/* Angle 150° à B (angle entre HB← et sécante descendant depuis A) */}
                    <path d="M 130,165 A 18,18 0 0,1 140,150" fill="none" stroke="black" strokeWidth="1.2"/>
                    <text x="100" y="158" fontSize="12" fill="#333">150°</text>
                  </svg>
                </div>

                <p className="font-semibold text-base mb-3">
                  ① Calculer la mesure de l'angle ÂBC.
                </p>
                <div className="ml-5 space-y-1 text-gray-400 text-sm mb-5">
                  <p>......</p>
                  <p>......</p>
                </div>

                <p className="font-semibold text-base mb-3">
                  ② Montrer que (EF) ∥ (HC) puis déduire que G̃AF = ÃBC.
                </p>
                <div className="ml-5 space-y-1 text-gray-400 text-sm">
                  <p>......</p>
                  <p>......</p>
                  <p>......</p>
                </div>
              </div>

              {/* ── EXERCICE 5 : Triangle rectangle, symétrique, losange ── */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 5</div>

                <p className="text-gray-800 mb-4">Sur la figure ci-dessous, ABC est un triangle rectangle en A. I est le milieu de [BC].</p>

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-5">
                  <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto">
                    {/* Triangle rectangle en A */}
                    <polygon points="70,160 70,40 230,160" fill="none" stroke="black" strokeWidth="2"/>
                    {/* Angle droit en A */}
                    <polyline points="70,145 85,145 85,160" fill="none" stroke="black" strokeWidth="1.5"/>
                    {/* Points */}
                    <circle cx="70" cy="160" r="5" fill="black"/>
                    <text x="56" y="175" fontSize="13" fill="#333" fontWeight="bold">A</text>
                    <circle cx="230" cy="160" r="5" fill="black"/>
                    <text x="235" y="175" fontSize="13" fill="#333" fontWeight="bold">B</text>
                    <circle cx="70" cy="40" r="5" fill="black"/>
                    <text x="55" y="38" fontSize="13" fill="#333" fontWeight="bold">C</text>
                    {/* Point I milieu de BC */}
                    <circle cx="150" cy="100" r="4" fill="black"/>
                    <text x="158" y="98" fontSize="13" fill="#333" fontStyle="italic">I</text>
                    {/* Marques de milieu */}
                    <line x1="135" y1="85" x2="145" y2="95" stroke="black" strokeWidth="2"/>
                    <line x1="140" y1="80" x2="150" y2="90" stroke="black" strokeWidth="2"/>
                    <line x1="153" y1="108" x2="163" y2="118" stroke="black" strokeWidth="2"/>
                    <line x1="158" y1="103" x2="168" y2="113" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>

                <p className="font-semibold text-base mb-3">① :</p>
                <div className="ml-5 space-y-3 text-gray-800">
                  <p>a) Sur la figure ci-dessus, construire le point D le symétrique de A par rapport à I.</p>
                  <p>b) Prouver que ABDC est un parallélogramme, puis déduire sa nature.</p>
                </div>

                <p className="font-semibold text-base mt-6 mb-3">② :</p>
                <div className="ml-5 space-y-3 text-gray-800">
                  <p>a) Construire les points F et G les symétriques respectifs de B et C par rapport à A.</p>
                  <p>b) Prouver que le quadrilatère FCBG est un losange.</p>
                </div>
              </div>

            </div>{/* fin space-y-8 */}

            {/* Consignes */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises et soignées</li>
                <li>Utiliser les instruments de géométrie appropriés (règle, compas, équerre, rapporteur)</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>

          </div>
        </div>
      );
    }

    // ── Liste devoirs 2ème année ────────────────────────────────────────────────
    if (homeworkView === '2apic-list') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📚 Devoirs - 2ème Année APIC</h1>
            <div className="space-y-4 mb-8">
              <button onClick={() => setHomeworkView('2apic-devoir1')} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-2xl font-bold mb-2">📝 Devoir N°1 — Semestre 2</div>
                <div className="text-sm opacity-90">Inégalités · Encadrements · Équations · Développer · Factoriser</div>
              </button>
              <button onClick={() => setHomeworkView('2apic-devoir2')} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-2xl font-bold mb-2">📐 Devoir N°2</div>
                <div className="text-sm opacity-90">Géométrie du Triangle et Milieux</div>
              </button>
              <button onClick={() => setHomeworkView('2apic-devoir3')} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-2xl font-bold mb-2">🧮 Devoir N°3</div>
                <div className="text-sm opacity-90">Puissances et Calculs</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setHomeworkView('selection')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-2" /> Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ── DEVOIR N°1 — SEMESTRE 2 — 2ÈME ANNÉE ─────────────────────────────────
    if (homeworkView === '2apic-devoir1') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°1 — Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-1">2ème Année APIC — Semestre 2</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal — Salé</p>
              <p className="text-lg font-semibold text-gray-700">Année Scolaire 2024-2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" /> Imprimer
                </button>
                <button onClick={() => setHomeworkView('2apic-list')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Retour
                </button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 1</div>
                <p className="font-semibold mb-3">① Compléter par &gt; ou &lt; :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-blue-50 p-4 rounded-lg">
                  <p>−10 ... −20 ... −34,91 ... −34,90</p>
                </div>
                <p className="font-semibold mt-6 mb-3">② Comparer les nombres suivants :</p>
                <div className="ml-5 text-gray-800 bg-green-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-mono text-lg">41/42</span> et <span className="font-mono text-lg">42/43</span>
                    &nbsp;&nbsp; ; &nbsp;&nbsp;
                    <span className="font-mono text-lg">−41/−42</span> et <span className="font-mono text-lg">−42/−43</span>
                  </p>
                </div>
                <p className="font-semibold mt-6 mb-3">③ Répondre par vrai ou faux :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-yellow-50 p-4 rounded-lg">
                  <p>• Si x ≤ 2 alors 7x ≤ 15</p>
                  <p>• Si x ≤ 13 alors 3x − 8 ≤ 20</p>
                  <p>• Si x ≤ 9 alors 8 + x ≤ 15</p>
                </div>
                <p className="font-semibold mt-6 mb-3">④ Soit u un nombre rationnel :</p>
                <div className="ml-5 space-y-4 text-gray-800">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">① Sachant que :</p>
                    <p className="text-center text-lg font-mono mb-2">11 ≤ 3u + 8 ≤ 26</p>
                    <p>Montrer que <strong>1 ≤ u ≤ 6</strong></p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">② Donner un encadrement de :</p>
                    <p className="text-center text-lg font-mono">6u + 16</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">③ Comparer a et b dans les cas suivants :</p>
                    <div className="space-y-1 ml-4">
                      <p>• a − b = 7</p>
                      <p>• a − b = −7</p>
                      <p>• a − b &gt; 1/3</p>
                      <p>• a − b ≤ −1/3</p>
                    </div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">④ Comparer a² + b² et 2ab.</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 2</div>
                <p className="font-semibold mb-3">① Résoudre les équations suivantes :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-blue-50 p-4 rounded-lg font-mono">
                  <p>4x + 6 = 2</p>
                  <p>−2x − 9 = 13</p>
                  <p>−28x / 7 = 14</p>
                  <p>(x − 1)/2 = (x + 1)/3</p>
                </div>
                <p className="font-semibold mt-6 mb-3">② Résoudre le problème :</p>
                <div className="ml-5 text-gray-800 bg-yellow-50 p-4 rounded-lg">
                  <p className="mb-2">Jamal et Omar partagent la somme de <strong>5 000 DH</strong>.</p>
                  <p className="mb-2">Jamal et Omar ont dépensé respectivement <strong>3/5</strong> et <strong>4/7</strong> de leur part.</p>
                  <p className="mb-2">Sachant qu'ils ont épargné la <strong>même somme d'argent</strong>,</p>
                  <p className="font-semibold">déterminer la somme de départ de chacun d'entre eux.</p>
                  <p className="mt-3 text-sm text-gray-600 italic">Poser x la part de l'un d'eux et former une équation.</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-5 rounded">Exercice 3</div>
                <p className="font-semibold mb-3">① Développer :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-green-50 p-4 rounded-lg">
                  <p>(3n − 1)(n + 2)</p>
                  <p>(n − 1) × 2n</p>
                  <p>(n + 3)²</p>
                  <p>(2x − 1)²</p>
                  <p>(x + 5)(5 − x)</p>
                </div>
                <p className="font-semibold mt-6 mb-3">② Factoriser :</p>
                <div className="ml-5 space-y-2 text-gray-800 bg-purple-50 p-4 rounded-lg">
                  <p>(n + 1)² − 2(n + 1)</p>
                  <p>n² − 2n + 1</p>
                  <p>9x² − 49</p>
                  <p>x² − x</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Rédiger clairement les étapes de résolution des équations</li>
                <li>Pour le problème, poser l'inconnue et écrire l'équation avant de résoudre</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // ── DEVOIR N°2 — 2ÈME ANNÉE ───────────────────────────────────────────────
    if (homeworkView === '2apic-devoir2') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°2 - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Année 2024-2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setHomeworkView('2apic-list')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <h2 className="text-2xl font-bold text-blue-800">📐 Géométrie du Triangle et Milieux</h2>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1 : Cercle circonscrit et Angles</div>
                <div className="space-y-3">
                  <p><strong>1.</strong> Tracer un triangle MNP tel que M̂NP = 30°, M̂PN = 80° et NP = 5 cm.</p>
                  <p><strong>2.</strong> Calculer la mesure de l'angle N̂MP.</p>
                  <p><strong>3.</strong> Construire le point O, centre du cercle circonscrit au triangle MNP.</p>
                  <p><strong>4.</strong> Calculer la mesure de l'angle au centre P̂ON.</p>
                  <p><strong>5.</strong> Construire le point A milieu de [MP] et le point B milieu de [MN].</p>
                  <p><strong>6.</strong> Calculer la distance AB.</p>
                  <p><strong>7.</strong> Construire le point G, centre de gravité du triangle MNP.</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2 : Symétrie et Médianes</div>
                <div className="space-y-3">
                  <p>Soit OMN un triangle tel que OM = 7,5 cm.</p>
                  <p className="mt-3"><strong>1.</strong> Soit A le symétrique de N par rapport au point M.</p>
                  <p className="mt-3"><strong>2.</strong> La médiane du triangle ACN issue de A coupe [CM] au point H.</p>
                  <div className="ml-6 space-y-2 mt-2">
                    <p><strong>a)</strong> Construire une figure précise.</p>
                    <p><strong>b)</strong> Que représente la droite (OM) pour le triangle ACN ? Justifier.</p>
                    <p><strong>c)</strong> Que représente le point H pour le triangle ACN ? Justifier.</p>
                    <p><strong>d)</strong> Calculer la longueur CH.</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3 : Propriétés des quadrilatères</div>
                <div className="space-y-3">
                  <p>Soit ABCD un quadrilatère quelconque. On note I, J, K et L les milieux respectifs des segments [AB], [BC], [CD] et [DA].</p>
                  <p className="mt-3"><strong>1.</strong> Construire la figure.</p>
                  <p><strong>2.</strong> Démontrer que le quadrilatère IJKL est un parallélogramme.</p>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300 mt-8">
                <h2 className="text-2xl font-bold text-orange-800">🥖 Applications pratiques et Constructions</h2>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4 : Le problème de la baguette (Thalès)</div>
                <div className="space-y-3">
                  <p className="font-semibold">Situation :</p>
                  <p>Vous avez une baguette de pain [AB]. Vous devez la partager en 7 morceaux égaux pour 7 personnes.</p>
                  <p className="font-semibold mt-3">Contrainte :</p>
                  <p>Vous n'avez pas de règle graduée. Vous disposez uniquement d'une règle non graduée, d'un compas et d'une équerre.</p>
                  <p className="font-semibold mt-3">Mission :</p>
                  <p>Expliquer et tracer la construction géométrique permettant de trouver les 6 points de coupe exacts.</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 5 : Triangle Isocèle</div>
                <div className="space-y-3">
                  <p><strong>1.</strong> Construire un triangle ABC isocèle en A tel que l'angle au sommet B̂AC = 80°.</p>
                  <p><strong>2.</strong> Construire le cercle circonscrit à ce triangle ABC.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises et soignées</li>
                <li>Utilisez les instruments de géométrie appropriés</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // ── DEVOIR N°3 — 2ÈME ANNÉE ───────────────────────────────────────────────
    if (homeworkView === '2apic-devoir3') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°3 - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setHomeworkView('2apic-list')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <h2 className="text-2xl font-bold text-purple-800">🧮 Puissances et Calculs</h2>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-3">Calculer selon la méthode :</p>
                  <div className="space-y-3 ml-4">
                    <p>(-4)³ = (-4)² × (-4) = ... × ... = ...</p>
                    <p>(-27)⁻¹ :: [(-6)/7]⁻² :: [(2/8)]⁴ :: [(-23)/14]⁰</p>
                    <p>x = [(9/4)]⁻² · [(1/3)]⁴</p>
                    <p>z = (-0,5)⁸⁷ × 2⁸⁷ :: z = (-4)¹³ + (8¹¹/2³³)</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-3">Écrire sous la forme a<sup>n</sup> :</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <p className="font-mono">[(12/7)²]³</p>
                      <p className="font-mono">E² × 15 × 15⁻² = a<sup>n</sup>/b<sup>m</sup></p>
                      <p className="font-mono">[15²⁰ × (15 × 2¹¹)²] / [(6⁵)³ × 6⁻²]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Simplifier les résultats au maximum</li>
                <li>Écrire les puissances clairement</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  // ─── SECTION TESTS DIAGNOSTIQUES ─────────────────────────────────────────────
  if (currentView === 'diagnostic') {
    if (diagnosticView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">🎯 Tests Diagnostiques de Fin de Semestre</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => setDiagnosticView('1apic')} className="bg-gradient-to-r from-orange-500 to-red-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Test Diagnostique</div>
              </button>
              <button onClick={() => setDiagnosticView('2apic')} className="bg-gradient-to-r from-pink-500 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Test Diagnostique</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('menu')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Home className="w-5 h-5 mr-2" /> Retour au Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (diagnosticView === '1apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Fin de Semestre</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Durée : 1 heure - Barème : /20 points</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setDiagnosticView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <p className="font-bold text-center">Nom : .................... Prénom : ....................</p>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1 : Calcul d'expressions (4 points)</div>
                <div className="space-y-3 ml-4">
                  <p>1. A = 130 + 110 − 240 = ______________</p>
                  <p>2. B = 18 × 20 ÷ 60 = ______________</p>
                  <p>3. C = (50 + 10) × 5 − 150 = ______________</p>
                  <p>4. D = 20 + 12 × 3 − 24 ÷ 4 = ______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2 : Calcul et simplification (5 points)</div>
                <div className="space-y-3 ml-4">
                  <p>1. I = 2/5 + 1/5 = ______________</p>
                  <p>2. J = 4/7 − 1/7 = ______________</p>
                  <p>3. K = 2/5 × 6/7 = ______________</p>
                  <p>4. L = 3/8 + 1/2 = ______________</p>
                  <p>5. M = 4/9 − 3/5 = ______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3 : Droite graduée et fractions (4 points)</div>
                <div className="space-y-4">
                  <p>1) Placer les fractions sur la droite : A = 1/3 ; B = 2/3 ; C = 4/3 ; D = 5/3</p>
                  <div className="my-4 flex justify-center">
                    <div className="inline-flex border-2 border-gray-800">
                      {[0, 1, 2, 3, 4].map((i) => (<div key={i} className="w-16 h-12 border-r-2 border-gray-800 last:border-r-0"></div>))}
                    </div>
                  </div>
                  <p className="text-center text-sm">0 _____________________ 1</p>
                  <p className="mt-4">2) Ordre croissant : 1/4, 7/12, 5/6, 1/1</p>
                  <p className="ml-4">Réponse : ______________</p>
                  <p className="mt-4">3) Compléter avec {'<, >, ou ='} :</p>
                  <div className="ml-4 space-y-2">
                    <p>a) 2/6 ___ 3/5</p>
                    <p>b) 3/4 ___ 8/10</p>
                    <p>c) 1/10 ___ 2/5</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4 : Problème (5 points)</div>
                <div className="space-y-3">
                  <p>Karim a une corde de 10,4 m. Il utilise 2/7 pour les plantes, puis coupe 2,5 m.</p>
                  <p className="ml-4">1) Longueur pour les plantes ? Réponse : _______________</p>
                  <p className="ml-4">2) Longueur totale utilisée ? Réponse : _______________</p>
                  <p className="ml-4">3) Longueur restante ? Réponse : _______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 5 : Droites remarquables du triangle (4 points)</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> Soit ABC un triangle. Construire :</p>
                  <div className="ml-4 space-y-2">
                    <p>a) La médiatrice du segment [AB]</p>
                    <p>b) La hauteur issue de C</p>
                    <p>c) La médiane issue de A</p>
                    <p>d) La bissectrice de l'angle B̂</p>
                  </div>
                  <p className="mt-4"><strong>2)</strong> Le point d'intersection des médiatrices s'appelle : _______________</p>
                  <p><strong>3)</strong> Le point d'intersection des médianes s'appelle : _______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Bonus : Simplifier et calculer (2 points)</div>
                <div className="space-y-2 text-center">
                  <p className="text-xl mt-3">2 / (2 + 2/(2 + 2/4))</p>
                  <p className="mt-3">Réponse : ______________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (diagnosticView === '2apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Fin de Semestre</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Durée : 1h30 - Barème : /20 points</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setDiagnosticView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <p className="font-bold text-center">Nom : .................... Prénom : ....................</p>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1 : Écriture scientifique (4 points)</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> On calcule : 5² × (15)⁴ × (−1)⁷²</p>
                  <p className="ml-4">Calcul : _______________</p>
                  <p className="mt-4"><strong>2)</strong> On écrit en écriture scientifique :</p>
                  <p className="ml-4">26 × 10⁶ × 2026 × 10⁴ = _______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2 : Géométrie (6 points)</div>
                <div className="space-y-4">
                  <p><strong>1)</strong> Peut-on construire le triangle ABC tel que AB = 3 ; AC = 4 et BC = 5 ?</p>
                  <p className="ml-4">Réponse : _______________</p>
                  <p className="mt-4"><strong>2)</strong> Construire le triangle ABC tel que AB = 3 ; AC = 4 et BC = 5.</p>
                  <p className="mt-4"><strong>3)</strong> Construire le cercle inscrit et circonscrit à ABC.</p>
                  <p className="mt-4"><strong>4)</strong> Compléter le tableau :</p>
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full border-2 border-gray-800">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border-2 border-gray-800 p-2">Â</th>
                          <th className="border-2 border-gray-800 p-2">B̂</th>
                          <th className="border-2 border-gray-800 p-2">Ĉ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-2 border-gray-800 p-2">90°</td>
                          <td className="border-2 border-gray-800 p-2">60°</td>
                          <td className="border-2 border-gray-800 p-2"></td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-800 p-2">92°</td>
                          <td className="border-2 border-gray-800 p-2"></td>
                          <td className="border-2 border-gray-800 p-2">80°</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4"><strong>5)</strong> 120° et 60° sont deux angles...</p>
                  <p className="ml-4">Réponse : _______________</p>
                  <p className="mt-4"><strong>6)</strong> 40° et 50° sont deux angles...</p>
                  <p className="ml-4">Réponse : _______________</p>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3 : Droites remarquables (4 points)</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> Soit DEF un triangle. Construire :</p>
                  <div className="ml-4 space-y-2">
                    <p>a) La médiatrice du segment [DE]</p>
                    <p>b) La hauteur issue de F</p>
                    <p>c) La médiane issue de D</p>
                    <p>d) La bissectrice de l'angle Ê</p>
                  </div>
                  <p className="mt-4"><strong>2)</strong> Compléter :</p>
                  <div className="ml-4 space-y-2">
                    <p>• Le centre du cercle circonscrit est l'intersection des _______________</p>
                    <p>• Le centre de gravité est l'intersection des _______________</p>
                    <p>• Le centre du cercle inscrit est l'intersection des _______________</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4 : Théorème de Thalès (6 points)</div>
                <div className="space-y-3">
                  <p><strong>Situation :</strong> Sur la figure ci-dessous, les droites (BC) et (MN) sont parallèles.</p>
                  <p>On donne : AB = 4 cm ; AM = 3 cm ; AC = 6 cm ; BC = 5 cm</p>
                  <div className="bg-blue-50 p-4 rounded-lg mt-3">
                    <p><strong>1)</strong> Calculer AN en utilisant le théorème de Thalès.</p>
                    <p className="ml-4 mt-2">Réponse : _______________</p>
                    <p className="mt-3"><strong>2)</strong> Calculer MN.</p>
                    <p className="ml-4 mt-2">Réponse : _______________</p>
                    <p className="mt-3"><strong>3)</strong> Les triangles ABC et AMN sont-ils semblables ? Justifier.</p>
                    <p className="ml-4 mt-2">Réponse : _______________</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p><strong>Application :</strong></p>
                    <p>Un arbre projette une ombre de 12 m. Au même moment, un bâton de 1,5 m projette une ombre de 2 m.</p>
                    <p className="mt-2"><strong>4)</strong> Quelle est la hauteur de l'arbre ?</p>
                    <p className="ml-4 mt-2">Réponse : _______________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // ─── SECTION OLYMPIADES ───────────────────────────────────────────────────────
  if (currentView === 'olympiads') {
    if (olympiadView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">🏆 Olympiades Mathématiques</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => setOlympiadView('1apic')} className="bg-gradient-to-r from-yellow-500 to-amber-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Exercices Olympiades</div>
              </button>
              <button onClick={() => setOlympiadView('2apic')} className="bg-gradient-to-r from-amber-500 to-orange-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Exercices Olympiades</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('menu')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Home className="w-5 h-5 mr-2" /> Retour au Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (olympiadView === '1apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Olympiades Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setOlympiadView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">🧩 Exercice 1 : Le carré magique</div>
                <div className="space-y-3">
                  <p>Compléter le carré magique suivant où chaque ligne, colonne et diagonale a la même somme :</p>
                  <div className="overflow-x-auto my-4 flex justify-center">
                    <table className="border-2 border-gray-800">
                      <tbody>
                        <tr>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center font-bold">8</td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center"></td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center">6</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center"></td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center font-bold">5</td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center"></td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center">4</td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center"></td>
                          <td className="border-2 border-gray-800 p-4 w-16 h-16 text-center font-bold">2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="font-semibold">La somme magique est : _______________</p>
                </div>
              </div>
              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">🎯 Exercice 2 : Le problème des âges</div>
                <div className="space-y-3">
                  <p>Ahmed dit à son père : "Dans 3 ans, ton âge sera le triple du mien."</p>
                  <p>Le père répond : "Il y a 3 ans, mon âge était le quintuple du tien."</p>
                  <p className="mt-4"><strong>Question :</strong> Quels sont leurs âges actuels ?</p>
                  <div className="mt-4 bg-white p-4 rounded">
                    <p>Âge actuel d'Ahmed : _______________</p>
                    <p>Âge actuel du père : _______________</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">🔢 Exercice 3 : Suite logique</div>
                <div className="space-y-4">
                  <p>Trouver le nombre manquant dans chaque suite :</p>
                  <div className="ml-4 space-y-3">
                    <p><strong>a)</strong> 2, 5, 10, 17, ___, 37</p>
                    <p><strong>b)</strong> 1, 1, 2, 3, 5, 8, ___, 21</p>
                    <p><strong>c)</strong> 3, 6, 12, 24, ___, 96</p>
                    <p><strong>d)</strong> 100, 81, 64, ___, 36, 25</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">🍎 Exercice 4 : Le marchand de fruits</div>
                <div className="space-y-3">
                  <p>Un marchand a des pommes et des oranges. Il sait que :</p>
                  <div className="ml-4 space-y-2">
                    <p>• 3 pommes + 2 oranges coûtent 24 DH</p>
                    <p>• 2 pommes + 3 oranges coûtent 26 DH</p>
                  </div>
                  <p className="mt-4"><strong>Questions :</strong></p>
                  <div className="ml-4 space-y-2">
                    <p>1) Quel est le prix d'une pomme ? _______________</p>
                    <p>2) Quel est le prix d'une orange ? _______________</p>
                    <p>3) Combien coûtent 5 pommes et 5 oranges ? _______________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (olympiadView === '2apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Olympiades Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Printer className="w-4 h-4 mr-2" />Imprimer</button>
                <button onClick={() => setOlympiadView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"><ChevronLeft className="w-4 h-4 mr-2" />Retour</button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">🧩 Exercice 1 : Le triangle de nombres</div>
                <div className="space-y-3">
                  <p>Compléter le triangle suivant où chaque nombre est la somme des deux nombres au-dessus :</p>
                  <div className="my-4 text-center space-y-2 font-mono">
                    <p>1</p>
                    <p>2 ___ 3</p>
                    <p>4 ___ ___ 7</p>
                    <p>___ 13 ___ ___ 18</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">💎 Exercice 2 : Le défi des puissances</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> Simplifier : (2²⁰²⁴ × 2²⁰²⁵) / 2²⁰²³</p>
                  <p className="ml-4">Réponse : _______________</p>
                  <p className="mt-3"><strong>2)</strong> Trouver le dernier chiffre de 7²⁰²⁴</p>
                  <p className="ml-4">Réponse : _______________</p>
                  <p className="mt-3"><strong>3)</strong> Sans calculatrice, lequel est le plus grand : 2³⁰⁰ ou 3²⁰⁰ ?</p>
                  <p className="ml-4">Réponse : _______________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // ─── SECTION QCM ─────────────────────────────────────────────────────────────
  if (currentView === 'qcm') {
    if (qcmView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📝 QCM - Quiz Interactifs</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => { setQcmView('1apic'); setQcmAnswers({}); setShowResults(false); }} className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">QCM Interactif</div>
              </button>
              <button onClick={() => { setQcmView('2apic'); setQcmAnswers({}); setShowResults(false); }} className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">QCM Interactif</div>
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setCurrentView('menu')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Home className="w-5 h-5 mr-2" /> Retour au Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    const qcm1Questions = [
      { id: 1, question: "Quel est le résultat de 125 + 75 - 50 ?", options: ["100", "150", "200", "250"], correct: 1 },
      { id: 2, question: "Combien font 3/4 + 1/4 ?", options: ["4/8", "4/4", "1/2", "2/4"], correct: 1 },
      { id: 3, question: "La somme des angles d'un triangle vaut :", options: ["90°", "180°", "360°", "270°"], correct: 1 },
      { id: 4, question: "Quel est le résultat de (-5)² ?", options: ["-25", "25", "-10", "10"], correct: 1 },
      { id: 5, question: "Le périmètre d'un carré de côté 5 cm est :", options: ["10 cm", "15 cm", "20 cm", "25 cm"], correct: 2 },
      { id: 6, question: "Quelle fraction est équivalente à 2/3 ?", options: ["3/4", "4/6", "5/6", "1/3"], correct: 1 },
      { id: 7, question: "Le point d'intersection des médianes d'un triangle s'appelle :", options: ["Centre du cercle circonscrit", "Centre de gravité", "Orthocentre", "Centre du cercle inscrit"], correct: 1 },
      { id: 8, question: "Combien font 2³ ?", options: ["6", "8", "9", "12"], correct: 1 },
      { id: 9, question: "L'aire d'un rectangle de longueur 8 cm et largeur 5 cm est :", options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"], correct: 2 },
      { id: 10, question: "Un triangle qui a un angle de 90° s'appelle :", options: ["Triangle équilatéral", "Triangle isocèle", "Triangle rectangle", "Triangle quelconque"], correct: 2 }
    ];

    const qcm2Questions = [
      { id: 1, question: "Quel est le résultat de (-3)³ ?", options: ["-27", "27", "-9", "9"], correct: 0 },
      { id: 2, question: "L'écriture scientifique de 45000 est :", options: ["4,5 × 10³", "45 × 10³", "4,5 × 10⁴", "0,45 × 10⁵"], correct: 2 },
      { id: 3, question: "Si deux droites sont parallèles à une même troisième droite, alors elles sont :", options: ["Perpendiculaires", "Sécantes", "Parallèles entre elles", "Confondues"], correct: 2 },
      { id: 4, question: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à :", options: ["La somme des deux autres côtés", "La somme des carrés des deux autres côtés", "Le produit des deux autres côtés", "La différence des carrés des deux autres côtés"], correct: 1 },
      { id: 5, question: "Le théorème de Thalès permet de calculer :", options: ["Des angles", "Des longueurs dans des triangles semblables", "Des aires", "Des volumes"], correct: 1 },
      { id: 6, question: "Combien font 2⁻³ ?", options: ["-8", "1/8", "-6", "6"], correct: 1 },
      { id: 7, question: "Le centre du cercle inscrit d'un triangle est l'intersection :", options: ["Des médiatrices", "Des médianes", "Des hauteurs", "Des bissectrices"], correct: 3 },
      { id: 8, question: "Si AB = 6 cm, AC = 8 cm et BC = 10 cm, le triangle ABC est :", options: ["Équilatéral", "Isocèle", "Rectangle", "Quelconque"], correct: 2 },
      { id: 9, question: "Quel est le résultat de (3²)³ ?", options: ["3⁵", "3⁶", "9³", "27"], correct: 1 },
      { id: 10, question: "La médiane issue d'un sommet d'un triangle relie ce sommet :", options: ["Au pied de la hauteur", "Au milieu du côté opposé", "Au centre du cercle circonscrit", "À l'orthocentre"], correct: 1 },
      { id: 11, question: "Combien font 5⁰ ?", options: ["0", "1", "5", "Impossible"], correct: 1 },
      { id: 12, question: "Dans un triangle, si deux angles mesurent 60° chacun, le troisième mesure :", options: ["30°", "60°", "90°", "120°"], correct: 1 }
    ];

    const renderQCM = (questions, accentColor) => {
      const handleAnswer = (questionId, optionIndex) => {
        setQcmAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
      };
      const score = showResults ? questions.filter(q => qcmAnswers[q.id] === q.correct).length : 0;
      const percentage = showResults ? (score / questions.length * 100).toFixed(0) : 0;

      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 QCM Interactif</h1>
              <p className="text-sm text-gray-500">{questions.length} questions · Cochez la bonne réponse</p>
              <div className="mt-4 flex justify-center no-print">
                <button onClick={() => { setQcmView('selection'); setQcmAnswers({}); setShowResults(false); }} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Retour
                </button>
              </div>
            </div>

            {showResults && (
              <div className={`mb-6 p-6 rounded-lg border-2 ${percentage >= 80 ? 'bg-green-50 border-green-400' : percentage >= 60 ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'}`}>
                <h2 className="text-2xl font-bold text-center mb-2">Résultat : {score}/{questions.length}</h2>
                <p className="text-xl text-center font-semibold">Score : {percentage}%</p>
                <p className="text-center mt-2">{percentage >= 80 ? '🎉 Excellent travail !' : percentage >= 60 ? '👍 Bon travail, continue !' : '💪 Continue à t\'entraîner !'}</p>
              </div>
            )}

            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-bold text-lg mb-4">Question {q.id} : {q.question}</h3>
                  <div className="space-y-3">
                    {q.options.map((option, index) => {
                      const isSelected = qcmAnswers[q.id] === index;
                      const isCorrect = index === q.correct;
                      return (
                        <button key={index} onClick={() => !showResults && handleAnswer(q.id, index)} disabled={showResults}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResults ? isCorrect ? 'bg-green-100 border-green-500 font-semibold' : isSelected ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300' : isSelected ? `bg-${accentColor}-100 border-${accentColor}-500` : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option}
                          {showResults && isCorrect && <span className="ml-2">✓</span>}
                          {showResults && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              {!showResults ? (
                <button onClick={() => setShowResults(true)} className="px-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg">Voir mes résultats</button>
              ) : (
                <button onClick={() => { setQcmAnswers({}); setShowResults(false); }} className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">Recommencer le QCM</button>
              )}
            </div>
          </div>
        </div>
      );
    };

    if (qcmView === '1apic') return renderQCM(qcm1Questions, 'purple');
    if (qcmView === '2apic') return renderQCM(qcm2Questions, 'indigo');
  }

  return null;
};

export default MathApp;
