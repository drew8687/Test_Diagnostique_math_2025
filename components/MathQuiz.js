import React, { useState } from 'react';
import { ChevronLeft, Home, BookOpen, Printer } from 'lucide-react';

const MathApp = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [homeworkView, setHomeworkView] = useState('selection');

  const handlePrint = () => {
    window.print();
  };

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
              onClick={() => setCurrentView('homework')}
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
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">📚 Devoir N°3 - 2ème Année APIC</h1>
            <button 
              onClick={() => setHomeworkView('2apic-devoir2')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="text-2xl font-bold mb-2">📐 Voir le Devoir</div>
              <div className="text-sm opacity-90">Géométrie du Triangle et Constructions</div>
            </button>
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
