import React, { useState } from 'react';
import { ChevronLeft, Home, BookOpen, Printer, ClipboardCheck } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');
  const [diagnosticView, setDiagnosticView] = useState('selection');

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
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1 : Écriture scientifique (4 points)</div>
                <div className="space-y-3">
                  <p><strong>1)</strong> On calcule : 5² × (15)⁴ × (−1)⁷²</p>
                  <p className="ml-4">Calcul : _______________</p>
                  
                  <p className="mt-4"><strong>2)</strong> On écrit en écriture scientifique :</p>
                  <p className="ml-4">26 × 10⁶ × 2026 × 10⁴ = _______________</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2 : Géométrie (8 points)</div>
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
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3 : Calcul avec fractions (4 points)</div>
                <div className="space-y-3 ml-4">
                  <p>1. A = 130 + 110 − 240 = ______________</p>
                  <p>2. B = 18 × 20 ÷ 60 = ______________</p>
                  <p>3. C = (50 + 10) × 5 − 150 = ______________</p>
                  <p>4. D = 20 + 12 × 3 − 24 ÷ 4 = ______________</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4 : Simplification de fractions (4 points)</div>
                <div className="space-y-3 ml-4">
                  <p>1. I = 2/5 + 1/5 = ______________</p>
                  <p>2. J = 4/7 − 1/7 = ______________</p>
                  <p>3. K = 2/5 × 6/7 = ______________</p>
                  <p>4. L = 3/8 + 1/2 = ______________</p>
                  <p>5. M = 4/9 − 3/5 = ______________</p>
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

  return null;
};

export default MathApp;
