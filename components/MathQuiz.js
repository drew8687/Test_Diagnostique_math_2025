import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, GraduationCap, Phone, AlertCircle, Home, BookOpen, ClipboardList, Book, Target, Printer } from 'lucide-react';

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showStartForm, setShowStartForm] = useState(true);
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
  const [startTime, setStartTime] = useState(null);

  // Charger les étudiants depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem('completedStudents');
    if (stored) {
      setCompletedStudents(JSON.parse(stored));
    }
  }, []);

  const quizData2APIC = {
    totalQuestions: 12,
    questions: [
      {
        id: 1,
        category: "Nombres Relatifs",
        question: "Calculer : (-5) + (+8) - (-3) = ?",
        options: ["6", "0", "16", "-10"],
        correctAnswer: 0
      },
      {
        id: 2,
        category: "Nombres Relatifs",
        question: "Effectuer : (-4) × (+6) ÷ (-2) = ?",
        options: ["12", "-12", "48", "-48"],
        correctAnswer: 0
      },
      {
        id: 3,
        category: "Nombres Rationnels",
        question: "Simplifier : 18/24 = ?",
        options: ["3/4", "2/3", "9/12", "6/8"],
        correctAnswer: 0
      },
      {
        id: 4,
        category: "Nombres Rationnels",
        question: "Calculer : 2/3 + 5/6 = ?",
        options: ["3/2", "7/9", "7/6", "1/2"],
        correctAnswer: 0
      },
      {
        id: 5,
        category: "Nombres Relatifs",
        question: "Résoudre : 2x - 7 = -15",
        options: ["x = -4", "x = 4", "x = -11", "x = 11"],
        correctAnswer: 0
      },
      {
        id: 6,
        category: "Nombres Rationnels",
        question: "Calculer : (-3/4) + (1/4) = ?",
        options: ["-1/2", "-2/4", "-1", "0"],
        correctAnswer: 0
      },
      {
        id: 7,
        category: "Nombres Relatifs",
        question: "Calculer : [(-3) + (+5)] × (-2) = ?",
        options: ["-4", "4", "-16", "16"],
        correctAnswer: 0
      },
      {
        id: 8,
        category: "Nombres Rationnels",
        question: "Le quotient de -22 par 11 est :",
        options: ["-2", "2", "-11", "11"],
        correctAnswer: 0
      },
      {
        id: 9,
        category: "Nombres Relatifs",
        question: "L'opposé de -7 est :",
        options: ["7", "-7", "1/7", "0"],
        correctAnswer: 0
      },
      {
        id: 10,
        category: "Nombres Rationnels",
        question: "Rendre irréductible : 210/84 = ?",
        options: ["5/2", "10/4", "105/42", "21/8"],
        correctAnswer: 0
      },
      {
        id: 11,
        category: "Nombres Relatifs",
        question: "Calculer : (-2)³ = ?",
        options: ["-8", "8", "-6", "6"],
        correctAnswer: 0
      },
      {
        id: 12,
        category: "Nombres Rationnels",
        question: "Comparer : -3/4 ... -2/3",
        options: ["-3/4 < -2/3", "-3/4 > -2/3", "-3/4 = -2/3", "Impossible"],
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
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 2,
        category: "Algèbre",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 3,
        category: "Géométrie",
        question: "Dans un triangle rectangle, si a=3 et b=4, alors c = ?",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 4,
        category: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 5,
        category: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 6,
        category: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      },
      {
        id: 7,
        category: "Fractions",
        question: "Calculer : 2/3 + 5/6 = ?",
        options: ["3/2", "7/9", "7/6", "1/2"],
        correctAnswer: 0
      },
      {
        id: 8,
        category: "Algèbre",
        question: "Simplifier : 3(x + 2) - 2(x - 1)",
        options: ["x + 8", "x + 4", "5x + 4", "x + 6"],
        correctAnswer: 0
      },
      {
        id: 9,
        category: "Géométrie",
        question: "Le périmètre d'un carré de côté 6 est :",
        options: ["24", "36", "12", "18"],
        correctAnswer: 0
      },
      {
        id: 10,
        category: "Fractions",
        question: "Simplifier : 18/24 = ?",
        options: ["3/4", "2/3", "9/12", "6/8"],
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
      handleSubmit();
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
    setStartTime(Date.now());
    setTimeRemaining(selectedGrade === '1APIC' ? 2700 : 3600);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: quizData.questions.length,
      percentage: Math.round((correct / quizData.questions.length) * 100)
    };
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setShowResults(true);
    const studentKey = `${studentInfo.firstName}_${studentInfo.lastName}_${studentInfo.phoneNumber}_${selectedGrade}`;
    const newCompleted = [...completedStudents, studentKey];
    setCompletedStudents(newCompleted);
    localStorage.setItem('completedStudents', JSON.stringify(newCompleted));
    
    // Sauvegarder les résultats
    const score = calculateScore();
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const results = JSON.parse(localStorage.getItem('testResults') || '[]');
    results.push({
      ...studentInfo,
      grade: selectedGrade,
      score: score.correct,
      percentage: score.percentage,
      timeSpent,
      completedAt: new Date().toISOString(),
      answers
    });
    localStorage.setItem('testResults', JSON.stringify(results));
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(selectedGrade === '1APIC' ? 2700 : 3600);
    setIsCompleted(false);
    setShowResults(false);
    setShowStartForm(true);
    setStudentInfo({ firstName: '', lastName: '', phoneNumber: '', className: '' });
    setIsStudentAlreadyCompleted(false);
    setStartTime(null);
  };

  const [homeworkView, setHomeworkView] = useState('selection');

  const handlePrint = () => {
    window.print();
  };

  if (currentView === 'homework') {
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
                <button onClick={() => setHomeworkView('devoir1')} className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  1ère Année APIC
                </button>
                <button onClick={() => setHomeworkView('devoir2')} className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-lg text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  2ème Année APIC
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button onClick={() => setCurrentView('quiz')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
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
              <p className="text-xl text-gray-600 mb-2">1ère Année APIC - Semestre 1</p>
              <p className="text-lg text-red-600 font-bold">Date de remise : 17 octobre 2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button onClick={() => setHomeworkView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

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

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Écrire lisiblement</li>
                <li>Mettre votre nom, prénom et classe</li>
              </ul>
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
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC - Semestre 1</p>
              <p className="text-lg text-red-600 font-bold">Date de remise : 17 octobre 2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button onClick={() => setHomeworkView('devoir2-v2')} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Version 2
                </button>
                <button onClick={() => setHomeworkView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Exercice 1: Nombres Relatifs </h2>
                <div className="space-y-4 text-lg">
                  <p><strong>1.</strong> Calculer : (-5) + (+8) - (-3)</p>
                  <p><strong>2.</strong> Effectuer : (-4) × (+6) ÷ (-2)</p>
                  <p><strong>3.</strong> Calculer : [(-3) + (+5)] × (-2)</p>
                  <p><strong>4.</strong> Résoudre l'équation : 2x - 7 = -15</p>
                  <p><strong>5.</strong> Calculer : (-2)³</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Exercice 2: Nombres Rationnels </h2>
                <div className="space-y-4 text-lg">
                  <p><strong>1.</strong> Simplifier : 18/24</p>
                  <p><strong>2.</strong> Calculer : 2/3 + 5/6</p>
                  <p><strong>3.</strong> Calculer : (-3/4) + (1/4)</p>
                  <p><strong>4.</strong> Rendre irréductible : 210/84</p>
                  <p><strong>5.</strong> Comparer : -3/4 et -2/3 (justifier)</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Exercice 3: Expressions avec Parenthèses </h2>
                <div className="space-y-4 text-lg">
                  <p><strong>1.</strong> Calculer : 2,5 - (-1/2)</p>
                  <p><strong>2.</strong> Calculer : -3/4 + 0,25</p>
                  <p><strong>3.</strong> Enlever les parenthèses et calculer : (2/3 - 5/4) - [(5/12 - 7/4) + 4/3]</p>
                  <p><strong>4.</strong> Calculer : 3/8 + (7/-24) + 5/12</p>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Exercice 4: Problèmes </h2>
                <div className="space-y-6 text-lg">
                  <div>
                    <p className="font-semibold mb-2">Problème 1 - La tablette de Nabil :</p>
                    <p>Nabil désire acheter une tablette qui coûte 2600 DH.</p>
                    <p>Sa maman lui donne 2/5 du prix et sa grand-mère lui donne 3/4 du reste.</p>
                    <p className="mt-2"><strong>a)</strong> Combien a-t-il reçu de sa maman ?</p>
                    <p><strong>b)</strong> Combien reste-t-il à payer après le don de sa maman ?</p>
                    <p><strong>c)</strong> Combien a-t-il reçu de sa grand-mère ?</p>
                    <p><strong>d)</strong> Combien lui manque-t-il pour acheter la tablette ?</p>
                  </div>
                  
                  <div className="mt-6">
                    <p className="font-semibold mb-2">Problème 2 - L'argent de poche de Saad :</p>
                    <p>Saad a reçu 300 DH de sa maman comme argent de poche.</p>
                    <p>À la fête d'anniversaire, il a dépensé 1/3 de ce qui lui restait.</p>
                    <p>Il lui restait 2/5 de ce que sa maman lui avait donné.</p>
                    <p className="mt-2"><strong>a)</strong> Combien lui restait-il avant la fête ?</p>
                    <p><strong>b)</strong> Quelle fraction de son argent a-t-il dépensé à la fête ?</p>
                    <p><strong>c)</strong> Combien lui reste-t-il après la fête ?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les résultats doivent être simplifiés</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
                <li>Respecter la date de remise</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // NOUVELLE VERSION AJOUTÉE
    if (homeworkView === 'devoir2-v2') {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Devoir à Domicile - Mathématiques</h1>
              <p className="text-xl text-gray-600 mb-2">2ème Année APIC - Semestre 1 - Version 2</p>
              <p className="text-lg text-red-600 font-bold">Date de remise : 17 octobre 2025</p>
              <div className="mt-4 flex justify-center gap-4 no-print">
                <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button onClick={() => setHomeworkView('devoir2')} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Version 1
                </button>
                <button onClick={() => setHomeworkView('selection')} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-blue-500 mb-3">Exercice 1 : Calculs avec nombres rationnels </div>
                <div className="exercise-content pl-4">
                  <p><strong>1) Calculer A, B et C tel que :</strong></p>
                  <div className="question mb-2">
                    A = 0,56 ÷ 7 × 100 + 2(5,2 - 8,7)
                  </div>
                  <div className="question mb-2">
                    B = (-12,7 + 7,6) × (1,2 - 2,1) ÷ (2,76 - 7,35)
                  </div>
                  <div className="question mb-4">
                    C = (-4,58 - 2,67) - (-15,2 + 2,5) × (1,9 - 1,3)
                  </div>
                  <p><strong>2) En déduire la valeur de A + B + C</strong></p>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-green-500 mb-3">Exercice 2 : Fractions - Calculs et simplifications </div>
                <div className="exercise-content pl-4">
                  <p><strong>1) Calculer puis simplifier si possible ce qui suit :</strong></p>
                  <div className="question mb-2">
                    D = 5/7 + (-2/3)
                  </div>
                  <div className="question mb-2">
                    E = -3/5 + 0,7
                  </div>
                  <div className="question mb-2">
                    F = 13/(-18) - 11/12
                  </div>
                  <div className="question mb-2">
                    G = 11/16 + (-30/32) + 15/24
                  </div>
                  <div className="question mb-2">
                    H = 17/13 + (-33/39) - 13/26
                  </div>
                  <div className="question mb-2">
                    I = (17/14 + 11/21) + (-22/42 + 11/14)
                  </div>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-purple-500 mb-3">Exercice 3 : Expression avec paramètres </div>
                <div className="exercise-content pl-4">
                  <p><em>a</em> et <em>b</em> sont deux rationnels non nuls.</p>
                  <p><strong>Calculer l'expression :</strong></p>
                  <div className="question mb-2">
                    J = 1/2 - (5 - a) - 2(b + 7/2) &nbsp;&nbsp; si &nbsp; a - 2b = -3
                  </div>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-orange-500 mb-3">Exercice 4 : Enlever les parenthèses et calculer </div>
                <div className="exercise-content pl-4">
                  <p><strong>Enlever les parenthèses et les crochets puis calculer I et J tel que :</strong></p>
                  <div className="question mb-2">
                    I = (-7/6 + 5/9) - [(11/12 + 8/9) - 13/6]
                  </div>
                  <div className="question mb-2">
                    J = 5/16 - [(9/8 + 27/12) - (11/4 - 15/24)]
                  </div>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-red-500 mb-3">Exercice 5 : Simplification des fractions </div>
                <div className="exercise-content pl-4">
                  <p><strong>Simplifier les rationnels suivants :</strong></p>
                  <div className="question mb-2">
                    M = [(-22) × (-35)] / [21 × (-55)]
                  </div>
                  <div className="question mb-2">
                    N = 210 / (-84)
                  </div>
                  <div className="question mb-2">
                    O = (-234) / (-52)
                  </div>
                  <div className="question mb-2">
                    P = 204 / 306
                  </div>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-indigo-500 mb-3">Exercice 6 : Équations </div>
                <div className="exercise-content pl-4">
                  <p><strong>Déterminer la valeur de <em>x</em> dans chaque cas suivant :</strong></p>
                  <div className="question mb-2">
                    (2x + 1) / (-3 + x) = 3/2
                  </div>
                  <div className="question mb-2">
                    14 / (-6) = 18 / (-2x)
                  </div>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-teal-500 mb-3">Exercice 7 : Expression algébrique </div>
                <div className="exercise-content pl-4">
                  <p><em>x</em> est un nombre rationnel.</p>
                  <p><strong>1. Simplifier l'expression suivante :</strong> <em>(1 point)</em></p>
                  <div className="question mb-4">
                    L = (3x - 2)/6 + (7x + 5)/12
                  </div>
                  <p><strong>2. Calculer L pour x = 2/13</strong> <em>(0,5 point)</em></p>
                </div>
              </div>

              <div className="exercise">
                <div className="exercise-title bg-gray-100 p-3 font-bold border-l-4 border-pink-500 mb-3">Exercice 8 : Problème </div>
                <div className="exercise-content pl-4">
                  <p>
                    Un commerçant fait le bilan de sa journée. Le matin, il a gagné (+350) dirhams. L'après-midi, il a eu des dépenses de (-180) dirhams pour acheter de la marchandise. En fin de journée, il a vendu pour (+420) dirhams, mais il a dû payer une facture de (-95) dirhams.
                  </p>
                  <p><strong>Questions :</strong></p>
                  <div className="question mb-4">
                    <strong>1)</strong> Écrire une expression qui représente le bilan total de la journée du commerçant. <em>(1 point)</em>
                    <br/><br/>
                    Expression : _______________________________________________
                  </div>
                  <div className="question">
                    <strong>2)</strong> Calculer ce bilan total. Le commerçant a-t-il gagné ou perdu de l'argent ? Combien ? <em>(1 point)</em>
                    <br/><br/>
                    Calcul : _______________________________________________
                    <br/><br/>
                    Réponse : _______________________________________________
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 no-print">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📝 Consignes importantes :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tous les calculs doivent être détaillés et justifiés</li>
                <li>Les résultats doivent être simplifiés</li>
                <li>Rendre le devoir sur copie double</li>
                <li>Écrire lisiblement et organiser votre travail</li>
                <li>Mettre votre nom, prénom et classe sur la première page</li>
                <li>Respecter la date de remise</li>
                <li>Barème total : 16 </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  if (currentView === 'program') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Programme {selectedProgram}</h1>
          <p className="text-gray-600">Mathématiques - Section à définir </p>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={() => setCurrentView('quiz')} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            Retour au Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showStartForm) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-white border rounded-lg p-1 flex flex-wrap justify-center gap-1">
              <button onClick={() => setCurrentView('homework')} className={`px-4 py-2 rounded-md flex items-center transition-colors ${currentView === 'homework' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <BookOpen className="w-4 h-4 mr-2" />
                Devoirs
              </button>
              <button onClick={() => setCurrentView('program')} className={`px-4 py-2 rounded-md flex items-center transition-colors ${currentView === 'program' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
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
              <button onClick={() => setSelectedGrade('1APIC')} className={`p-6 rounded-lg border-2 transition-all ${selectedGrade === '1APIC' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">1APIC</div>
                  <div className="text-sm">10 questions - 45 min</div>
                </div>
              </button>
              <button onClick={() => setSelectedGrade('2APIC')} className={`p-6 rounded-lg border-2 transition-all ${selectedGrade === '2APIC' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">2APIC</div>
                  <div className="text-sm">12 questions - 60 min</div>
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
                  <p className="text-red-700 text-sm mt-1">Un test a déjà été passé avec ces informations.</p>
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
              <input type="text" value={studentInfo.firstName} onChange={(e) => { setStudentInfo({...studentInfo, firstName: e.target.value}); setIsStudentAlreadyCompleted(false); }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Votre prénom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nom *
              </label>
              <input type="text" value={studentInfo.lastName} onChange={(e) => { setStudentInfo({...studentInfo, lastName: e.target.value}); setIsStudentAlreadyCompleted(false); }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Votre nom" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Numéro de téléphone *
              </label>
              <input type="tel" value={studentInfo.phoneNumber} onChange={(e) => { setStudentInfo({...studentInfo, phoneNumber: e.target.value}); setIsStudentAlreadyCompleted(false); }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Votre numéro" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Classe *
              </label>
              <select value={studentInfo.className} onChange={(e) => setStudentInfo({...studentInfo, className: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
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

          <button onClick={startQuiz} disabled={!studentInfo.firstName || !studentInfo.lastName || !studentInfo.phoneNumber || !studentInfo.className} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
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
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${score.percentage >= 60 ? 'bg-green-100' : 'bg-red-100'}`}>
              {score.percentage >= 60 ? <CheckCircle className="w-10 h-10 text-green-600" /> : <XCircle className="w-10 h-10 text-red-600" />}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Résultats du Test</h2>
            <div className="text-5xl font-bold text-blue-600 my-4">{score.percentage}%</div>
            <p className="text-xl text-gray-600">{score.correct} / {score.total} réponses correctes</p>
          </div>

          <div className="space-y-4 mb-8">
            {quizData.questions.map((question, index) => {
              const isCorrect = answers[question.id] === question.correctAnswer;
              const wasAnswered = answers[question.id] !== undefined;
              return (
                <div key={question.id} className={`p-4 rounded-lg border-2 ${!wasAnswered ? 'border-gray-300 bg-gray-50' : isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">Question {index + 1} - {question.category}</h3>
                    {wasAnswered ? (isCorrect ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />) : <AlertCircle className="w-5 h-5 text-gray-400" />}
                  </div>
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className={`p-2 rounded ${optIndex === question.correctAnswer ? 'bg-green-100 border border-green-400' : wasAnswered && answers[question.id] === optIndex ? 'bg-red-100 border border-red-400' : 'bg-white border border-gray-200'}`}>
                        {option}
                        {optIndex === question.correctAnswer && <span className="ml-2 text-green-600 font-semibold">✓ Correcte</span>}
                        {wasAnswered && answers[question.id] === optIndex && optIndex !== question.correctAnswer && <span className="ml-2 text-red-600 font-semibold">✗ Votre réponse</span>}
                      </div>
                    ))}
                  </div>
                  {!wasAnswered && <p className="text-gray-500 text-sm mt-2">Non répondu</p>}
                </div>
              );
            })}
          </div>

          <button onClick={restartQuiz} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <RotateCcw className="w-5 h-5 mr-2" />
            Recommencer
          </button>
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
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeRemaining < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
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
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">{currentQ.category}</span>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQ.question}</h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerSelect(currentQ.id, index)} className={`w-full p-4 text-left rounded-lg border-2 transition-all ${answers[currentQ.id] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${answers[currentQ.id] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {answers[currentQ.id] === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Précédent
            </button>

            {currentQuestion === quizData.questions.length - 1 ? (
              <button onClick={handleSubmit} className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Terminer
                <CheckCircle className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button onClick={() => setCurrentQuestion(Math.min(quizData.questions.length - 1, currentQuestion + 1))} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              <button key={q.id} onClick={() => setCurrentQuestion(index)} className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-semibold transition-all ${currentQuestion === index ? 'border-blue-500 bg-blue-500 text-white' : answers[q.id] !== undefined ? 'border-green-500 bg-green-100 text-green-700' : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'}`}>
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
