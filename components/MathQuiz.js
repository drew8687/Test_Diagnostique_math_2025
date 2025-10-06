import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, GraduationCap, FileText, Download, AlertCircle, Mail, Phone, Printer, Home, BookOpen, ClipboardList, Calendar, Target, Book } from 'lucide-react';

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showStartForm, setShowStartForm] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    className: ''
  });
  const [completedStudents, setCompletedStudents] = useState([]);
  const [isStudentAlreadyCompleted, setIsStudentAlreadyCompleted] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('2APIC');
  const [currentView, setCurrentView] = useState('quiz');
  const [selectedProgram, setSelectedProgram] = useState('2APIC'); // Pour la section programme

  const programData = {
    '1APIC': {
      title: "Programme Mathématiques 1APIC",
      description: "",
      objectives: [
        "Acquérir les bases fondamentales en mathématiques",
        "Développer la rigueur de raisonnement",
        "Maîtriser les opérations de base",
        "Préparer le passage en 2ème année"
      ],
      lessons: [
        {
          id: 1,
          title: "Leçon 1 : Opérations sur les Nombres Entiers et les Nombres Décimaux",
          prerequisites: [
            "Vocabulaire correspondant aux quatre opérations",
            "Calcul d'une expression numérique",
            "Opérations sur les nombres entiers naturels et décimaux"
          ],
          objectives: [
            "Écrire une expression formée d'un enchaînement d'opérations",
            "Reconnaître les relations de distributivité : k(a+b)=ka+kb et k(a−b)=ka−kb",
            "Utiliser la distributivité dans les deux sens",
            "Maîtriser la priorité des opérations"
          ],
          content: [
            "I. Opérations sur les nombres entiers",
            "   - Addition, soustraction, multiplication, division",
            "   - Propriétés des opérations",
            "II. Nombres décimaux",
            "   - Lecture et écriture",
            "   - Comparaison et ordre",
            "   - Opérations de base",
            "III. Expressions numériques",
            "   - Priorité des opérations",
            "   - Utilisation des parenthèses",
            "IV. Distributivité",
            "   - Développement simple",
            "   - Factorisation basique"
          ],
          skills: ["Calcul mental", "Manipulation numérique", "Raisonnement logique"],
          duration: "6 semaines"
        },
        {
          id: 2,
          title: "Leçon 2 : Les Nombres Fractionnaires",
          prerequisites: [
            "Réduire une fraction",
            "Réduire au même dénominateur deux fractions",
            "Comparer deux fractions",
            "Opérations sur les fractions simples"
          ],
          objectives: [
            "Expression d'un nombre par différentes écritures fractionnaires",
            "Multiplication de deux nombres fractionnaires",
            "Rendre entier naturel le dénominateur d'un nombre",
            "Compréhension, addition et soustraction des fractions",
            "L'encadrement décimal d'une fraction"
          ],
          content: [
            "I. Égalité de deux fractions",
            "   - Produit en croix",
            "   - Fractions équivalentes",
            "II. Comparaison de deux fractions",
            "   - Réduction au même dénominateur",
            "   - Comparaison par différence",
            "III. Addition et soustraction des fractions",
            "   - Même dénominateur",
            "   - Dénominateurs différents",
            "IV. Multiplication des fractions",
            "V. Division des fractions",
            "   - Inverse d'une fraction"
          ],
          skills: ["Manipulation fractionnaire", "Comparaison", "Calcul fractionnaire"],
          duration: "5 semaines"
        },
        {
          id: 3,
          title: "Leçon 3 : Introduction à la Géométrie de Base",
          prerequisites: [
            "Reconnaissance des figures géométriques simples",
            "Utilisation de la règle et du compas",
            "Notions de base de mesure"
          ],
          objectives: [
            "Reconnaître et construire les figures géométriques fondamentales",
            "Calculer les périmètres et aires des figures simples",
            "Comprendre les propriétés des triangles et quadrilatères",
            "Utiliser le théorème de Pythagore"
          ],
          content: [
            "I. Figures géométriques fondamentales",
            "   - Points, droites, segments",
            "   - Angles et leur mesure",
            "II. Triangles",
            "   - Classification",
            "   - Propriétés",
            "   - Théorème de Pythagore",
            "III. Quadrilatères",
            "   - Carrés, rectangles, losanges",
            "   - Propriétés caractéristiques",
            "IV. Périmètres et aires",
            "   - Formules de calcul",
            "   - Applications pratiques"
          ],
          skills: ["Visualisation spatiale", "Construction géométrique", "Calcul de mesures"],
          duration: "5 semaines"
        },
        {
          id: 4,
          title: "Leçon 4 : Initiation aux Fonctions Affines",
          prerequisites: [
            "Coordonnées dans un repère",
            "Notion de variable",
            "Calcul littéral de base"
          ],
          objectives: [
            "Définir et reconnaître une fonction affine",
            "Représenter graphiquement une fonction affine",
            "Déterminer l'équation d'une droite",
            "Résoudre des problèmes de proportionnalité"
          ],
          content: [
            "I. Notion de fonction",
            "   - Variable, image, antécédent",
            "   - Représentation",
            "II. Fonctions affines",
            "   - Définition f(x) = ax + b",
            "   - Coefficient directeur et ordonnée à l'origine",
            "III. Représentation graphique",
            "   - Droites dans le plan",
            "   - Pente et position",
            "IV. Applications",
            "   - Problèmes de proportionnalité",
            "   - Situations concrètes"
          ],
          skills: ["Représentation graphique", "Modélisation", "Résolution de problèmes"],
          duration: "4 semaines"
        }
      ],
      evaluation: {
        continuous: "40% - Contrôles continus et devoirs",
        exams: "50% - Examens semestriels",
        projects: "10% - Projets et activités pratiques"
      },
      resources: [
        "Manuel de mathématiques 1APIC",
        "Cahier d'exercices progressifs",
        "Plateforme en ligne d'entraînement",
        "Séances de tutorat hebdomadaires",
        "Matériel de géométrie"
      ]
    },
    '2APIC': {
      title: "Programme Mathématiques 2APIC",
      description: "Nombres Relatifs et Nombres Rationnels - Approfondissement des concepts fondamentaux",
      objectives: [
        "Maîtriser les opérations sur les nombres relatifs",
        "Comprendre et manipuler les nombres rationnels",
        "Développer la rigueur dans le calcul algébrique",
        "Résoudre des problèmes impliquant les nombres relatifs et rationnels",
        "Préparer les bases pour l'algèbre avancée"
      ],
      lessons: [
        {
          id: 1,
          title: "Partie 1 : Les Nombres Relatifs et leurs Opérations",
          prerequisites: [
            "Connaissance des nombres entiers naturels",
            "Notion de valeur absolue",
            "Opérations de base (addition, soustraction, multiplication, division)"
          ],
          objectives: [
            "Définition et repérage des nombres relatifs (nombres avec un signe)",
            "Maîtriser l'addition et la soustraction des nombres relatifs",
            "Appliquer la règle des signes pour la multiplication et la division",
            "Respecter la priorité des opérations dans les calculs"
          ],
          content: [
            "I. Définition et repérage des nombres relatifs",
            "   - Nombres positifs et négatifs",
            "   - Repérage sur une droite graduée",
            "   - Valeur absolue",
            "II. Addition et soustraction des nombres relatifs",
            "   - Règle des signes pour l'addition",
            "   - Transformer une soustraction en addition",
            "   - Nombres opposés",
            "III. Multiplication et division des nombres relatifs",
            "   - Règle des signes pour la multiplication et la division",
            "   - Priorité des opérations",
            "IV. Calcul d'expressions avec nombres relatifs"
          ],
          skills: ["Repérage sur axe gradué", "Calcul mental", "Application des règles de signes"],
          duration: "6 semaines"
        },
        {
          id: 2,
          title: "Partie 2 : Les Nombres Rationnels (Fractions Relatives)",
          prerequisites: [
            "Notion de fraction simple",
            "Multiplication et division des nombres entiers",
            "Simplification de fractions"
          ],
          objectives: [
            "Définir un nombre rationnel comme quotient de deux nombres entiers relatifs",
            "Reconnaître les cas particuliers (entiers, décimaux)",
            "Vérifier l'égalité de deux nombres rationnels",
            "Simplifier et comparer des nombres rationnels"
          ],
          content: [
            "I. Nombre Rationnel : Définition et cas particuliers",
            "   - Quotient de deux entiers relatifs",
            "   - Écriture fractionnaire",
            "   - Nombres décimaux et non décimaux",
            "II. Égalité de deux nombres rationnels : produit en croix",
            "III. Rendre un nombre rationnel irréductible (simplification)",
            "   - PGCD",
            "   - Fractions irréductibles",
            "IV. Réduction au même dénominateur",
            "V. Comparaison des nombres rationnels"
          ],
          skills: ["Simplification de fractions", "Réduction au même dénominateur", "Comparaison de nombres"],
          duration: "5 semaines"
        },
        {
          id: 3,
          title: "Partie 3 : Opérations sur les Nombres Rationnels",
          prerequisites: [
            "Opérations sur les fractions simples",
            "Règles des signes pour les nombres relatifs",
            "Réduction au même dénominateur"
          ],
          objectives: [
            "Effectuer l'addition et la soustraction de nombres rationnels",
            "Maîtriser la multiplication et la division des nombres rationnels",
            "Calculer des expressions complexes",
            "Résoudre des problèmes concrets"
          ],
          content: [
            "I. Addition et soustraction de nombres rationnels",
            "   - Réduction au même dénominateur",
            "   - Application des règles d'addition des nombres relatifs",
            "II. Multiplication des nombres rationnels",
            "   - Règle des signes",
            "   - Simplification avant calcul",
            "III. Division des nombres rationnels : multiplication par l'inverse",
            "IV. Calcul d'expressions et résolution de problèmes",
            "   - Priorités opératoires",
            "   - Problèmes de la vie courante"
          ],
          skills: ["Calcul fractionnaire", "Résolution de problèmes", "Manipulation algébrique"],
          duration: "5 semaines"
        },
        {
          id: 4,
          title: "Partie 4 : Applications et Problèmes Complexes",
          prerequisites: [
            "Maîtrise des opérations sur les relatifs et rationnels",
            "Résolution d'équations simples",
            "Logique mathématique de base"
          ],
          objectives: [
            "Résoudre des problèmes complexes utilisant les nombres relatifs et rationnels",
            "Appliquer les connaissances dans des situations concrètes",
            "Développer la modélisation mathématique",
            "Préparer l'évaluation finale"
          ],
          content: [
            "I. Problèmes de la vie courante",
            "   - Calculs financiers simples",
            "   - Problèmes de partage",
            "   - Situations de proportionnalité",
            "II. Équations du premier degré",
            "   - Mise en équation",
            "   - Résolution",
            "III. Notions d'algorithmique simple",
            "   - Organigrammes de calcul",
            "   - Résolution pas à pas",
            "IV. Synthèse et révision"
          ],
          skills: ["Modélisation", "Résolution de problèmes", "Synthèse des connaissances"],
          duration: "4 semaines"
        }
      ],
      evaluation: {
        continuous: "40% - Contrôles continus et exercices",
        exams: "50% - Examens semestriels",
        projects: "10% - Problèmes complexes et applications"
      },
      resources: [
        "Manuel de mathématiques 2APIC - Nombres relatifs et rationnels",
        "Cahier d'exercices progressifs",
        "Fiches de révision et méthodes",
        "Plateforme en ligne d'entraînement interactif",
        "Annales d'examens"
      ]
    }
  };

  const homeworkData = {
    '1APIC': [
      {
        id: 1,
        title: "Devoir 1 - Opérations fondamentales",
        dueDate: "15/10/2024",
        subject: "Nombres entiers et décimaux",
        exercises: [
          "Calculer : 125 + 348 - 97",
          "Effectuer : 24 × 15 ÷ 6",
          "Résoudre : 3x + 7 = 22",
          "Développer : 2(x + 5) - 3(x - 2)"
        ]
      },
      {
        id: 2,
        title: "Devoir 2 - Fractions et géométrie",
        dueDate: "22/10/2024",
        subject: "Applications pratiques",
        exercises: [
          "Calculer : 2/3 + 5/6",
          "Simplifier la fraction 18/24",
          "Calculer l'aire d'un rectangle de 8cm par 5cm",
          "Dans un triangle rectangle, si les côtés valent 6cm et 8cm, calculer l'hypoténuse"
        ]
      }
    ],
    '2APIC': [
      {
        id: 1,
        title: "Devoir 1 - Nombres Relatifs",
        dueDate: "15/10/2024",
        subject: "Opérations sur les nombres relatifs",
        exercises: [
          "Calculer : (-5) + (+8) - (-3)",
          "Effectuer : (-4) × (+6) ÷ (-2)",
          "Résoudre : 2x - 7 = -15",
          "Calculer : [(-3) + (+5)] × (-2)"
        ]
      },
      {
        id: 2,
        title: "Devoir 2 - Nombres Rationnels",
        dueDate: "22/10/2024",
        subject: "Fractions et calculs rationnels",
        exercises: [
          "Simplifier la fraction 24/36",
          "Calculer : 2/3 + 5/4",
          "Comparer : 3/5 et 7/10",
          "Effectuer : (2/3) × (9/4) ÷ (1/2)"
        ]
      }
    ]
  };

  // Quiz data reste inchangé...
  const quizData2APIC = {
    totalQuestions: 12,
    questions: [
      {
        id: 1,
        category: "Nombres Relatifs",
        question: "Résoudre l'équation : z² + 2z + 2 = 0 dans ℂ",
        options: [
          "z = -1 ± i",
          "z = 1 ± i",
          "z = -1 ± 2i",
          "z = -2 ± i"
        ],
        correctAnswer: 0
      },
      // ... autres questions 2APIC
    ]
  };

  const quizData1APIC = {
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        category: "Algèbre",
        question: "Résoudre : 2x + 5 = 15",
        options: [
          "x = 5",
          "x = 10",
          "x = 7.5",
          "x = 20"
        ],
        correctAnswer: 0
      },
      // ... autres questions 1APIC
    ]
  };

  const quizData = selectedGrade === '1APIC' ? quizData1APIC : quizData2APIC;

  // Autres fonctions restent inchangées...
  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted && !showStartForm && currentView === 'quiz') {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && currentView === 'quiz') {
      setIsCompleted(true);
      setShowResults(true);
    }
  }, [timeRemaining, isCompleted, showStartForm, currentView]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    const studentKey = `${studentInfo.firstName}_${studentInfo.lastName}_${studentInfo.phoneNumber}_${selectedGrade}`;
    if (completedStudents.includes(studentKey)) {
      setIsStudentAlreadyCompleted(true);
      return;
    }
    setShowStartForm(false);
    setTimeRemaining(selectedGrade === '1APIC' ? 2700 : 3600);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setShowResults(true);
    const studentKey = `${studentInfo.firstName}_${studentInfo.lastName}_${studentInfo.phoneNumber}_${selectedGrade}`;
    setCompletedStudents([...completedStudents, studentKey]);
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quizData.questions.length,
      percentage: Math.round((correct / quizData.questions.length) * 100)
    };
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(selectedGrade === '1APIC' ? 2700 : 3600);
    setIsCompleted(false);
    setShowResults(false);
    setShowStartForm(true);
    setShowReport(false);
    setStudentInfo({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      className: ''
    });
  };

  const ProgramSection = () => {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Sélecteur de programme */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedProgram('1APIC')}
              className={`px-6 py-3 rounded-md flex items-center transition-colors ${
                selectedProgram === '1APIC'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Programme 1APIC
            </button>
            <button
              onClick={() => setSelectedProgram('2APIC')}
              className={`px-6 py-3 rounded-md flex items-center transition-colors ${
                selectedProgram === '2APIC'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Programme 2APIC
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{programData[selectedProgram].title}</h1>
          <p className="text-gray-600">{programData[selectedProgram].description}</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Objectifs du Programme
          </h2>
          <ul className="space-y-2">
            {programData[selectedProgram].objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-blue-900">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Structure du Programme {selectedProgram}
          </h2>
          <div className="space-y-8">
            {programData[selectedProgram].lessons.map((lesson) => (
              <div key={lesson.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{lesson.title}</h3>
                  {lesson.duration && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {lesson.duration}
                    </span>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 bg-green-50 p-2 rounded">Pré-requis :</h4>
                    <ul className="space-y-2">
                      {lesson.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 bg-blue-50 p-2 rounded">Objectifs d'apprentissage :</h4>
                    <ul className="space-y-2">
                      {lesson.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {lesson.content && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-3 bg-purple-50 p-2 rounded">Plan détaillé :</h4>
                    <ul className="space-y-2">
                      {lesson.content.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lesson.skills && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-3 bg-yellow-50 p-2 rounded">Compétences visées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {lesson.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      
        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Ressources Pédagogiques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {programData[selectedProgram].resources.map((resource, index) => (
              <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                <BookOpen className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="text-yellow-900">{resource}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Calendrier Scolaire {selectedProgram}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-medium">Rentrée scolaire</span>
              <span className="text-purple-600">Septembre 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-medium">Contrôle continu</span>
              <span className="text-purple-600">Toute l'année</span>
            </div>
          
          
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentView('quiz')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour au Quiz
          </button>
        </div>
      </div>
    );
  };

  // Les autres composants (HomeworkSection, etc.) restent inchangés...
  const HomeworkSection = () => {
    const [homeworkView, setHomeworkView] = useState('selection');

    const handlePrint = () => {
      window.print();
    };

    if (homeworkView === 'selection') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 Devoirs à Domicile - Mathématiques</h1>
            <p className="text-xl mb-4">Collège Mouad Ibn Jabal - Semestre 1 (2025/2026)</p>
            <p className="text-red-600 font-bold text-2xl mb-8">📅 Date de remise : 17 octobre 2025</p>
            <div className="mt-10">
              <p className="text-lg mb-6">Sélectionnez votre niveau :</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setHomeworkView('devoir1')}
                  className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  1ère Année Collège
                </button>
                <button
                  onClick={() => setHomeworkView('devoir2')}
                  className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  2ème Année Collège
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setCurrentView('quiz')}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Retour au Menu Principal
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Reste du code HomeworkSection inchangé...
    // ... (le reste du code reste identique)

    return null;
  };

  if (currentView === 'program') {
    return <ProgramSection />;
  }

  if (currentView === 'homework') {
    return <HomeworkSection />;
  }

  // Le reste du code (formulaire de démarrage, quiz, résultats) reste inchangé...
  // ... (le reste du code reste identique)

  return (
    // ... (le code JSX principal reste inchangé)
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Le contenu principal reste inchangé */}
    </div>
  );
};

export default MathQuiz;
