import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, User, GraduationCap, FileText, Download, AlertCircle, Mail, Phone, Printer } from 'lucide-react';

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
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
  const [selectedGrade, setSelectedGrade] = useState('2APIC'); // '1APIC' ou '2APIC'

  // Quiz data pour 2APIC
  const quizData2APIC = {
    title: "Test Diagnostique - Mathématiques 2APIC",
    description: "Évaluation des compétences fondamentales en mathématiques",
    totalQuestions: 12,
    questions: [
      {
        id: 'q1',
        category: 'Algèbre',
        question: 'Calculer : 3 + 5 × 2 - 4',
        type: 'multiple_choice',
        points: 2,
        options: ['A) 9', 'B) 12', 'C) 16', 'D) 7'],
        correctAnswer: 'A'
      },
      {
        id: 'q2',
        category: 'Algèbre',
        question: 'Si 3 bonbons coûtent 4.5 DH, combien coûte 1 bonbon ?',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 1.5 DH', 'B) 1.2 DH', 'C) 1.8 DH', 'D) 2 DH'],
        correctAnswer: 'A'
      },
      {
        id: 'q3',
        category: 'Algèbre',
        question: 'Calculer : (-3) × (+2) + (-4) ÷ (+2)',
        type: 'multiple_choice',
        points: 3,
        options: ['A) -8', 'B) -4', 'C) -10', 'D) -2'],
        correctAnswer: 'A'
      },
      {
        id: 'q4',
        category: 'Algèbre',
        question: 'Développer : 2(x + 3)',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 2x + 6', 'B) 2x + 3', 'C) x + 6', 'D) 2x + 9'],
        correctAnswer: 'A'
      },
      {
        id: 'q5',
        category: 'Algèbre',
        question: 'Factoriser : 4x + 12',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 4(x + 3)', 'B) 4x + 3', 'C) x(4 + 12)', 'D) 4 + x + 12'],
        correctAnswer: 'A'
      },
      {
        id: 'q6',
        category: 'Algèbre',
        question: 'Calculer : 3/4 + 1/2',
        type: 'multiple_choice',
        points: 2,
        options: ['A) 5/4', 'B) 4/6', 'C) 5/6', 'D) 1'],
        correctAnswer: 'A'
      },
      {
        id: 'q7',
        category: 'Algèbre',
        question: 'Écrire en notation scientifique : 0.0025',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 2.5 × 10⁻³', 'B) 25 × 10⁻⁴', 'C) 0.25 × 10⁻²', 'D) 2.5 × 10³'],
        correctAnswer: 'A'
      },
      {
        id: 'q8',
        category: 'Algèbre',
        question: 'Le signe de (-2)⁴ est :',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) Positif', 'B) Négatif', 'C) Nul', 'D) Indéterminé'],
        correctAnswer: 'A'
      },
      {
        id: 'q9',
        category: 'Géométrie',
        question: 'Compléter les termes manquants',
        type: 'fill_in_blanks',
        points: 4,
        statements: [
          'Un triangle équilatéral a _______ côtés égaux',
          'La somme des angles d\'un triangle est _______',
          'Un angle droit mesure _______',
          'Le périmètre d\'un carré de côté a est _______'
        ],
        options: ['3', '180°', '90°', '4a', '2a', '60°', '4'],
        correctAnswers: ['3', '180°', '90°', '4a']
      },
      {
        id: 'q10',
        category: 'Géométrie',
        question: 'Dans un triangle, le cercle circonscrit passe par :',
        type: 'multiple_choice',
        points: 1,
        options: ['A) Les trois sommets', 'B) Les trois côtés', 'C) Le centre', 'D) Les trois médiatrices'],
        correctAnswer: 'A'
      },
      {
        id: 'q11',
        category: 'Proportions',
        question: 'Si 5 kg de pommes coûtent 25 DH, combien coûtent 3 kg ?',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 15 DH', 'B) 18 DH', 'C) 12 DH', 'D) 20 DH'],
        correctAnswer: 'A'
      },
      {
        id: 'q12',
        category: 'Proportions',
        question: 'Augmenter 200 de 15% donne :',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 230', 'B) 215', 'C) 185', 'D) 245'],
        correctAnswer: 'A'
      }
    ]
  };

  // Quiz data pour 1APIC (questions plus simples)
  const quizData1APIC = {
    title: "Test Diagnostique - Mathématiques 1APIC",
    description: "Évaluation des compétences fondamentales en mathématiques",
    totalQuestions: 10,
    questions: [
      {
        id: 'q1',
        category: 'Nombres',
        question: 'Calculer : 7 + 8',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 15', 'B) 16', 'C) 14', 'D) 13'],
        correctAnswer: 'A'
      },
      {
        id: 'q2',
        category: 'Nombres',
        question: 'Calculer : 25 - 13',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 12', 'B) 11', 'C) 13', 'D) 14'],
        correctAnswer: 'A'
      },
      {
        id: 'q3',
        category: 'Nombres',
        question: 'Calculer : 6 × 7',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 42', 'B) 36', 'C) 48', 'D) 49'],
        correctAnswer: 'A'
      },
      {
        id: 'q4',
        category: 'Nombres',
        question: 'Calculer : 48 ÷ 6',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 8', 'B) 7', 'C) 9', 'D) 6'],
        correctAnswer: 'A'
      },
      {
        id: 'q5',
        category: 'Géométrie',
        question: 'Combien de côtés a un triangle ?',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
        correctAnswer: 'A'
      },
      {
        id: 'q6',
        category: 'Géométrie',
        question: 'Un angle droit mesure :',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 90°', 'B) 45°', 'C) 180°', 'D) 360°'],
        correctAnswer: 'A'
      },
      {
        id: 'q7',
        category: 'Géométrie',
        question: 'Le périmètre d\'un carré de côté 5 cm est :',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 20 cm', 'B) 25 cm', 'C) 15 cm', 'D) 10 cm'],
        correctAnswer: 'A'
      },
      {
        id: 'q8',
        category: 'Fractions',
        question: 'Calculer : 1/2 + 1/4',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 3/4', 'B) 1/2', 'C) 2/6', 'D) 1/4'],
        correctAnswer: 'A'
      },
      {
        id: 'q9',
        category: 'Proportions',
        question: 'Si 2 cahiers coûtent 10 DH, combien coûte 1 cahier ?',
        type: 'multiple_choice',
        points: 1,
        options: ['A) 5 DH', 'B) 10 DH', 'C) 8 DH', 'D) 6 DH'],
        correctAnswer: 'A'
      },
      {
        id: 'q10',
        category: 'Proportions',
        question: 'Augmenter 100 de 10% donne :',
        type: 'multiple_choice',
        points: 1.5,
        options: ['A) 110', 'B) 105', 'C) 115', 'D) 120'],
        correctAnswer: 'A'
      }
    ]
  };

  // Sélectionner les données du quiz en fonction du niveau
  const quizData = selectedGrade === '1APIC' ? quizData1APIC : quizData2APIC;

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted && !showStartForm) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsCompleted(true);
      setShowResults(true);
    }
  }, [timeRemaining, isCompleted, showStartForm]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const detailedResults = [];
    const categoryScores = {};
    
    // Initialiser les catégories
    quizData.questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { score: 0, max: 0 };
      }
    });
    
    quizData.questions.forEach(question => {
      maxScore += question.points;
      categoryScores[question.category].max += question.points;
      
      const userAnswer = answers[question.id];
      let questionScore = 0;
      let isCorrect = false;
      let mastery = 'Insuffisante';
      
      if (question.type === 'multiple_choice') {
        if (userAnswer === question.correctAnswer) {
          questionScore = question.points;
          isCorrect = true;
          mastery = 'Excellente';
        }
      } else if (question.type === 'fill_in_blanks') {
        if (userAnswer && Array.isArray(userAnswer)) {
          const correctCount = userAnswer.filter((answer, index) => 
            answer?.toLowerCase() === question.correctAnswers[index]?.toLowerCase()
          ).length;
          questionScore = (correctCount / question.correctAnswers.length) * question.points;
          isCorrect = correctCount === question.correctAnswers.length;
          
          const percentage = (correctCount / question.correctAnswers.length) * 100;
          if (percentage === 100) mastery = 'Excellente';
          else if (percentage >= 70) mastery = 'Partielle';
          else mastery = 'Insuffisante';
        }
      }
      
      totalScore += questionScore;
      categoryScores[question.category].score += questionScore;
      
      detailedResults.push({
        question,
        userAnswer,
        questionScore,
        isCorrect,
        mastery,
        maxPoints: question.points
      });
    });
    
    const scoreOn20 = Math.round((totalScore / maxScore) * 20 * 10) / 10;
    
    return { 
      totalScore: Math.round(totalScore * 10) / 10, 
      maxScore, 
      scoreOn20,
      detailedResults,
      categoryScores
    };
  };

  const startQuiz = () => {
    if (studentInfo.firstName && studentInfo.lastName && studentInfo.phoneNumber && studentInfo.className) {
      const studentKey = `${studentInfo.firstName.toLowerCase().trim()}_${studentInfo.lastName.toLowerCase().trim()}_${studentInfo.phoneNumber.trim()}_${selectedGrade}`;
      if (completedStudents.includes(studentKey)) {
        setIsStudentAlreadyCompleted(true);
        return;
      }
      setShowStartForm(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    const studentKey = `${studentInfo.firstName.toLowerCase().trim()}_${studentInfo.lastName.toLowerCase().trim()}_${studentInfo.phoneNumber.trim()}_${selectedGrade}`;
    const updatedCompletedStudents = [...completedStudents, studentKey];
    setCompletedStudents(updatedCompletedStudents);
    
    setIsCompleted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(3600);
    setIsCompleted(false);
    setShowResults(false);
    setShowStartForm(true);
    setShowReport(false);
    setStudentInfo({ firstName: '', lastName: '', phoneNumber: '', className: '' });
    setIsStudentAlreadyCompleted(false);
  };

  const printReport = () => {
    window.print();
  };

  const generatePDFReport = () => {
    const { scoreOn20, detailedResults, categoryScores } = calculateScore();
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport d'Évaluation - ${studentInfo.firstName} ${studentInfo.lastName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background: white;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.4;
        }
        
        .header {
            background: #1e40af;
            color: white;
            padding: 15px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        
        .header p {
            margin: 5px 0 0 0;
            font-size: 10px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-box {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 15px;
        }
        
        .info-title {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 10px;
        }
        
        .result-item {
            text-align: center;
            padding: 8px;
            border-radius: 5px;
        }
        
        .blue { background: #dbeafe; color: #1e40af; }
        .green { background: #dcfce7; color: #166534; }
        .yellow { background: #fef3c7; color: #92400e; }
        .purple { background: #f3e8ff; color: #7c2d12; }
        
        .compact-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .compact-table th, .compact-table td {
            border: 1px solid #e2e8f0;
            padding: 6px;
            text-align: center;
            font-size: 10px;
        }
        
        .compact-table th {
            background: #f1f5f9;
            font-weight: bold;
        }
        
        .compact-table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .summary-card {
            background: #f8fafc;
            border-radius: 5px;
            padding: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background: #e5e7eb;
            border-radius: 3px;
            margin-top: 5px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: #3b82f6;
        }
        
        .recommendations {
            border: 1px solid #e2e8f0;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 30px;
        }
        
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        
        .signature-box {
            text-align: center;
            width: 150px;
        }
        
        .signature-line {
            border-top: 1px solid #666;
            margin-top: 30px;
            padding-top: 5px;
            font-size: 10px;
        }
        
        .status-correct { color: #22c55e; }
        .status-partial { color: #eab308; }
        .status-incorrect { color: #ef4444; }
        
        .text-left { text-align: left; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ÉVALUATION DIAGNOSTIQUE MATHÉMATIQUES ${selectedGrade}</h1>
        <p>Ministère de l'Éducation Nationale - Académie Régionale d'Éducation et de Formation</p>
    </div>
    
    <div class="info-grid">
        <div class="info-box">
            <div class="info-title">INFORMATIONS ÉTUDIANT</div>
            <div><strong>Nom:</strong> ${studentInfo.lastName}</div>
            <div><strong>Prénom:</strong> ${studentInfo.firstName}</div>
            <div><strong>Téléphone:</strong> ${studentInfo.phoneNumber}</div>
            <div><strong>Classe:</strong> ${studentInfo.className}</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</div>
        </div>
        
        <div class="info-box">
            <div class="info-title">RÉSULTATS GLOBAUX</div>
            <div class="results-grid">
                <div class="result-item blue">
                    <div style="font-weight: bold;">${scoreOn20}/20</div>
                    <div>Note/20</div>
                </div>
                <div class="result-item green">
                    <div style="font-weight: bold;">${Math.round((scoreOn20/20)*100)}%</div>
                    <div>Réussite</div>
                </div>
                <div class="result-item yellow">
                    <div style="font-weight: bold;">${(scoreOn20*0.6).toFixed(1)}/12</div>
                    <div>Niveau maîtrise</div>
                </div>
                <div class="result-item purple">
                    <div style="font-weight: bold;">${scoreOn20}/20</div>
                    <div>Score total</div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="info-title">DÉTAIL DES RÉSULTATS PAR QUESTION</div>
    <table class="compact-table">
        <thead>
            <tr>
                <th class="text-left">Question</th>
                <th>Catégorie</th>
                <th>Points</th>
                <th>Score</th>
                <th>Statut</th>
                <th>Maîtrise</th>
            </tr>
        </thead>
        <tbody>
            ${detailedResults.map((result, index) => `
                <tr>
                    <td class="text-left">${result.question.question.substring(0, 40)}...</td>
                    <td>${result.question.category}</td>
                    <td>${result.maxPoints}</td>
                    <td>${result.questionScore.toFixed(1)}</td>
                    <td class="${result.isCorrect ? 'status-correct' : (result.questionScore > 0 ? 'status-partial' : 'status-incorrect')}">
                        ${result.isCorrect ? '✓' : (result.questionScore > 0 ? '~' : '✗')}
                    </td>
                    <td>${result.mastery}</td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot style="background: #f1f5f9; font-weight: bold;">
            <tr>
                <td class="text-left" colspan="2">TOTAL</td>
                <td>20</td>
                <td>${scoreOn20}</td>
                <td colspan="2">${Math.round((scoreOn20/20)*100)}% de réussite</td>
            </tr>
        </tfoot>
    </table>
    
    <div class="info-title">ANALYSE PAR COMPÉTENCES</div>
    <div class="summary-cards">
        ${Object.entries(categoryScores).map(([category, scores]) => {
          const percentage = Math.round((scores.score / scores.max) * 100);
          return `
            <div class="summary-card">
                <h3 style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">${category.toUpperCase()}</h3>
                <div>Score: ${scores.score.toFixed(1)}/${scores.max}</div>
                <div>Maîtrise: ${percentage}%</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
          `;
        }).join('')}
    </div>
    
    <div class="info-title">COMMENTAIRES ET RECOMMANDATIONS</div>
    <div class="recommendations">
        <div style="margin-bottom: 10px;">
            <strong>Points forts:</strong> ${(() => {
              const strongCategories = Object.entries(categoryScores).filter(([_, scores]) => 
                (scores.score / scores.max) >= 0.8
              ).map(([cat, _]) => cat);
              return strongCategories.length > 0 
                ? `Excellente maîtrise en ${strongCategories.join(', ')}.`
                : 'Des efforts sont visibles dans plusieurs domaines.';
            })()}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Points à améliorer:</strong> ${(() => {
              const weakCategories = Object.entries(categoryScores).filter(([_, scores]) => 
                (scores.score / scores.max) < 0.7
              ).map(([cat, _]) => cat);
              return weakCategories.length > 0 
                ? `Besoin de renforcement en ${weakCategories.join(', ')}.`
                : 'Bon niveau général maintenu.';
            })()}
        </div>
        <div>
            <strong>Recommandations:</strong>
            <ul style="margin: 5px 0; padding-left: 20px;">
                <li>Révision des notions fondamentales</li>
                <li>Exercices d'application pratique</li>
                <li>Travail régulier et suivi personnalisé</li>
            </ul>
        </div>
    </div>
    
    <div class="signature-section">
        <div class="signature-box">
            <div>Le professeur</div>
            <div class="signature-line">Nom et signature</div>
        </div>
        <div class="signature-box">
            <div>Les parents</div>
            <div class="signature-line">Nom et signature</div>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rapport_Evaluation_${studentInfo.firstName}_${studentInfo.lastName}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Fonction pour générer le rapport intégré
  const showIntegratedReport = () => {
    setShowReport(true);
  };

  const renderUserAnswer = (question, userAnswer) => {
    if (!userAnswer) return "Non répondu";

    switch (question.type) {
      case 'multiple_choice':
        const selectedOption = question.options.find(opt => opt.charAt(0) === userAnswer);
        return selectedOption || userAnswer;
      
      case 'fill_in_blanks':
        return Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer;
      
      default:
        return userAnswer;
    }
  };

  const renderCorrectAnswer = (question) => {
    switch (question.type) {
      case 'multiple_choice':
        const correctOption = question.options.find(opt => opt.charAt(0) === question.correctAnswer);
        return correctOption || question.correctAnswer;
      
      case 'fill_in_blanks':
        return question.correctAnswers.join(', ');
      
      default:
        return 'N/A';
    }
  };

  // Start form
  if (showStartForm) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Diagnostique - Mathématiques</h1>
          <p className="text-gray-600">Sélectionnez votre niveau et complétez vos informations</p>
        </div>

        {/* Sélection du niveau */}
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
                  <option value="1APIC 1">1APIC 1</option>
                  <option value="1APIC 2">1APIC 2</option>
                  <option value="1APIC 3">1APIC 3</option>
                </>
              ) : (
                <>
                  <option value="2APIC 1">2APIC 1</option>
                  <option value="2APIC 2">2APIC 2</option>
                  
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
    );
  }

  const renderQuestion = (question) => {
    const userAnswer = answers[question.id];

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-blue-50 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option.charAt(0)}
                  checked={userAnswer === option.charAt(0)}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'fill_in_blanks':
        return (
          <div className="space-y-4">
            {question.statements.map((statement, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="mb-2 text-gray-700">{statement.replace('_______', '[ ? ]')}</div>
                <select
                  className="w-full p-2 border rounded-md"
                  value={userAnswer?.[index] || ''}
                  onChange={(e) => {
                    const newAnswer = [...(userAnswer || Array(question.statements.length).fill(''))];
                    newAnswer[index] = e.target.value;
                    handleAnswer(question.id, newAnswer);
                  }}
                >
                  <option value="">Choisir une réponse</option>
                  {question.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      default:
        return <div className="text-gray-500">Type de question non supporté</div>;
    }
  };

  // Rapport intégré
  if (showReport) {
    const { totalScore, maxScore, scoreOn20, detailedResults, categoryScores } = calculateScore();
    
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm print:shadow-none print:max-w-full">
        {/* En-tête institutionnel */}
        <div className="bg-blue-800 text-white p-4 text-center print:bg-blue-800">
          <h1 className="text-lg font-bold">ÉVALUATION DIAGNOSTIQUE MATHÉMATIQUES {selectedGrade}</h1>
          <p className="text-xs">Ministère de l'Éducation Nationale - Académie Régionale d'Éducation et de Formation</p>
        </div>
        
        <div className="p-4">
          {/* Informations étudiant */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded p-3">
              <h2 className="font-bold text-blue-800 text-sm mb-2">INFORMATIONS ÉTUDIANT</h2>
              <div className="space-y-1 text-xs">
                <div><span className="font-medium">Nom:</span> {studentInfo.lastName}</div>
                <div><span className="font-medium">Prénom:</span> {studentInfo.firstName}</div>
                <div><span className="font-medium">Téléphone:</span> {studentInfo.phoneNumber}</div>
                <div><span className="font-medium">Classe:</span> {studentInfo.className}</div>
                <div><span className="font-medium">Date:</span> {new Date().toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
            
            <div className="border rounded p-3">
              <h2 className="font-bold text-blue-800 text-sm mb-2">RÉSULTATS GLOBAUX</h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="font-bold text-blue-700">{scoreOn20}/20</div>
                  <div>Note/20</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="font-bold text-green-700">{Math.round((scoreOn20/20)*100)}%</div>
                  <div>Réussite</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded text-center">
                  <div className="font-bold text-yellow-700">{(scoreOn20*0.6).toFixed(1)}/12</div>
                  <div>Niveau maîtrise</div>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center">
                  <div className="font-bold text-purple-700">{scoreOn20}/20</div>
                  <div>Score total</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tableau compact des résultats */}
          <h2 className="font-bold text-blue-800 text-sm mb-2">DÉTAIL DES RÉSULTATS PAR QUESTION</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Question</th>
                  <th className="border border-gray-300 p-2">Catégorie</th>
                  <th className="border border-gray-300 p-2">Points</th>
                  <th className="border border-gray-300 p-2">Score</th>
                  <th className="border border-gray-300 p-2">Statut</th>
                  <th className="border border-gray-300 p-2">Maîtrise</th>
                </tr>
              </thead>
              <tbody>
                {detailedResults.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-2 text-left">
                      {result.question.question.length > 40 ? 
                        result.question.question.substring(0, 40) + '...' : 
                        result.question.question
                      }
                    </td>
                    <td className="border border-gray-300 p-2">{result.question.category}</td>
                    <td className="border border-gray-300 p-2">{result.maxPoints}</td>
                    <td className="border border-gray-300 p-2">{result.questionScore.toFixed(1)}</td>
                    <td className={`border border-gray-300 p-2 ${
                      result.isCorrect ? 'text-green-600' : 
                      result.questionScore > 0 ? 'text-yellow-500' : 'text-red-600'
                    }`}>
                      {result.isCorrect ? '✓' : result.questionScore > 0 ? '~' : '✗'}
                    </td>
                    <td className="border border-gray-300 p-2">{result.mastery}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-bold">
                <tr>
                  <td className="border border-gray-300 p-2 text-left" colSpan="2">TOTAL</td>
                  <td className="border border-gray-300 p-2">20</td>
                  <td className="border border-gray-300 p-2">{scoreOn20}</td>
                  <td className="border border-gray-300 p-2" colSpan="2">{Math.round((scoreOn20/20)*100)}% de réussite</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* Analyse par compétences */}
          <h2 className="font-bold text-blue-800 text-sm mb-2">ANALYSE PAR COMPÉTENCES</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {Object.entries(categoryScores).map(([category, scores]) => {
              const percentage = Math.round((scores.score / scores.max) * 100);
              return (
                <div key={category} className="bg-gray-50 border rounded p-3">
                  <h3 className="font-semibold text-sm text-blue-700">{category.toUpperCase()}</h3>
                  <div className="text-xs">
                    <div>Score: {scores.score.toFixed(1)}/{scores.max}</div>
                    <div>Maîtrise: {percentage}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Commentaires et recommandations */}
          <h2 className="font-bold text-blue-800 text-sm mb-2">COMMENTAIRES ET RECOMMANDATIONS</h2>
          <div className="border rounded p-3 mb-4">
            <div className="text-xs space-y-2">
              <p><span className="font-medium">Points forts:</span> {(() => {
                const strongCategories = Object.entries(categoryScores).filter(([_, scores]) => 
                  (scores.score / scores.max) >= 0.8
                ).map(([cat, _]) => cat);
                return strongCategories.length > 0 
                  ? `Excellente maîtrise en ${strongCategories.join(', ')}.`
                  : 'Des efforts sont visibles dans plusieurs domaines.';
              })()}</p>
              <p><span className="font-medium">Points à améliorer:</span> {(() => {
                const weakCategories = Object.entries(categoryScores).filter(([_, scores]) => 
                  (scores.score / scores.max) < 0.7
                ).map(([cat, _]) => cat);
                return weakCategories.length > 0 
                  ? `Besoin de renforcement en ${weakCategories.join(', ')}.`
                  : 'Bon niveau général maintenu.';
              })()}</p>
              <p><span className="font-medium">Recommandations:</span></p>
              <ul className="list-disc list-inside ml-2">
                <li>Révision des notions fondamentales</li>
                <li>Exercices d'application pratique</li>
                <li>Travail régulier et suivi personnalisé</li>
              </ul>
            </div>
          </div>
          
          {/* Signature */}
          <div className="flex justify-between mt-8">
            <div className="text-center">
              <div className="mb-1">Le professeur</div>
              <div className="border-t border-gray-400 pt-1 w-32 mx-auto">
                <span className="text-xs">Nom et signature</span>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1">Les parents</div>
              <div className="border-t border-gray-400 pt-1 w-32 mx-auto">
                <span className="text-xs">Nom et signature</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-8 print:hidden">
            <button
              onClick={printReport}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer le rapport
            </button>
           
            <button
              onClick={() => setShowReport(false)}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Retour aux résultats
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { totalScore, maxScore, scoreOn20, detailedResults } = calculateScore();
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="mb-8 border-b pb-4">
          <div className="text-center mb-6">
            <div className="text-xl font-bold text-gray-800 mb-4">Résultats du Test Diagnostique - {selectedGrade}</div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Étudiant : </span>
                  <span>{studentInfo.firstName} {studentInfo.lastName}</span>
                </div>
                <div>
                  <span className="font-medium">Classe : </span>
                  <span>{studentInfo.className}</span>
                </div>
                <div>
                  <span className="font-medium">Score : </span>
                  <span className="font-bold text-blue-600">{scoreOn20}/20 ({Math.round((scoreOn20/20)*100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats détaillés */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Détail des Réponses</h2>
          <div className="space-y-6">
            {detailedResults.map((result, index) => (
              <div key={result.question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-800">
                    Question {index + 1} - {result.question.category}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {result.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {result.questionScore.toFixed(1)}/{result.maxPoints}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700 mb-2">{result.question.question}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Votre réponse :</span>
                    <div className={`mt-1 p-2 rounded ${result.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {renderUserAnswer(result.question, result.userAnswer)}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Réponse correcte :</span>
                    <div className="mt-1 p-2 bg-gray-50 text-gray-800 rounded">
                      {renderCorrectAnswer(result.question)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 print:hidden">
          <button
            onClick={showIntegratedReport}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            Voir le Rapport Complet
          </button>
          
          <button
            onClick={resetQuiz}
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouveau Test
          </button>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{quizData.title}</h1>
            <div className="text-sm text-gray-600 mt-1">
              {studentInfo.firstName} {studentInfo.lastName} - {studentInfo.className}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeRemaining)}
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {question.category}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Question {currentQuestion + 1} sur {quizData.questions.length}</span>
          <span>{question.points} point{question.points > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">{question.question}</h2>
        {renderQuestion(question)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </button>

        <div className="flex space-x-2">
          {currentQuestion === quizData.questions.length - 1 ? (
            <button
              onClick={finishQuiz}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Terminer le Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mt-6 pt-6 border-t">
        <div className="text-sm text-gray-600 mb-2">Navigation rapide :</div>
        <div className="flex flex-wrap gap-2">
          {quizData.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[quizData.questions[index].id]
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;
