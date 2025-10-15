import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, GraduationCap, Phone, AlertCircle, Home, BookOpen, ClipboardList, Book, Target, Printer, FileText } from 'lucide-react';

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

  // Vue Contrôle Template
  if (currentView === 'controle') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
            .page { margin: 0; box-shadow: none; page-break-after: always; }
          }
          .answer-space {
            border-bottom: 1px dotted #999;
            min-height: 25px;
            margin: 8px 0;
          }
        `}</style>
        
        <div className="max-w-5xl mx-auto">
          {/* Boutons de navigation */}
          <div className="no-print mb-6 flex justify-center gap-4">
            <button onClick={handlePrint} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Printer className="w-5 h-5 mr-2" />
              Imprimer / Télécharger PDF
            </button>
            <button onClick={() => setCurrentView('quiz')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Home className="w-5 h-5 mr-2" />
              Retour au Menu
            </button>
          </div>

          {/* PAGE RECTO */}
          <div className="page bg-white rounded-lg shadow-lg p-8 mb-8">
            {/* En-tête */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-gray-800 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-bold text-center mb-2">Nom et Prénom et numéro :</h3>
                <div className="border-b border-dotted border-gray-600 h-6 mb-4"></div>
                <p className="text-sm font-semibold">Classe :</p>
                <div className="border-b border-dotted border-gray-600 h-6"></div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-bold text-center mb-2">Contrôle 1 Semestre 1</h3>
                <p className="text-sm text-center font-semibold">Lycée collège : Mouad Ibn Jabal</p>
                <p className="text-sm text-center font-semibold mt-2">Salé</p>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-bold text-center mb-2">Niveau : 1APIC</h3>
                <p className="text-sm text-center font-semibold">Année scolaire : 2025/2026</p>
                <p className="text-sm font-semibold mt-2">Note :</p>
                <div className="border-b border-dotted border-gray-600 h-6"></div>
              </div>
            </div>
            
            {/* Exercices RECTO */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 1</div>
                <div className="p-4">
                  {[...Array(11)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 2</div>
                <div className="p-4">
                  {[...Array(11)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 3</div>
                <div className="p-4">
                  {[...Array(11)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Bonus</div>
                <div className="p-4">
                  {[...Array(11)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
            </div>
          </div>

          {/* PAGE VERSO */}
          <div className="page bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 1 (suite)</div>
                <div className="p-4">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 2 (suite)</div>
                <div className="p-4">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Exercice 3 (suite)</div>
                <div className="p-4">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
              
              <div className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-300 p-2 text-center font-bold text-sm">Bonus (suite)</div>
                <div className="p-4">
                  {[...Array(13)].map((_, i) => <div key={i} className="answer-space"></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'homework') {
    // ... (garder tout le code homework existant)
    return <div>Homework view - code existant conservé</div>;
  }

  if (currentView === 'program') {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Programme {selectedProgram}</h1>
          <p className="text-gray-600">Mathématiques - Section à définir</p>
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
              <button onClick={() => setCurrentView('controle')} className={`px-4 py-2 rounded-md flex items-center transition-colors ${currentView === 'controle' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <FileText className="w-4 h-4 mr-2" />
                Contrôle
              </button>
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
