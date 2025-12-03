import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, BookOpen, Printer, FileText, Book } from 'lucide-react';

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
            <p className="text-xl text-gray-500 mt-2">Année Scolaire 2024-2025 / 2025-2026</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button 
              onClick={() => setCurrentView('homework')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-green-200 hover:border-green-400"
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Devoirs</h2>
              <p className="text-gray-600">Consulter et imprimer les devoirs</p>
            </button>

            <button 
              onClick={() => setCurrentView('controle')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-orange-200 hover:border-orange-400"
            >
              <FileText className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contrôles</h2>
              <p className="text-gray-600">Templates de contrôles</p>
            </button>

            <button 
              onClick={() => setCurrentView('program')}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-2 border-purple-200 hover:border-purple-400"
            >
              <Book className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Programme</h2>
              <p className="text-gray-600">Consulter le programme</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Section Devoirs
  if (currentView === 'homework') {
    // Sélection du niveau
    if (homeworkView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📚 Devoirs à Domicile</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez votre niveau :</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => setHomeworkView('1apic')}
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

    // Devoir 1APIC
    if (homeworkView === '1apic') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>{`
            @media print {
              .no-print { display: none !important; }
            }
          `}</style>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir à Domicile - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC - Semestre 1</p>
              <p className="text-lg text-red-600 font-bold">Date de remise : 4 décembre 2025</p>
              
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
              {/* Exercice 1 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1</div>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">1. Donner les signes des nombres suivants :</p>
                    <p className="ml-6">−1 ; +1 ; 0 ; −0 ; +0 ; +5.5 ; +30000</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-2">2. Donner les opposés des nombres suivants :</p>
                    <p className="ml-6">−3 ; +2 ; 0 ; 3,5 ; −2000</p>
                  </div>
                </div>
              </div>

              {/* Exercice 2 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2</div>
                <div className="space-y-4">
                  <p><strong>1.</strong> Tracer une droite graduée d'origine O et d'unité 1 cm</p>
                  <p><strong>2.</strong> Placer les points A ; B et C d'abscisses respectifs : -5 ; +2 ; -2.5</p>
                  <p><strong>3.</strong> Placer les points E ; F et G ayant des abscisses opposées respectivement à A ; B et C</p>
                </div>
              </div>

              {/* Exercice 3 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3</div>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">1. Compléter avec &lt; ; &gt; ou = :</p>
                    <p className="ml-6">5.5 .... 5.05  ;  0.1 .... 0.10  ;  −0 .... +0  ;  +1 .... −10000000</p>
                    <p className="ml-6">−55 .... −33 ;  −30000 ... + 2500 ;  0.....−250  ;  +20 .... 20</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-2">2. Ranger dans l'ordre croissant :</p>
                    <p className="ml-6">+10 ; 0 ; 5; 22 ; −10 ; 1; 12 − 1; 02 ; −1; −4.2</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">3. Calculer :</p>
                    <p className="ml-6">A = (−3) + (−5) ; B = (−1) + (+2); C = 5 − (−1); D = 5 − 10 ; E = (−5) + 1 − (−3)</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">4. Supprimer les parenthèses puis Calculer :</p>
                    <p className="ml-6">X = 5 − [(−5) − 3] + ((10 − 3) − 3)</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">5. Calculer :</p>
                    <p className="ml-6">(−3) × (−2); (−4) × (+2); (+2) × (−(−5)); (−10) × (−2) × (−25) ÷ (−5)</p>
                  </div>
                </div>
              </div>

              {/* Exercice 4 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-4">Reproduis et complète les quatre carrés ci-dessous. La somme de chaque rangée et de chaque colonne d'un carré doit être la même.</p>
                  
                  {/* Image de l'exercice */}
                  <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 mb-6">
                    <div className="grid grid-cols-2 gap-8">
                      {/* Carré a) */}
                      <div className="text-center">
                        <p className="font-bold mb-3 text-purple-800">a) La somme est -36.</p>
                        <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                          <table className="border-2 border-gray-800">
                            <tbody>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-7</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-28</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">0</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-8</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-40</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">5</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-2 text-sm italic text-gray-600">Somme: -36</div>
                        </div>
                      </div>

                      {/* Carré c) */}
                      <div className="text-center">
                        <p className="font-bold mb-3 text-purple-800">c) La somme est 4.</p>
                        <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                          <table className="border-2 border-gray-800">
                            <tbody>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-23</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-2</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-16</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-4</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-19</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center font-semibold">-30</td>
                                <td className="border-2 border-gray-800 p-3 w-16 h-16 text-center bg-orange-100"></td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-2 text-sm italic text-gray-600">Somme: 4</div>
                        </div>
                      </div>

                      {/* Carré b) */}
                      <div className="text-center">
                        <p className="font-bold mb-3 text-purple-800">b) Quelle est la somme ?</p>
                        <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                          <table className="border-2 border-gray-800">
                            <tbody>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">8</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">1</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-27</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-16</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-4</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-10</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-18</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-1</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-3</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-2</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-2 text-sm italic text-gray-600">Quelle est la somme ?</div>
                        </div>
                      </div>

                      {/* Carré d) */}
                      <div className="text-center">
                        <p className="font-bold mb-3 text-purple-800">d) La somme est 0.</p>
                        <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                          <table className="border-2 border-gray-800">
                            <tbody>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">23</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">2</td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-16</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-4</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-19</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">30</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                              </tr>
                              <tr>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-6</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-2</td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center bg-orange-100 text-sm"></td>
                                <td className="border-2 border-gray-800 p-2 w-14 h-14 text-center font-semibold text-sm">-3</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="mt-2 text-sm italic text-gray-600">Somme: 0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercice 5 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 5 - Géométrie</div>
                <div className="space-y-4">
                  <p className="font-semibold mb-3">Soit la figure suivante : tel que (AB) ⊥ (EF) et (EF) // (CD)</p>
                  
                  {/* Figure géométrique basée sur l'image fournie */}
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300 my-6 flex justify-center">
                    <svg width="600" height="400" viewBox="0 0 600 400" className="border-2 border-black bg-gray-50">
                      {/* Droite diagonale gauche (passant par E et C) */}
                      <line x1="80" y1="100" x2="280" y2="380" stroke="#666" strokeWidth="2"/>
                      
                      {/* Droite diagonale centrale (passant par A et B) */}
                      <line x1="180" y1="80" x2="380" y2="360" stroke="#666" strokeWidth="2"/>
                      
                      {/* Droite diagonale droite (passant par A et F) */}
                      <line x1="280" y1="60" x2="520" y2="340" stroke="#666" strokeWidth="2"/>
                      
                      {/* Droite diagonale inversée (passant par E, A, D) */}
                      <line x1="140" y1="80" x2="480" y2="360" stroke="#666" strokeWidth="2"/>
                      
                      {/* Point E */}
                      <rect x="170" y="110" width="10" height="10" fill="#4A90E2"/>
                      <text x="175" y="100" fontSize="16" fill="#4A90E2" fontWeight="bold">E</text>
                      
                      {/* Point C */}
                      <rect x="115" y="180" width="10" height="10" fill="#4A90E2"/>
                      <text x="105" y="200" fontSize="16" fill="#4A90E2" fontWeight="bold">C</text>
                      
                      {/* Point A */}
                      <rect x="280" y="195" width="10" height="10" fill="#4A90E2"/>
                      <text x="295" y="200" fontSize="16" fill="#4A90E2" fontWeight="bold">A</text>
                      
                      {/* Point B */}
                      <rect x="220" y="240" width="10" height="10" fill="#4A90E2"/>
                      <text x="210" y="265" fontSize="16" fill="#4A90E2" fontWeight="bold">B</text>
                      
                      {/* Point D */}
                      <rect x="330" y="270" width="10" height="10" fill="#4A90E2"/>
                      <text x="320" y="295" fontSize="16" fill="#4A90E2" fontWeight="bold">D</text>
                      
                      {/* Point F */}
                      <rect x="470" y="280" width="10" height="10" fill="#4A90E2"/>
                      <text x="485" y="285" fontSize="16" fill="#4A90E2" fontWeight="bold">F</text>
                    </svg>
                  </div>
                  
                  <div className="space-y-3 ml-4">
                    <p><strong>1.</strong> Montrer que (AB) ⊥ (CD)</p>
                    <div className="border-b border-dotted border-gray-400 my-2"></div>
                    <div className="border-b border-dotted border-gray-400 my-2"></div>
                    
                    <p><strong>2.</strong> Construire I le milieu de [DF]</p>
                    <p><strong>3.</strong> Construire la médiatrice de [DF] passant par I</p>
                    <p><strong>4.</strong> Construire un point J loin des extrémités de [AB] de la même distance.</p>
                    <p><strong>5.</strong> Comment appelle-t-on la droite passant par J et Perpendiculaire à (AB) ?</p>
                    <div className="border-b border-dotted border-gray-400 my-2"></div>
                    
                    <p><strong>6.</strong> Compléter par l'un des symboles ∈ ou ∉ :</p>
                    <p className="ml-4">B ...(AB) ; E ......[AF ] ; B .....[ CD] ; F .....[AF); D ....(EF) .</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les constructions géométriques doivent être précises</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Liste des devoirs 2APIC
    if (homeworkView === '2apic-list') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📚 Devoirs - 2ème Année APIC</h1>
            <p className="text-xl mb-8 text-center text-gray-600">Sélectionnez le devoir :</p>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => setHomeworkView('2apic-devoir1')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-2">📝 Devoir N°1</div>
                    <div className="text-sm opacity-90">Nombres Relatifs et Rationnels - Problèmes</div>
                    <div className="text-sm mt-1">Date de remise : 4 décembre 2025</div>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </div>
              </button>

              <button 
                onClick={() => setHomeworkView('2apic-devoir2')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-2">📐 Devoir N°2</div>
                    <div className="text-sm opacity-90">Puissances, Écritures scientifiques, Géométrie</div>
                    <div className="text-sm mt-1">Année 2024-2025</div>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </div>
              </button>

              <button 
                onClick={() => setHomeworkView('2apic-devoir3')}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-2">🧮 Version Alternative</div>
                    <div className="text-sm opacity-90">Calculs avancés et expressions algébriques</div>
                    <div className="text-sm mt-1">Date de remise : 4 décembre 2025</div>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </div>
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

    // Devoir 2APIC N°2 (nouveau)
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir à Domicile Numéro 2</h1>
              <p className="text-xl text-gray-600 mb-2">Mathématiques - 2ème Année APIC</p>
              <p className="text-sm text-gray-500 mb-2">Lycée collège Mouad Ibn Jabal - Salé</p>
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
              {/* Exercice 1 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 1</div>
                <div className="space-y-4">
                  <p><strong>1.</strong> Calculer : A = -1<sup>2025</sup> ; B = (-1)<sup>2</sup> ; C = (-2/3)<sup>-2</sup> ; D = 4/9 - (2/3)<sup>-2</sup></p>
                  <p className="ml-6">E = (10² × 10⁻³) / (10⁻² × 10³) / (5⁻² × 5⁻³)</p>
                  
                  <p className="mt-4"><strong>2.</strong> Écris sous forme de puissance les expressions suivantes :</p>
                  <p className="ml-6">7 × 7² × 49⁵ ; (-3/2)⁴ × (-2/3)⁻⁴ ; (8/5)³ × (25/64)⁻³</p>
                  <p className="ml-6">0.25⁵ / 0.75⁵ ; 0.5¹⁰ × (1/2)⁵</p>
                  
                  <p className="mt-4"><strong>3.</strong> Écris sous écriture scientifique les nombres suivants :</p>
                  <p className="ml-6">10000,5 × 10⁵ ; -0.0000005 × 10⁻⁴ ; 2025 × 10³ + 202.4 × 10⁴</p>
                </div>
              </div>

              {/* Exercice 2 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 2</div>
                <div className="space-y-4">
                  <p>Suite à un héritage, deux cousins éloignés reçoivent une somme d'argent. Le premier reçoit <strong>9/56</strong> ème de la somme totale et le deuxième reçoit <strong>12/85</strong> ème. Lequel reçoit le plus ?</p>
                  
                  <div className="mt-6">
                    <p><strong>2-</strong> Saad a dépensé <strong>3/5</strong> ème de ce qui lui restait d'argent de poche à la fête d'anniversaire. Il lui restait <strong>2/3</strong> ce que sa maman lui avait donné.</p>
                    <p className="ml-4 mt-2"><strong>2-1</strong> Quelle fraction de son argent de poche a-t-il dépensé à la fête d'anniversaire ?</p>
                    <p className="ml-4"><strong>2-2</strong> Sa maman lui avait donné 300 DH. Combien lui reste-t-il ?</p>
                  </div>
                </div>
              </div>

              {/* Exercice 3 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 3 - Géométrie</div>
                <div className="space-y-4">
                  <p><strong>I.</strong> ABC est un triangle isocèle en A.</p>
                  <div className="ml-4 space-y-2">
                    <p><strong>1.</strong> Construire le point A' le symétrique de point A par rapport à la droite (BC).</p>
                    <p><strong>2.</strong> Construire le point O' le symétrique de point A par rapport à la droite (BC)</p>
                    <p><strong>3.</strong> Montrer que les points C, O' et A' sont alignés.</p>
                    <p><strong>4.</strong> Quel est le symétrique du segment [OB] par rapport à la droite (BC) ? Justifier.</p>
                    <p><strong>5.</strong> Quel est le symétrique de l'angle B̂AC par rapport à la droite (BC) ? Justifier.</p>
                    <p><strong>6.</strong> Déduire la mesure de l'angle A'BC</p>
                  </div>
                  
                  <p className="mt-4"><strong>II.</strong> Soit ABC un triangle rectangle en A et (D) la médiatrice de [BD].</p>
                  <p className="ml-4">C est le point symétrique de A par rapport à (D).</p>
                  <div className="ml-4 space-y-2">
                    <p><strong>1.</strong> Montrer que (BC) ⊥ (DC)</p>
                    <p><strong>2.</strong> Montrer que les droites (AB) et (CD) se coupent en un point appartenant à (D)</p>
                  </div>
                </div>
              </div>

              {/* Exercice 4 */}
              <div className="border-2 border-gray-800 rounded-lg p-6">
                <div className="bg-gray-200 p-3 font-bold text-lg mb-4 rounded">Exercice 4</div>
                <div className="space-y-4">
                  <p>K = -2/7 × -3/5 × 1/6  ;  L = -17/13 × 15/11 × 13/17  ;  M = 8 × -13/5 × 1/13</p>
                  
                  <p className="mt-4"><strong>1.</strong> Calculer puis simplifier si c'est possible</p>
                  
                  <p className="mt-4"><strong>2.</strong> A et b deux nombres rationnels tels que <strong>a × b = 7/8</strong></p>
                  <p className="ml-4">Calculer : <strong>1/(a × 1/b)</strong></p>
                  
                  <p className="mt-4">I = -12/11 ÷ 4/-33  ;  J = -2020/2021 ÷ 2020/2021</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les résultats doivent être simplifiés</li>
                <li>Les constructions géométriques doivent être précises</li>
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

  // Section Contrôle
  if (currentView === 'controle') {
    return (
      <div className="min-h-screen bg-gray-100">
        <style>{`
          @page {
            size: A4;
            margin: 0;
          }
          @media print {
            .no-print { display: none !important; }
            body { background: white; margin: 0; }
            .page { 
              margin: 0 !important; 
              box-shadow: none !important; 
              page-break-after: always;
              width: 210mm;
              height: 297mm;
              padding: 10mm;
            }
          }
          .answer-space {
            border-bottom: 1px dotted #999;
            min-height: 22px;
            margin: 6px 0;
          }
          .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 20px auto;
            padding: 10mm;
            box-sizing: border-box;
          }
        `}</style>
        
        <div className="no-print py-6 flex justify-center gap-4 bg-white shadow-md">
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-5 h-5 mr-2" />
            Imprimer / Télécharger PDF
          </button>
          <button 
            onClick={() => setCurrentView('menu')}
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour au Menu
          </button>
        </div>

        <div className="print-area">
          <div className="page shadow-lg">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border-2 border-gray-800 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs font-bold text-center mb-2">Nom et Prénom et numéro :</h3>
                <div className="border-b border-dotted border-gray-600 h-5 mb-3"></div>
                <p className="text-xs font-semibold">Classe :</p>
                <div className="border-b border-dotted border-gray-600 h-5"></div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs font-bold text-center mb-2">Contrôle 1 Semestre 1</h3>
                <p className="text-xs text-center font-semibold">Lycée collège : Mouad Ibn Jabal</p>
                <p className="text-xs text-center font-semibold mt-1">Salé</p>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs font-bold text-center mb-2">Niveau : 1APIC/2APIC</h3>
                <p className="text-xs text-center font-semibold">Année scolaire : 2025/2026</p>
                <p className="text-xs font-semibold mt-2">Note :</p>
                <div className="border-b border-dotted border-gray-600 h-5"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2" style={{height: 'calc(100% - 100px)'}}>
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 1</div>
                <div className="p-3 flex-1">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 2</div>
                <div className="p-3 flex-1">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 3</div>
                <div className="p-3 flex-1">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Bonus</div>
                <div className="p-3 flex-1">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="page shadow-lg">
            <div className="grid grid-cols-2 gap-2 h-full">
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 1 (suite)</div>
                <div className="p-3 flex-1">
                  {[...Array(18)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 2 (suite)</div>
                <div className="p-3 flex-1">
                  {[...Array(18)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Exercice 3 (suite)</div>
                <div className="p-3 flex-1">
                  {[...Array(18)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-300 p-2 text-center font-bold text-xs">Bonus (suite)</div>
                <div className="p-3 flex-1">
                  {[...Array(18)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Section Programme
  if (currentView === 'program') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">📖 Programme Scolaire</h1>
            <p className="text-xl text-gray-600">Mathématiques - Lycée Collège Mouad Ibn Jabal</p>
            <p className="text-lg text-gray-500 mt-2">Année Scolaire 2024-2025 / 2025-2026</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">1ère Année APIC</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Les nombres relatifs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Les nombres décimaux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Les fractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>La droite graduée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Géométrie : droites parallèles et perpendiculaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>Géométrie : médiatrice et symétrie axiale</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">2ème Année APIC</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Les puissances</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Écriture scientifique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Nombres rationnels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Calcul avec fractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Équations du premier degré</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Géométrie : symétrie axiale et médiatrice</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">📋 Organisation du Semestre 1</h3>
            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h4 className="font-bold text-green-700 mb-2">Contrôles continus</h4>
                <p className="text-sm">3 contrôles durant le semestre</p>
              </div>
              <div>
                <h4 className="font-bold text-green-700 mb-2">Devoirs à domicile</h4>
                <p className="text-sm">2 devoirs par mois</p>
              </div>
              <div>
                <h4 className="font-bold text-green-700 mb-2">Examen semestriel</h4>
                <p className="text-sm">Fin janvier 2026</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentView('menu')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour au Menu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vue par défaut
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Application en cours de chargement...</h1>
        <button 
          onClick={() => setCurrentView('menu')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retour au Menu
        </button>
      </div>
    </div>
  );
};

export default MathApp;
