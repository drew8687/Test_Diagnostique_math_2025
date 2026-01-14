import React, { useState } from 'react';
import { ChevronLeft, Home, BookOpen, Printer, ClipboardCheck } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');
  const [olympiadView, setOlympiadView] = useState('selection');

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
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          </div>
        </div>
      </div>
    );
  }

  // Section DEVOIRS
  if (currentView === 'homework') {
    // ... (tout le code des devoirs reste identique)
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

    // Liste des devoirs 1ère année (reste identique au code original)
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

    // Devoirs 1ère année - devoir 3
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°3 - Mathématiques</h1>
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
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1</div>
                <div className="space-y-4">
                  <div className="mt-6">
                    <p className="font-semibold mb-3">Tableau à compléter : ABC un triangle dans le plan</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-2 border-gray-800">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border-2 border-gray-800 p-2">B̂</th>
                            <th className="border-2 border-gray-800 p-2">27°</th>
                            <th className="border-2 border-gray-800 p-2">20°</th>
                            <th className="border-2 border-gray-800 p-2">...</th>
                            <th className="border-2 border-gray-800 p-2">45°</th>
                            <th className="border-2 border-gray-800 p-2">...</th>
                            <th className="border-2 border-gray-800 p-2">60°</th>
                            <th className="border-2 border-gray-800 p-2">57°</th>
                            <th className="border-2 border-gray-800 p-2">60°</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-2 border-gray-800 p-2 font-semibold">Â</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                            <td className="border-2 border-gray-800 p-2">80°</td>
                            <td className="border-2 border-gray-800 p-2">67°</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                            <td className="border-2 border-gray-800 p-2">85°</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                            <td className="border-2 border-gray-800 p-2">60°</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                          </tr>
                          <tr>
                            <td className="border-2 border-gray-800 p-2 font-semibold">Ĉ</td>
                            <td className="border-2 border-gray-800 p-2">36°</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                            <td className="border-2 border-gray-800 p-2">52°</td>
                            <td className="border-2 border-gray-800 p-2">43°</td>
                            <td className="border-2 border-gray-800 p-2">57°</td>
                            <td className="border-2 border-gray-800 p-2">60°</td>
                            <td className="border-2 border-gray-800 p-2">...</td>
                            <td className="border-2 border-gray-800 p-2">30°</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2</div>
                <div className="space-y-4">
                  <p><strong>1)</strong> ABC est un triangle tel que AB = 5 ; AC = 7 ÂBC=30° Construire ABC.</p>
                  <p><strong>2)</strong> Peut-on construire le triangle ABC dans les cas suivants, justifier la réponse.</p>
                  
                  <div className="ml-4 space-y-2">
                    <p>cas 1: AB=5 ; AC=3 ; BC=4</p>
                    <p>cas 2: AB=2 ; AC=3 ; BC=6</p>
                    <p>cas 3: AB=2 ; AC=3 ; BC=5</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3</div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p><strong>1)</strong> Calculer et simplifier si possible :</p>
                    <div className="ml-4 mt-2 space-y-1">
                      <p>(-3)² ; (-1)³ ; 5⁰ ; (-2)³</p>
                      <p><strong>2)</strong> Déterminer le signe des puissances suivantes :</p>
                      <p>(-10)² ; (-1)² ; ((-1)²)³</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2"><strong>3)</strong> Faire l'écriture scientifique des deux nombres suivants</p>
                    <div className="ml-4 mt-3 space-y-2">
                      <p>(2025)×10² ; (-20,25)×10²</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises</li>
                <li>Compléter les tableaux avec soin</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Devoirs 2ème année - devoir 2
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir N°2 - Mathématiques</h1>
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
                  onClick={() => setHomeworkView('2apic-list')}
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
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Devoirs 2ème année - devoir 3
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

  // Section TESTS DIAGNOSTIQUES
  if (currentView === 'diagnostic') {
    if (diagnosticView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">🎯 Tests Diagnostiques de Fin de Semestre</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => setDiagnosticView('1apic')}
                className="bg-gradient-to-r from-orange-500 to-red-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Test Diagnostique</div>
              </button>

              <button 
                onClick={() => setDiagnosticView('2apic')}
                className="bg-gradient-to-r from-pink-500 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Test Diagnostique</div>
              </button>
            </div>

            <div className="text-center">
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

    // Test Diagnostique 1ère Année
    if (diagnosticView === '1apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Fin de Semestre</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Durée : 1 heure - Barème : /20 points</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setDiagnosticView('selection')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
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
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-12 border-r-2 border-gray-800 last:border-r-0"></div>
                      ))}
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

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés</li>
                <li>Utiliser une copie double</li>
                <li>Écrire lisiblement</li>
                <li>Bien gérer le temps (1 heure)</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Test Diagnostique 2ème Année
    if (diagnosticView === '2apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Fin de Semestre</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold">Année Scolaire 2024-2025</p>
              <p className="text-lg font-semibold">Durée : 1h30 - Barème : /20 points</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setDiagnosticView('selection')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
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

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions doivent être précises</li>
                <li>Utiliser une copie double</li>
                <li>Écrire lisiblement</li>
                <li>Bien gérer le temps (1 heure)</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  // Section OLYMPIADES
  if (currentView === 'olympiads') {
    if (olympiadView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">🏆 Olympiades Mathématiques</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => setOlympiadView('1apic')}
                className="bg-gradient-to-r from-yellow-500 to-amber-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">1ère Année APIC</div>
                <div className="text-lg opacity-90">Exercices Olympiades</div>
              </button>

              <button 
                onClick={() => setOlympiadView('2apic')}
                className="bg-gradient-to-r from-amber-500 to-orange-700 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-bold mb-2">2ème Année APIC</div>
                <div className="text-lg opacity-90">Exercices Olympiades</div>
              </button>
            </div>

            <div className="text-center">
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

    // Olympiades 1ère Année
    if (olympiadView === '1apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Olympiades Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold text-yellow-600">Exercices de Préparation</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setOlympiadView('selection')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="font-bold text-center text-yellow-800">⭐ Ces exercices développent la logique et la créativité mathématique ⭐</p>
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

              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">📐 Exercice 5 : Géométrie créative</div>
                <div className="space-y-3">
                  <p>On découpe un carré en 4 triangles identiques en traçant ses diagonales.</p>
                  <p className="mt-3"><strong>Questions :</strong></p>
                  <div className="ml-4 space-y-2">
                    <p>1) Si le carré a un côté de 8 cm, quelle est l'aire de chaque triangle ?</p>
                    <p className="ml-4">Réponse : _______________</p>
                    <p>2) Combien de façons différentes peut-on recombiner ces 4 triangles pour former un rectangle ?</p>
                    <p className="ml-4">Réponse : _______________</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-yellow-600 rounded-lg p-6 bg-yellow-50">
                <div className="bg-yellow-200 p-3 font-bold text-lg mb-4 rounded">🎲 Exercice 6 : Problème de dés</div>
                <div className="space-y-3">
                  <p>On lance deux dés équilibrés.</p>
                  <p className="mt-3"><strong>Questions :</strong></p>
                  <div className="ml-4 space-y-2">
                    <p>1) Combien y a-t-il de résultats possibles ? _______________</p>
                    <p>2) Combien de façons d'obtenir une somme de 7 ? _______________</p>
                    <p>3) Quelle somme a le plus de chances d'apparaître ? _______________</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Conseils pour les Olympiades :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Prenez le temps de bien comprendre chaque énoncé</li>
                <li>Cherchez des patterns et des régularités</li>
                <li>N'hésitez pas à faire des dessins ou schémas</li>
                <li>Vérifiez toujours vos réponses</li>
                <li>La créativité et la logique sont vos meilleurs outils !</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Olympiades 2ème Année
    if (olympiadView === '2apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Olympiades Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée Collège Mouad Ibn Jabal - Salé</p>
              <p className="text-lg font-semibold text-orange-600">Exercices de Préparation - Niveau Avancé</p>
              
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button 
                  onClick={() => setOlympiadView('selection')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-400 rounded-lg">
              <p className="font-bold text-center text-orange-800">⭐ Exercices avancés pour développer l'esprit mathématique ⭐</p>
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
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">🎯 Exercice 2 : Optimisation</div>
                <div className="space-y-3">
                  <p>Un fermier veut construire un enclos rectangulaire pour ses moutons. Il dispose de 40 mètres de clôture.</p>
                  <p className="mt-3"><strong>Questions :</strong></p>
                  <div className="ml-4 space-y-3">
                    <p>1) Quelles dimensions doit avoir l'enclos pour que l'aire soit maximale ?</p>
                    <p className="ml-4">Longueur : _______________ Largeur : _______________</p>
                    <p>2) Quelle sera cette aire maximale ? _______________</p>
                    <p>3) Justifier votre réponse par un raisonnement mathématique.</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">🔢 Exercice 3 : Divisibilité et nombres premiers</div>
                <div className="space-y-4">
                  <p><strong>1)</strong> Trouver le plus petit nombre qui est divisible par 2, 3, 4, 5 et 6.</p>
                  <p className="ml-4">Réponse : _______________</p>
                  
                  <p><strong>2)</strong> Un nombre de 3 chiffres est tel que :</p>
                  <div className="ml-4 space-y-1">
                    <p>• Le chiffre des centaines est le double du chiffre des unités</p>
                    <p>• La somme des trois chiffres est 12</p>
                    <p>• Le nombre est divisible par 3</p>
                  </div>
                  <p className="ml-4 mt-2">Quels sont les nombres possibles ? _______________</p>
                  
                  <p className="mt-3"><strong>3)</strong> Démontrer que la somme de trois nombres consécutifs est toujours divisible par 3.</p>
                </div>
              </div>

              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">📐 Exercice 4 : Géométrie et Thalès</div>
                <div className="space-y-3">
                  <p>Dans un triangle ABC, on trace une parallèle à (BC) qui coupe [AB] en M et [AC] en N.</p>
                  <p>On sait que : AM = 4 cm, AB = 10 cm, MN = 6 cm</p>
                  
                  <div className="bg-white p-4 rounded mt-3">
                    <p><strong>1)</strong> Calculer BC. Réponse : _______________</p>
                    <p className="mt-2"><strong>2)</strong> Calculer le rapport entre l'aire du triangle AMN et l'aire du triangle ABC.</p>
                    <p className="ml-4">Réponse : _______________</p>
                    <p className="mt-2"><strong>3)</strong> Si l'aire de ABC est 75 cm², quelle est l'aire de AMN ?</p>
                    <p className="ml-4">Réponse : _______________</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">⚖️ Exercice 5 : Problème d'équilibre</div>
                <div className="space-y-3">
                  <p>Sur une balance à deux plateaux :</p>
                  <div className="ml-4 space-y-2">
                    <p>• 3 cubes rouges + 2 cubes bleus = 5 cubes verts</p>
                    <p>• 1 cube rouge + 4 cubes bleus = 3 cubes verts</p>
                  </div>
                  <p className="mt-4"><strong>Questions :</strong></p>
                  <div className="ml-4 space-y-2">
                    <p>1) Exprimer le poids d'un cube rouge en fonction du poids d'un cube vert.</p>
                    <p className="ml-4">Réponse : _______________</p>
                    <p>2) Exprimer le poids d'un cube bleu en fonction du poids d'un cube vert.</p>
                    <p className="ml-4">Réponse : _______________</p>
                    <p>3) Combien faut-il de cubes bleus pour équilibrer 10 cubes rouges ?</p>
                    <p className="ml-4">Réponse : _______________</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">🎲 Exercice 6 : Probabilités et combinaisons</div>
                <div className="space-y-3">
                  <p>Dans une classe de 30 élèves, on forme des équipes de 3 pour un concours.</p>
                  
                  <p className="mt-3"><strong>1)</strong> De combien de façons différentes peut-on choisir le capitaine de la première équipe ?</p>
                  <p className="ml-4">Réponse : _______________</p>
                  
                  <p className="mt-3"><strong>2)</strong> Si 12 élèves sont des filles et 18 sont des garçons, quelle est la probabilité qu'une équipe choisie au hasard soit composée uniquement de filles ?</p>
                  <p className="ml-4">Réponse : _______________</p>
                  
                  <p className="mt-3"><strong>3)</strong> Combien d'équipes différentes peut-on former avec ces 30 élèves ?</p>
                </div>
              </div>

              <div className="border-2 border-orange-600 rounded-lg p-6 bg-orange-50">
                <div className="bg-orange-200 p-3 font-bold text-lg mb-4 rounded">💎 Exercice 7 : Le défi des puissances</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> Simplifier : (2²⁰²⁴ × 2²⁰²⁵) / 2²⁰²³</p>
                  <p className="ml-4">Réponse : _______________</p>
                  
                  <p className="mt-3"><strong>2)</strong> Trouver le dernier chiffre de 7²⁰²⁴</p>
                  <p className="ml-4">Indice : Chercher un pattern dans les puissances de 7</p>
                  <p className="ml-4">Réponse : _______________</p>
                  
                  <p className="mt-3"><strong>3)</strong> Sans calculatrice, déterminer quel nombre est le plus grand : 2³⁰⁰ ou 3²⁰⁰ ?</p>
                  <p className="ml-4">Réponse : _______________</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-orange-100 rounded-lg border-2 border-orange-400 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Stratégies pour les Olympiades avancées :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Commencez par les cas simples avant de généraliser</li>
                <li>Utilisez des tableaux et des graphiques pour visualiser</li>
                <li>Cherchez des symétries et des invariants</li>
                <li>Travaillez à rebours depuis la solution souhaitée</li>
                <li>Ne négligez pas les contre-exemples</li>
                <li>La persévérance est la clé du succès !</li>
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
