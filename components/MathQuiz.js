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

  const programData = {
    '1APIC': {
      title: "Programme Mathématiques 1APIC",
      description: "Année préparatoire intégrée en cycle d'ingénieur",
      objectives: [
        "Acquérir les bases fondamentales en mathématiques",
        "Développer la rigueur de raisonnement",
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
            "Utiliser la distributivité dans les deux sens"
          ],
          extensions: [
            "Développement et factorisation les nombres fractionnaires",
            "La priorité dans le calcul (utilisation des parenthèses)",
            "Les nombres rationnels",
            "Les puissances"
          ]
        },
        {
          id: 2,
          title: "Leçon 2 : Les Nombres Fractionnaires",
          prerequisites: [
            "Réduire une fraction",
            "Réduire au même dénominateur deux fractions",
            "Comparer deux fractions",
            "Opérations sur les fractions",
            "Vocabulaire correspondant aux quatre opérations",
            "Calcul d'une expression numérique",
            "Les fractions"
          ],
          objectives: [
            "Expression d'un nombre par différentes écritures fractionnaires",
            "Multiplication de deux nombres fractionnaires",
            "Rendre entier naturel le dénominateur d'un nombre",
            "Compréhension, addition et soustraction des fractions",
            "L'encadrement décimal d'une fraction"
          ],
          content: [
            "Égalité de deux fractions",
            "Comparaison de deux fractions",
            "Addition et soustraction des fractions",
            "Multiplication des fractions",
            "Division des fractions"
          ],
          extensions: [
            "Opérations sur les nombres décimaux relatifs",
            "Opérations sur les nombres rationnels",
            "Proportionnalité",
            "Réductibilité d'une fraction"
          ]
        }
      ],
      evaluation: {
        continuous: "40% - Contrôles continus et devoirs",
        exams: "60% - Examens semestriels",
        projects: "Projet de fin de module"
      },
      resources: [
        "Manuel de mathématiques 1APIC",
        "Cahier d'exercices",
        "Plateforme en ligne d'entraînement",
        "Séances de tutorat"
      ]
    },
    '2APIC': {
      title: "Programme Mathématiques 2APIC",
      description: "Approfondissement des concepts mathématiques pour l'ingénierie",
      objectives: [
        "Maîtriser les outils mathématiques avancés",
        "Développer l'abstraction et la modélisation",
        "Préparer aux mathématiques de l'ingénieur"
      ],
      modules: [
        {
          id: 1,
          title: "Algèbre Avancée",
          duration: "7 semaines",
          chapters: [
            "Nombres complexes",
            "Polynômes et équations polynomiales",
            "Espaces vectoriels",
            "Applications linéaires",
            "Déterminants et valeurs propres"
          ],
          skills: ["Abstraction algébrique", "Résolution de systèmes", "Calcul matriciel"]
        },
        {
          id: 2,
          title: "Analyse Mathématique",
          duration: "8 semaines",
          chapters: [
            "Limites et continuité",
            "Dérivation et applications",
            "Intégration et calcul d'aires",
            "Équations différentielles",
            "Suites et séries numériques"
          ],
          skills: ["Raisonnement analytique", "Modélisation continue", "Optimisation"]
        },
        {
          id: 3,
          title: "Géométrie Analytique",
          duration: "6 semaines",
          chapters: [
            "Géométrie dans l'espace",
            "Produit scalaire et vectoriel",
            "Droites et plans",
            "Courbes paramétrées",
            "Coniques et quadriques"
          ],
          skills: ["Visualisation 3D", "Coordination spatiale", "Représentation paramétrique"]
        },
        {
          id: 4,
          title: "Probabilités et Statistiques Avancées",
          duration: "5 semaines",
          chapters: [
            "Variables aléatoires",
            "Lois de probabilité",
            "Estimation et tests",
            "Régression linéaire",
            "Simulation et modélisation"
          ],
          skills: ["Analyse statistique", "Inférence", "Modélisation aléatoire"]
        },
        {
          id: 5,
          title: "Mathématiques pour l'Ingénieur",
          duration: "4 semaines",
          chapters: [
            "Transformation de Fourier",
            "Équations aux dérivées partielles",
            "Méthodes numériques",
            "Optimisation sous contraintes",
            "Applications industrielles"
          ],
          skills: ["Résolution numérique", "Modélisation physique", "Optimisation"]
        }
      ],
      evaluation: {
        continuous: "35% - Contrôles continus et projets",
        exams: "50% - Examens semestriels",
        projects: "15% - Projet d'application"
      },
      resources: [
        "Ouvrages de mathématiques avancées",
        "Logiciels de calcul (Python, MATLAB)",
        "Banque d'exercices avancés",
        "Séminaires d'application"
      ]
    }
  };

  const homeworkData = {
    '1APIC': [
      {
        id: 1,
        title: "Devoir 1 - Algèbre de base",
        dueDate: "15/10/2024",
        subject: "Équations et inéquations",
        exercises: [
          "Résoudre 3x + 5 = 20",
          "Résoudre le système: x + y = 10 et 2x - y = 5",
          "Développer (x + 3)(x - 2)"
        ]
      },
      {
        id: 2,
        title: "Devoir 2 - Géométrie",
        dueDate: "22/10/2024",
        subject: "Triangles et théorème de Pythagore",
        exercises: [
          "Calculer l'aire d'un triangle de base 6cm et hauteur 4cm",
          "Dans un triangle rectangle, si a=3 et b=4, calculer c"
        ]
      }
    ],
    '2APIC': [
      {
        id: 1,
        title: "Devoir 1 - Nombres Complexes",
        dueDate: "15/10/2024",
        subject: "Forme algébrique et trigonométrique",
        exercises: [
          "Calculer (2 + 3i)(1 - i)",
          "Déterminer le module et l'argument de z = -1 + i√3",
          "Résoudre z² + 2z + 2 = 0 dans ℂ"
        ]
      },
      {
        id: 2,
        title: "Devoir 2 - Analyse",
        dueDate: "22/10/2024",
        subject: "Dérivation et étude de fonctions",
        exercises: [
          "Calculer la dérivée de f(x) = x³ - 2x² + 5x - 1",
          "Étudier les variations de g(x) = x²e^(-x)",
          "Déterminer l'équation de la tangente en x=1"
        ]
      }
    ]
  };

  const quizData2APIC = {
    totalQuestions: 12,
    questions: [
      {
        id: 1,
        category: "Algèbre",
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
        category: "Analyse",
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
        category: "Géométrie",
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
        category: "Analyse",
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
        category: "Algèbre",
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
        category: "Probabilités",
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
        category: "Analyse",
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
        category: "Algèbre",
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
        category: "Géométrie",
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
        category: "Analyse",
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
        category: "Probabilités",
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
        category: "Algèbre",
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
    const currentProgram = programData[selectedGrade];

    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentProgram.title}</h1>
          <p className="text-gray-600">{currentProgram.description}</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Objectifs du Programme
          </h2>
          <ul className="space-y-2">
            {currentProgram.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-blue-900">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedGrade === '1APIC' ? (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Leçons du Programme
            </h2>
            <div className="space-y-8">
              {currentProgram.lessons.map((lesson) => (
                <div key={lesson.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{lesson.title}</h3>
                  
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
                      <h4 className="font-semibold text-gray-700 mb-3 bg-blue-50 p-2 rounded">Capacités attendues :</h4>
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
                      <h4 className="font-semibold text-gray-700 mb-3 bg-purple-50 p-2 rounded">Contenu du cours :</h4>
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

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-3 bg-yellow-50 p-2 rounded">Extensions :</h4>
                    <ul className="space-y-2">
                      {lesson.extensions.map((extension, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{extension}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Modules du Programme
            </h2>
            <div className="space-y-6">
              {currentProgram.modules.map((module) => (
                <div key={module.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Module {module.id} : {module.title}
                      </h3>
                      <p className="text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Durée : {module.duration}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Chapitres :</h4>
                      <ul className="space-y-2">
                        {module.chapters.map((chapter, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{chapter}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Compétences visées :</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4">Système d'Évaluation</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{currentProgram.evaluation.continuous.split(' - ')[0]}</div>
              <div className="text-green-700">{currentProgram.evaluation.continuous.split(' - ')[1]}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{currentProgram.evaluation.exams.split(' - ')[0]}</div>
              <div className="text-green-700">{currentProgram.evaluation.exams.split(' - ')[1]}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Projet</div>
              <div className="text-green-700">{currentProgram.evaluation.projects}</div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Ressources Pédagogiques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentProgram.resources.map((resource, index) => (
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
          <style>
            {`
              @media print {
                body { margin: 0; background: white; }
                .no-print { display: none !important; }
                .print-container { box-shadow: none; }
              }
            `}
          </style>
          <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print-container" style={{ fontFamily: "'Times New Roman', serif" }}>
            <div className="text-center border-b-4 border-black pb-4 mb-6">
              <p className="font-bold">Royaume du Maroc</p>
              <p className="font-bold">Collège Mouad Ibn Jabal</p>
              <h1 className="text-3xl font-bold my-2">DEVOIR À DOMICILE N°1</h1>
              <p>Mathématiques - 1ère Année Collège</p>
              <p>Semestre 1 - Année scolaire 2025/2026</p>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-500 p-3 text-center font-bold text-yellow-800 my-4 rounded">
              ⏰ Date de remise : Jeudi 17 octobre 2025
            </div>

            <div className="flex justify-between text-sm my-5">
              <div><strong>Nom et Prénom :</strong> _________________________</div>
              <div><strong>Classe :</strong> ___________</div>
            </div>

            <p className="italic text-sm text-gray-600 mb-6">La présentation, la rédaction et la propreté sont prises en compte dans la notation.</p>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 1 : Opérations sur les nombres entiers</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Calculer les expressions suivantes en détaillant les étapes :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> A = 156 + 289 - 127 = ___________</p>
                  <p><strong>2)</strong> B = 48 × 23 = ___________</p>
                  <p><strong>3)</strong> C = (64 + 16) × 8 - 240 = ___________</p>
                  <p><strong>4)</strong> D = 25 + 15 × 4 - 36 ÷ 6 = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 2 : Opérations sur les nombres décimaux</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Effectuer les calculs suivants :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> E = 15,75 + 8,48 = ___________</p>
                  <p><strong>2)</strong> F = 32,6 - 18,95 = ___________</p>
                  <p><strong>3)</strong> G = 4,5 × 3,2 = ___________</p>
                  <p><strong>4)</strong> H = (22,5 + 7,5) × 0,6 = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 3 : Opérations sur les fractions</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Calculer et simplifier si possible :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> I = 3/7 + 2/7 = ___________</p>
                  <p><strong>2)</strong> J = 5/6 - 1/6 = ___________</p>
                  <p><strong>3)</strong> K = 3/4 × 8/9 = ___________</p>
                  <p><strong>4)</strong> L = 5/8 + 3/4 = ___________ <span className="text-sm italic text-gray-600">(mettre au même dénominateur)</span></p>
                  <p><strong>5)</strong> M = 7/10 - 2/5 = ___________ <span className="text-sm italic text-gray-600">(mettre au même dénominateur)</span></p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 4 : Droite graduée et fractions</div>
              <div className="pl-4">
                <p className="mb-3"><strong>1)</strong> Placer les fractions suivantes sur la droite graduée ci-dessous :</p>
                <p className="ml-5 mb-4">A = 1/4  ;  B = 3/4  ;  C = 5/4  ;  D = 7/4</p>
                <div className="my-6">
                  <svg width="600" height="80" className="mx-auto block">
                    <line x1="50" y1="40" x2="550" y2="40" stroke="black" strokeWidth="2"/>
                    <line x1="50" y1="35" x2="50" y2="45" stroke="black" strokeWidth="2"/>
                    <text x="50" y="60" textAnchor="middle" fontSize="14">0</text>
                    <line x1="175" y1="35" x2="175" y2="45" stroke="black" strokeWidth="2"/>
                    <text x="175" y="60" textAnchor="middle" fontSize="14">1</text>
                    <line x1="300" y1="35" x2="300" y2="45" stroke="black" strokeWidth="2"/>
                    <text x="300" y="60" textAnchor="middle" fontSize="14">2</text>
                    <line x1="425" y1="35" x2="425" y2="45" stroke="black" strokeWidth="2"/>
                    <text x="425" y="60" textAnchor="middle" fontSize="14">3</text>
                    <line x1="550" y1="35" x2="550" y2="45" stroke="black" strokeWidth="2"/>
                    <text x="550" y="60" textAnchor="middle" fontSize="14">4</text>
                  </svg>
                </div>
                <p className="mb-3"><strong>2)</strong> Compléter avec &lt; , &gt; ou = :</p>
                <div className="space-y-2">
                  <p><strong>a)</strong> 3/5 ___ 2/5</p>
                  <p><strong>b)</strong> 4/7 ___ 5/7</p>
                  <p><strong>c)</strong> 6/8 ___ 3/4</p>
                  <p><strong>d)</strong> 5/10 ___ 1/2</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 5 : Problème</div>
              <div className="pl-4">
                <p className="mb-4">
                  Ahmed possède une corde de 12,5 mètres. Il utilise 2/5 de cette corde pour attacher des plantes dans son jardin, puis il coupe 3,8 mètres pour un autre usage.
                </p>
                <p className="font-bold mb-3">Questions :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> Quelle longueur de corde a-t-il utilisée pour les plantes ?</p>
                  <p><strong>2)</strong> Quelle longueur totale de corde a-t-il utilisée ?</p>
                  <p><strong>3)</strong> Quelle longueur de corde lui reste-t-il ?</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 font-bold text-lg">
              Bon travail !
            </div>

            <div className="flex justify-center gap-4 mt-8 no-print">
              <button
                onClick={() => setHomeworkView('selection')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger en PDF
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (homeworkView === 'devoir2') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <style>
            {`
              @media print {
                body { margin: 0; background: white; }
                .no-print { display: none !important; }
                .print-container { box-shadow: none; }
              }
            `}
          </style>
          <div className="max-w-4xl mx-auto bg-white p-12 shadow-lg print-container" style={{ fontFamily: "'Times New Roman', serif" }}>
            <div className="text-center border-b-4 border-black pb-4 mb-6">
              <p className="font-bold">Royaume du Maroc</p>
              <p className="font-bold">Collège Mouad Ibn Jabal</p>
              <h1 className="text-3xl font-bold my-2">DEVOIR À DOMICILE N°1</h1>
              <p>Mathématiques - 2ème Année Collège</p>
              <p>Semestre 1 - Année scolaire 2025/2026</p>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-500 p-3 text-center font-bold text-yellow-800 my-4 rounded">
              ⏰ Date de remise : Jeudi 17 octobre 2025
            </div>

            <div className="flex justify-between text-sm my-5">
              <div><strong>Nom et Prénom :</strong> _________________________</div>
              <div><strong>Classe :</strong> ___________</div>
            </div>

            <p className="italic text-sm text-gray-600 mb-6">La présentation, la rédaction et la propreté sont prises en compte dans la notation.</p>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 1 : Addition et soustraction des nombres rationnels</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Calculer les expressions suivantes :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> A = (+7) + (-3) = ___________</p>
                  <p><strong>2)</strong> B = (-12) + (+8) = ___________</p>
                  <p><strong>3)</strong> C = (-5) + (-9) = ___________</p>
                  <p><strong>4)</strong> D = (+15) - (+6) = ___________</p>
                  <p><strong>5)</strong> E = (-8) - (-11) = ___________</p>
                  <p><strong>6)</strong> F = (+4) - (-7) + (-3) = ___________</p>
                  <p><strong>7)</strong> G = (-10) + (+5) - (-2) - (+8) = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 2 : Multiplication et division des nombres rationnels</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Effectuer les calculs suivants :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> H = (+6) × (-4) = ___________</p>
                  <p><strong>2)</strong> I = (-7) × (-5) = ___________</p>
                  <p><strong>3)</strong> J = (+3) × (-2) × (-5) = ___________</p>
                  <p><strong>4)</strong> K = (-24) ÷ (+6) = ___________</p>
                  <p><strong>5)</strong> L = (-36) ÷ (-9) = ___________</p>
                  <p><strong>6)</strong> M = [(+8) × (-3)] ÷ (-4) = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 3 : Calculs avec nombres rationnels décimaux</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Calculer :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> N = (+7,5) + (-3,8) = ___________</p>
                  <p><strong>2)</strong> P = (-12,6) - (+5,4) = ___________</p>
                  <p><strong>3)</strong> Q = (-4,5) × (+2,4) = ___________</p>
                  <p><strong>4)</strong> R = (-18,9) ÷ (-3) = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 4 : Expressions numériques complexes</div>
              <div className="pl-4">
                <p className="font-bold mb-3">Calculer en détaillant les étapes :</p>
                <div className="space-y-3">
                  <p><strong>1)</strong> S = (-5) + (+8) × (-2) = ___________</p>
                  <p><strong>2)</strong> T = [(-6) - (+4)] × (+5) = ___________</p>
                  <p><strong>3)</strong> U = (-12) ÷ [(+3) + (-1)] = ___________</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-100 p-3 font-bold border-l-4 border-black mb-3">Exercice 5 : Problème</div>
              <div className="pl-4">
                <p className="mb-4">
                  Un commerçant fait le bilan de sa journée. Le matin, il a gagné (+350) dirhams. L'après-midi, il a eu des dépenses de (-180) dirhams pour acheter de la marchandise. En fin de journée, il a vendu pour (+420) dirhams, mais il a dû payer une facture de (-95) dirhams.
                </p>
                <p className="font-bold mb-3">Questions :</p>
                <div className="space-y-4">
                  <div>
                    <p><strong>1)</strong> Écrire une expression qui représente le bilan total de la journée du commerçant.</p>
                    <p className="mt-2">Expression : _______________________________________________</p>
                  </div>
                  <div>
                    <p><strong>2)</strong> Calculer ce bilan total. Le commerçant a-t-il gagné ou perdu de l'argent ? Combien ?</p>
                    <p className="mt-2">Calcul : _______________________________________________</p>
                    <p className="mt-2">Réponse : _______________________________________________</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 font-bold text-lg">
              Bon travail !
            </div>

            <div className="flex justify-center gap-4 mt-8 no-print">
              <button
                onClick={() => setHomeworkView('selection')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Retour
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger en PDF
              </button>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
