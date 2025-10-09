import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, GraduationCap, Phone, AlertCircle, Home, BookOpen, ClipboardList, Book, Target, Printer } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

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
        question: "Résoudre : 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
        correctAnswer: 0
      },
      {
        id: 2,
        category: "Algèbre",
        question: "Développer : (x + 3)(x + 2)",
        options: ["x² + 5x + 6", "x² + 6x + 5", "x² + 3x + 2", "2x + 5"],
        correctAnswer: 0
      },
      {
        id: 3,
        category: "Géométrie",
        question: "Dans un triangle rectangle, si a=3 et b=4, alors c = ?",
        options: ["5", "7", "25", "12"],
        correctAnswer: 0
      },
      {
        id: 4,
        category: "Algèbre",
        question: "Résoudre : x + y = 10 et x - y = 2",
        options: ["x=6, y=4", "x=5, y=5", "x=8, y=2", "x=7, y=3"],
        correctAnswer: 0
      },
      {
        id: 5,
        category: "Géométrie",
        question: "L'aire d'un rectangle 8×5 est :",
        options: ["40", "13", "26", "80"],
        correctAnswer: 0
      },
      {
        id: 6,
        category: "Fonctions",
        question: "Si f(x) = 2x + 3, alors f(5) = ?",
        options: ["13", "10", "8", "16"],
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

  const checkStudentExists = async () => {
    try {
      const response = await fetch(`${API_URL}/check-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: studentInfo.firstName,
          lastName: studentInfo.lastName,
          phoneNumber: studentInfo.phoneNumber,
          grade: selectedGrade
        })
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Erreur vérification:', error);
      return false;
    }
  };

  const startQuiz = async () => {
    const exists = await checkStudentExists();
    if (exists) {
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

  const handleSubmit = async () => {
    setIsCompleted(true);
    setShowResults(true);
    
    const score = calculateScore();
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    try {
      await fetch(`${API_URL}/submit-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...studentInfo,
          grade: selectedGrade,
          answers,
          score: score.correct,
          percentage: score.percentage,
          timeSpent
        })
      });
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
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

  if (currentView === 'homework') {
    return (
      <div className="min-h-screen bg-gray-100 py-8
