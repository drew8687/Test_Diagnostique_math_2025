import React, { useState } from 'react';
import { ChevronLeft, Home, BookOpen, Printer } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');

  const handlePrint = () => {
    window.print();
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
          <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            <button 
              onClick={() => {
                setCurrentView('homework');
                setHomeworkView('selection');
              }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-green-200 hover:border-green-400"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Devoirs</h2>
              <p className="text-gray-600">Consulter et imprimer les devoirs</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'homework') {
    if (homeworkView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📚 Devoirs à Domicile</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => setHomeworkView('1apic-list')}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Voir les devoirs</div>
              </button>

              <button 
                onClick={() => setHomeworkView('2apic-list')}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Voir les devoirs</div>
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => {
                  setCurrentView('menu');
                  setHomeworkView('selection');
                }}
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

    if (homeworkView === '1apic-devoir3') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Exercices de puissance N°3 - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setHomeworkView('1apic-list')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {/* Exercice 1 - Image 1 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-3">Ne pas recopier la figure :</p>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-4">
                    <p className="text-center text-sm text-gray-600 mb-3">Figure : Angles avec sommet O</p>
                    <svg width="400" height="250" viewBox="0 0 400 250" className="mx-auto">
                      {/* Droites formant les angles */}
                      <line x1="50" y1="150" x2="350" y2="150" stroke="#333" strokeWidth="2"/>
                      <line x1="200" y1="150" x2="100" y2="30" stroke="#333" strokeWidth="2"/>
                      <line x1="200" y1="150" x2="150" y2="50" stroke="#333" strokeWidth="2"/>
                      <line x1="200" y1="150" x2="250" y2="50" stroke="#333" strokeWidth="2"/>
                      <line x1="200" y1="150" x2="300" y2="30" stroke="#333" strokeWidth="2"/>
                      
                      {/* Point O */}
                      <circle cx="200" cy="150" r="4" fill="#E53E3E"/>
                      <text x="200" y="170" fontSize="14" fill="#E53E3E" textAnchor="middle" fontWeight="bold">O</text>
                      
                      {/* Labels des droites */}
                      <text x="40" y="155" fontSize="14" fill="#333">L</text>
                      <text x="95" y="25" fontSize="14" fill="#333">K</text>
                      <text x="145" y="45" fontSize="14" fill="#333">J</text>
                      <text x="255" y="45" fontSize="14" fill="#333">I</text>
                      <text x="305" y="25" fontSize="14" fill="#333">H</text>
                      <text x="360" y="155" fontSize="14" fill="#333">F</text>
                      
                      {/* Annotations des angles */}
                      <text x="170" y="100" fontSize="12" fill="#2B6CB0">m°</text>
                      <text x="220" y="100" fontSize="12" fill="#2B6CB0">n°</text>
                    </svg>
                  </div>

                  <p className="mb-3">Étant donné la figure (20) ci-dessus où toutes les droites (OI), (OJ), (OL), (OX) sont sécantes en O.</p>
                  
                  <p className="font-semibold mt-4">Compléter le tableau suivant :</p>
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full border-2 border-gray-800 text-center">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border-2 border-gray-800 p-3 font-bold">i</th>
                          <th className="border-2 border-gray-800 p-3">27°</th>
                          <th className="border-2 border-gray-800 p-3">20°</th>
                          <th className="border-2 border-gray-800 p-3">...</th>
                          <th className="border-2 border-gray-800 p-3">45°</th>
                          <th className="border-2 border-gray-800 p-3">...</th>
                          <th className="border-2 border-gray-800 p-3">60°</th>
                          <th className="border-2 border-gray-800 p-3">57°</th>
                          <th className="border-2 border-gray-800 p-3">60°</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-2 border-gray-800 p-3 font-bold bg-gray-100">Â</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                          <td className="border-2 border-gray-800 p-3">80°</td>
                          <td className="border-2 border-gray-800 p-3">67°</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                          <td className="border-2 border-gray-800 p-3">85°</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                          <td className="border-2 border-gray-800 p-3">60°</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-800 p-3 font-bold bg-gray-100">Ĉ</td>
                          <td className="border-2 border-gray-800 p-3">36°</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                          <td className="border-2 border-gray-800 p-3">52°</td>
                          <td className="border-2 border-gray-800 p-3">43°</td>
                          <td className="border-2 border-gray-800 p-3">57°</td>
                          <td className="border-2 border-gray-800 p-3">60°</td>
                          <td className="border-2 border-gray-800 p-3 bg-yellow-50">...</td>
                          <td className="border-2 border-gray-800 p-3">30°</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Exercice 2 - Image 2 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2 (Figure 2)</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-3">Ne pas recopier la figure :</p>
                  
                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-4">
                    <p className="text-center text-sm text-gray-600 mb-3">Figure : Triangle ABC avec point D</p>
                    <svg width="450" height="280" viewBox="0 0 450 280" className="mx-auto">
                      {/* Triangle principal ABC */}
                      <polygon points="80,250 400,250 250,80" fill="none" stroke="#333" strokeWidth="2"/>
                      
                      {/* Point D et triangle ABD */}
                      <line x1="80" y1="250" x2="120" y2="150" stroke="#333" strokeWidth="2"/>
                      <line x1="120" y1="150" x2="250" y2="80" stroke="#333" strokeWidth="2"/>
                      
                      {/* Angle droit en D */}
                      <rect x="115" y="145" width="10" height="10" fill="none" stroke="#E53E3E" strokeWidth="2"/>
                      
                      {/* Points */}
                      <circle cx="80" cy="250" r="4" fill="#2B6CB0"/>
                      <text x="65" y="270" fontSize="16" fill="#2B6CB0" fontWeight="bold">A</text>
                      
                      <circle cx="400" cy="250" r="4" fill="#2B6CB0"/>
                      <text x="410" y="270" fontSize="16" fill="#2B6CB0" fontWeight="bold">B</text>
                      
                      <circle cx="250" cy="80" r="4" fill="#2B6CB0"/>
                      <text x="255" y="75" fontSize="16" fill="#2B6CB0" fontWeight="bold">C</text>
                      
                      <circle cx="120" cy="150" r="4" fill="#E53E3E"/>
                      <text x="105" y="145" fontSize="16" fill="#E53E3E" fontWeight="bold">D</text>
                      
                      {/* Mesures */}
                      <text x="35" y="200" fontSize="13" fill="#666">20°</text>
                    </svg>
                  </div>

                  <p className="mb-3">ABC est un triangle tel que les angles en A et D sont des angles droits. On a aussi AB = 7 cm et ABD tel que l'angle ABD = 20°.</p>
                  
                  <div className="ml-4 space-y-3 mt-4">
                    <p><strong>1)</strong> Calculer la mesure de l'angle BD̂C en justifiant votre réponse et déduire la valeur de l'angle B̂AC.</p>
                    <p><strong>2)</strong> En déduire la mesure de l'angle ĈAD.</p>
                    <p><strong>3)</strong> Calculer AD.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises</li>
                <li>Compléter le tableau avec soin</li>
                <li>Utiliser les propriétés des angles pour justifier vos réponses</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (homeworkView === '2apic-devoir3') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°3 - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setHomeworkView('2apic-list')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
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
                      <p className="font-mono">E² ×15 × 15⁻² = a<sup>n</sup>/b<sup>m</sup></p>
                      <p className="font-mono">[15²⁰ × (15× 2¹¹)²] / [(6⁵)³ × 6⁻²]</p>
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

    if (homeworkView === '1apic-list') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📚 Devoirs - 1ère Année APIC</h1>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => setHomeworkView('1apic-devoir3')}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-2xl font-bold mb-2">📐 Devoir N°3</div>
                <div className="text-sm opacity-90">Géométrie et Angles</div>
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setHomeworkView('selection')}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (homeworkView === '2apic-list') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📚 Devoirs - 2ème Année APIC</h1>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => setHomeworkView('2apic-devoir2')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-2xl font-bold mb-2">📐 Devoir N°2</div>
                <div className="text-sm opacity-90">Géométrie du Triangle et Constructions</div>
              </button>

              <button 
                onClick={() => setHomeworkView('2apic-devoir3')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-2xl font-bold mb-2">🧮 Devoir N°3</div>
                <div className="text-sm opacity-90">Puissances et Calculs</div>
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setHomeworkView('selection')}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (homeworkView === '2apic-devoir2') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°3 - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Année 2024-2025</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setHomeworkView('selection')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
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
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 5 : Construction complexe (L'orthocentre)</div>
                <div className="space-y-3">
                  <p>En observant la figure ci-jointe (où les angles en K et L sont droits) :</p>
                  <p className="mt-3">Expliquez comment tracer, en utilisant uniquement une règle non graduée, la droite (D) passant par H et perpendiculaire à la droite (BC).</p>
                  <p className="mt-3 italic text-gray-600"><strong>Indice :</strong> Pensez aux hauteurs et à l'orthocentre du triangle HBC.</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 6 : Triangle Isocèle</div>
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
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
};

export default MathApp;
