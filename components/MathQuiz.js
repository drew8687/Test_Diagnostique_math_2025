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
                    <div className="text-sm mt-1">Date de remise : 17 octobre 2025</div>
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
                    <div className="text-sm mt-1">Date de remise : 17 octobre 2025</div>
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
                    <p><strong>6.</strong> Déduire la mesure de l'angle ÂBC</p>
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
