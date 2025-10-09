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
  const [selectedProgram, setSelectedProgram] = useState('2APIC');

  const programData = {
    '1APIC': {
      title: "Programme Mathématiques 1APIC",
      description: "Année préparatoire intégrée en cycle d'ingénieur - Bases fondamentales",
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
      }
    ]
  };

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
      {
        id: 2,
        category: "Nombres Relatifs",
        question: "La dérivée de f(x) = x³ - 3x² + 2x - 1 est :",
        options: [
          "f'(x) = 3x² - 6x + 2",
          "f'(x) = 3x² - 6x + 1",
          "f'(x) = x² - 6x + 2",
          "f'(x) = 3x² - 3x + 2"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        category: "Nombres Rationnels",
        question: "Le produit vectoriel u(1,2,3) × v(2,1,0) est :",
        options: [
          "(-3, 6, -3)",
          "(3, -6, 3)",
          "(-3, 6, 3)",
          "(3, 6, -3)"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        category: "Nombres Rationnels",
        question: "∫₀¹ x² dx = ?",
        options: [
          "1/3",
          "1/2",
          "2/3",
          "1"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        category: "Nombres Relatifs",
        question: "Le déterminant de la matrice [[2,1],[4,3]] est :",
        options: [
          "2",
          "4",
          "6",
          "8"
        ],
        correctAnswer: 0
      },
      {
        id: 6,
        category: "Nombres Rationnels",
        question: "P(A∪B) = P(A) + P(B) - ?",
        options: [
          "P(A∩B)",
          "P(A)·P(B)",
          "P(A|B)",
          "P(B|A)"
        ],
        correctAnswer: 0
      },
      {
        id: 7,
        category: "Nombres Relatifs",
        question: "lim(x→0) (sin x)/x = ?",
        options: [
          "1",
          "0",
          "∞",
          "Non définie"
        ],
        correctAnswer: 0
      },
      {
        id: 8,
        category: "Nombres Rationnels",
        question: "Si i² = -1, alors i⁴ = ?",
        options: [
          "1",
          "-1",
          "i",
          "-i"
        ],
        correctAnswer: 0
      },
      {
        id: 9,
        category: "Nombres Relatifs",
        question: "L'équation d'un plan dans l'espace est de la forme :",
        options: [
          "ax + by + cz + d = 0",
          "y = ax + b",
          "x² + y² = r²",
          "(x-a)² + (y-b)² = r²"
        ],
        correctAnswer: 0
      },
      {
        id: 10,
        category: "Nombres Rationnels",
        question: "Une fonction est continue en a si :",
        options: [
          "lim(x→a) f(x) = f(a)",
          "f'(a) existe",
          "f(a) existe",
          "f est définie en a"
        ],
        correctAnswer: 0
      },
      {
        id: 11,
        category: "Nombres Relatifs",
        question: "L'espérance d'une variable aléatoire uniforme sur [0,1] est :",
        options: [
          "1/2",
          "1",
          "0",
          "2"
        ],
        correctAnswer: 0
      },
      {
        id: 12,
        category: "Nombres Rationnels",
        question: "Le rang d'une matrice 3×3 inversible est :",
        options: [
          "3",
          "2",
          "1",
          "0"
        ],
        correctAnswer: 0
      }
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
      {
        id: 2,
        category: "Algèbre",
        question: "Développer : (x + 3)(x + 2)",
        options: [
          "x² + 5x + 6",
          "x² + 6x + 5",
          "x² + 3x + 2",
          "2x + 5"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        category: "Géométrie",
        question: "Dans un triangle rectangle, si a=3 et b=4, alors c = ?",
        options: [
          "5",
          "7",
          "25",
          "12"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        category: "Algèbre",
        question: "Résoudre le système: x + y = 10 et x - y = 2",
        options: [
          "x=6, y=4",
          "x=5, y=5",
          "x=8, y=2",
          "x=7, y=3"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        category: "Géométrie",
        question: "L'aire d'un rectangle de longueur 8 et largeur 5 est :",
        options: [
          "40",
          "13",
          "26",
          "80"
        ],
        correctAnswer: 0
      },
      {
        id: 6,
        category: "Fonctions",
        question: "Si f(x) = 2x + 3, alors f(5) = ?",
        options: [
          "13",
          "10",
          "8",
          "16"
        ],
        correctAnswer: 0
      },
      {
        id: 7,
        category: "Probabilités",
        question: "La probabilité de tirer un as dans un jeu de 52 cartes est :",
        options: [
          "1/13",
          "1/52",
          "4/52",
          "1/4"
        ],
        correctAnswer: 0
      },
      {
        id: 8,
        category: "Algèbre",
        question: "Simplifier : 3(x + 2) - 2(x - 1)",
        options: [
          "x + 8",
          "x + 4",
          "5x + 4",
          "x + 6"
        ],
        correctAnswer: 0
      },
      {
        id: 9,
        category: "Géométrie",
        question: "Le périmètre d'un carré de côté 6 est :",
        options: [
          "24",
          "36",
          "12",
          "18"
        ],
        correctAnswer: 0
      },
      {
        id: 10,
        category: "Fonctions",
        question: "Une fonction affine est de la forme :",
        options: [
          "f(x) = ax + b",
          "f(x) = ax²",
          "f(x) = a/x",
          "f(x) = √x"
        ],
        correctAnswer: 0
      }
    ]
  };

  const quizData = selectedGrade === '1APIC' ? quizData1APIC : quizData2APIC;

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

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4">Système d'Évaluation</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{programData[selectedProgram].evaluation.continuous.split(' - ')[0]}</div>
              <div className="text-green-700">{programData[selectedProgram].evaluation.continuous.split(' - ')[1]}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{programData[selectedProgram].evaluation.exams.split(' - ')[0]}</div>
              <div className="text-green-700">{programData[selectedProgram].evaluation.exams.split(' - ')[1]}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Projet</div>
              <div className="text-green-700">{programData[selectedProgram].evaluation.projects}</div>
            </div>
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

  if (homeworkView === 'devoir1') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir à Domicile - Mathématiques</h1>
            <p className="text-xl text-gray-600 mb-2">1ère Année Collège - Semestre 1</p>
            <p className="text-lg text-red-600 font-bold">Date de remise : 17 octobre 2025</p>
            <div className="mt-4 flex justify-center gap-4">
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
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Exercice 1: Opérations Fondamentales</h2>
              <div className="space-y-4 text-lg">
                <p><strong>1.</strong> Calculer : 125 + 348 - 97</p>
                <p><strong>2.</strong> Effectuer : 24 × 15 ÷ 6</p>
                <p><strong>3.</strong> Résoudre : 3x + 7 = 22</p>
                <p><strong>4.</strong> Développer : 2(x + 5) - 3(x - 2)</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Exercice 2: Fractions et Géométrie</h2>
              <div className="space-y-4 text-lg">
                <p><strong>1.</strong> Calculer : 2/3 + 5/6</p>
                <p><strong>2.</strong> Simplifier la fraction 18/24</p>
                <p><strong>3.</strong> Calculer l'aire d'un rectangle de 8cm par 5cm</p>
                <p><strong>4.</strong> Dans un triangle rectangle, si les côtés valent 6cm et 8cm, calculer l'hypoténuse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (homeworkView === 'devoir2') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir à Domicile - Mathématiques</h1>
            <p className="text-xl text-gray-600 mb-2">2ème Année Collège - Semestre 1</p>
            <p className="text-lg text-red-600 font-bold">Date de remise : 17 octobre 2025</p>
            <div className="mt-4 flex justify-center gap-4">
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
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Exercice 1: Nombres Relatifs (3.5 points)</h2>
              <div className="space-y-4 text-lg">
                <p><strong>1.</strong> Calculer puis simplifier si possible :</p>
                <div className="ml-8 space-y-2">
                  <p>D = 2,5 - (-1/2)</p>
                  <p>E = -3/4 + 0.25</p>
                  <p>F = 7/(-6) + (-1/4)</p>
                  <p>G = 3/8 + (7/-24) + 5/12</p>
                  <p>H = (3/10 - 2/5) + (-3/2 - 4/10)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Exercice 2: Expressions avec Parenthèses (2 points)</h2>
              <div className="space-y-4 text-lg">
                <p><strong>Enlever les parenthèses et les crochets puis calculer :</strong></p>
                <div className="ml-8 space-y-2">
                  <p>J = (-2/3 + 5/4) - [(5/12 - 7/4) + 4/3]</p>
                  <p>K = (5/6 - 1/2) + [(2/3 - 2/9) - 2]</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Exercice 3: Simplification des Rationnels</h2>
              <div className="space-y-4 text-lg">
                <p><strong>Simplifier les rationnels suivants :</strong></p>
                <div className="ml-8 space-y-2">
                  <p>M = [(-22) × (-35)] / [21 × (-55)]</p>
                  <p>N = 210 / (-84)</p>
                  <p>O = -234 / (-52)</p>
                  <p>P = 204 / 306</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Exercice 4: Résolution d'Équations</h2>
              <div className="space-y-4 text-lg">
                <p><strong>Déterminer la valeur de x dans chaque cas suivant :</strong></p>
                <div className="ml-8 space-y-2">
                  <p>(2x + 1)/(-3 + x) = 3/2</p>
                  <p>14/(-6) = 18/(-2x)</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Exercice 5: Calculs de Produits avec Réduction</h2>
              <div className="space-y-4 text-lg">
                <p><strong>Calculer les expressions suivantes avec réduction :</strong></p>
                <div className="ml-8 space-y-3">
                  <p>A = (1 - 1/2) × (1 - 1/3) × (1 - 1/4) × ... × (1 - 1/99) × (1 - 1/100)</p>
                  <p>B = (1 + 1/2) × (1 + 1/3) × (1 + 1/4) × ... × (1 + 1/99) × (1 + 1/100)</p>
                  <p>C = (100 - 1) × (100 - 2) × (100 - 3) × ... × (100 - 120)</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Exercice 6: Problèmes de Fraction</h2>
              <div className="space-y-6 text-lg">
                <div>
                  <p className="font-semibold mb-2">Problème 1 - Nabil et la tablette :</p>
                  <p>Nabil désire acheter une tablette. Le modèle qu'il souhaite coûte 2600 DH.</p>
                  <p>Sa maman lui donne 2/5 du prix et sa grand-mère lui donne 3/4 du reste.</p>
                  <p className="mt-2 font-semibold">Combien lui manque-t-il d'argent pour pouvoir s'acheter sa tablette ?</p>
                </div>
                
                <div>
                  <p className="font-semibold mb-2">Problème 2 - Saada et son argent de poche :</p>
                  <p>Saada a dépensé un tiers de ce qu'il lui restait d'argent de poche à la fête d'anniversaire.</p>
                  <p>Il lui restait 2/5 de ce que sa maman lui avait donné.</p>
                  <div className="ml-4 mt-2">
                    <p>1) Quelle fraction de son argent de poche a-t-il dépensé à la fête d'anniversaire ?</p>
                    <p>2) Sa maman lui avait donné 300 DH. Combien lui reste-t-il après la fête ?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
              <h2 className="text-2xl font-bold text-pink-800 mb-4 text-center">Exercice 7: Problèmes Complexes</h2>
              <div className="space-y-4 text-lg">
                <p><strong>1.</strong> Résoudre : (-5) + (+8) - (-3)</p>
                <p><strong>2.</strong> Effectuer : (-4) × (+6) ÷ (-2)</p>
                <p><strong>3.</strong> Résoudre : 2x - 7 = -15</p>
                <p><strong>4.</strong> Calculer : [(-3) + (+5)] × (-2)</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Consignes importantes :</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Tous les calculs doivent être détaillés</li>
              <li>Les résultats doivent être simplifiés lorsque c'est possible</li>
              <li>Rendre le devoir sur copie double</li>
              <li>Écrire lisiblement et organiser votre travail</li>
              <li>Justifier toutes vos réponses</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

  if (currentView === 'program') {
    return <ProgramSection />;
  }

  if (currentView === 'homework') {
    return <HomeworkSection />;
  }

  if (showStartForm) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-white border rounded-lg p-1 flex flex-wrap justify-center gap-1">
              <button
                onClick={() => setCurrentView('quiz')}
                className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                  currentView === 'quiz'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Test Diagnostique
              </button>
              <button
                onClick={() => setCurrentView('homework')}
                className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                  currentView === 'homework'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Devoirs
              </button>
              <button
                onClick={() => setCurrentView('program')}
                className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                  currentView === 'program'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Book className="w-4 h-4 mr-2" />
                Programme
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Mathématiques</h1>
            <p className="text-gray-600">Sélectionnez votre niveau et complétez vos informations</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Choisissez votre niveau :</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedGrade('1APIC')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedGrade === '1APIC'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">1APIC</div>
                  <div className="text-sm">Niveau débutant</div>
                  <div className="text-xs mt-2">10 questions - 45 minutes</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedGrade('2APIC')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedGrade === '2APIC'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">2APIC</div>
                  <div className="text-sm">Niveau avancé</div>
                  <div className="text-xs mt-2">12 questions - 60 minutes</div>
                </div>
              </button>
            </div>
          </div>

          {isStudentAlreadyCompleted && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <div>
                  <h3 className="font-semibold text-red-800">Test déjà effectué</h3>
                  <p className="text-red-700 text-sm mt-1">
                    Un test a déjà été passé avec ce nom, prénom et numéro de téléphone pour ce niveau.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div>
          
                <User className="w-4 h-4 inline mr-2" />
                Prénom *
              </label>
              <input
                type="text"
                value={studentInfo.firstName}
                onChange={(e) => {
                  setStudentInfo({...studentInfo, firstName: e.target.value});
                  setIsStudentAlreadyCompleted(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre prénom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nom *
              </label>
              <input
                type="text"
                value={studentInfo.lastName}
                onChange={(e) => {
                  setStudentInfo({...studentInfo, lastName: e.target.value});
                  setIsStudentAlreadyCompleted(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Numéro de téléphone *
              </label>
              <input
                type="tel"
                value={studentInfo.phoneNumber}
                onChange={(e) => {
                  setStudentInfo({...studentInfo, phoneNumber: e.target.value});
                  setIsStudentAlreadyCompleted(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre numéro de téléphone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Classe *
              </label>
              <select
                value={studentInfo.className}
                onChange={(e) => setStudentInfo({...studentInfo, className: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner votre classe</option>
                {selectedGrade === '1APIC' ? (
                  <>
                    <option value="1APIC A">1APIC A</option>
                    <option value="1APIC B">1APIC B</option>
                    <option value="1APIC C">1APIC C</option>
                    <option value="1APIC D">1APIC D</option>
                  </>
                ) : (
                  <>
                    <option value="2APIC A">2APIC A</option>
                    <option value="2APIC B">2APIC B</option>
                    <option value="2APIC C">2APIC C</option>
                    <option value="2APIC D">2APIC D</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Informations sur le test :</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Durée : {selectedGrade === '1APIC' ? '45 minutes' : '60 minutes'}</li>
              <li>• {quizData.totalQuestions} questions</li>
              <li>• Catégories : {Object.keys(quizData.questions.reduce((acc, q) => {
                acc[q.category] = true;
                return acc;
              }, {})).join(', ')}</li>
              <li>• Vous pouvez naviguer entre les questions</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            disabled={!studentInfo.firstName || !studentInfo.lastName || !studentInfo.phoneNumber || !studentInfo.className}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Commencer le Test {selectedGrade}
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              score.percentage >= 60 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {score.percentage >= 60 ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Résultats du Test
            </h2>
            <div className="text-5xl font-bold text-blue-600 my-4">
              {score.percentage}%
            </div>
            <p className="text-xl text-gray-600">
              {score.correct} / {score.total} réponses correctes
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {quizData.questions.map((question, index) => {
              const isCorrect = answers[question.id] === question.correctAnswer;
              const wasAnswered = answers[question.id] !== undefined;

              return (
                <div key={question.id} className={`p-4 rounded-lg border-2 ${
                  !wasAnswered ? 'border-gray-300 bg-gray-50' :
                  isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Question {index + 1} - {question.category}
                    </h3>
                    {wasAnswered ? (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-100 border border-green-400'
                            : wasAnswered && answers[question.id] === optIndex
                            ? 'bg-red-100 border border-red-400'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {option}
                        {optIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-semibold">✓ Correcte</span>
                        )}
                        {wasAnswered && answers[question.id] === optIndex && optIndex !== question.correctAnswer && (
                          <span className="ml-2 text-red-600 font-semibold">✗ Votre réponse</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {!wasAnswered && (
                    <p className="text-gray-500 text-sm mt-2">Non répondu</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={restartQuiz}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Test {selectedGrade}</h2>
              <p className="text-gray-600">{studentInfo.firstName} {studentInfo.lastName}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} sur {quizData.questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
              {currentQ.category}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[currentQ.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQ.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Précédent
            </button>

            {currentQuestion === quizData.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Terminer le test
                <CheckCircle className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quizData.questions.length - 1, currentQuestion + 1))}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Suivant
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-3">Progression</h4>
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {quizData.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-semibold transition-all ${
                  currentQuestion === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : answers[q.id] !== undefined
                    ? 'border-green-500 bg-green-100 text-green-700'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;
