<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devoirs de Mathématiques - Collège Mouad Ibn Jabal</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .selection-container { display: none; }
        }
        body {
            font-family: 'Times New Roman', serif;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: #f5f5f5;
            line-height: 1.6;
        }
        .selection-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            margin-bottom: 30px;
        }
        .selection-container h1 {
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .btn-select {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 8px;
            margin: 10px;
            transition: transform 0.2s;
        }
        .btn-select:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .devoir-container {
            background: white;
            padding: 20mm;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 5px 0;
            font-size: 24px;
        }
        .header p {
            margin: 3px 0;
            font-size: 14px;
        }
        .deadline {
            background: #fff3cd;
            border: 2px solid #ffc107;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            color: #856404;
            margin: 15px 0;
            border-radius: 5px;
        }
        .info-box {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            font-size: 13px;
        }
        .exercise {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .exercise-title {
            background: #f0f0f0;
            padding: 8px 12px;
            font-weight: bold;
            border-left: 4px solid #333;
            margin-bottom: 10px;
        }
        .exercise-content {
            padding-left: 15px;
        }
        .question {
            margin: 12px 0;
        }
        .graduated-line {
            margin: 20px 0;
            padding: 20px 0;
        }
        .note {
            font-style: italic;
            font-size: 12px;
            color: #666;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        button.print-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
        }
        button.print-btn:hover {
            background: #45a049;
        }
        .back-btn {
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 25px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 10px;
        }
        .back-btn:hover {
            background: #5a6268;
        }
    </style>
</head>
<body>
    <div class="selection-container" id="selection">
        <h1>📚 Devoirs à Domicile - Mathématiques</h1>
        <p style="font-size: 18px; margin: 20px 0;">Collège Mouad Ibn Jabal - Semestre 1 (2025/2026)</p>
        <p style="color: #dc3545; font-weight: bold; font-size: 20px;">📅 Date de remise : 17 octobre 2025</p>
        <div style="margin-top: 40px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Sélectionnez votre niveau :</p>
            <button class="btn-select" onclick="showDevoir1()">1ère Année Collège</button>
            <button class="btn-select" onclick="showDevoir2()">2ème Année Collège</button>
        </div>
    </div>

    <div id="devoir1" class="devoir-container" style="display: none;">
        <div class="header">
            <p><strong>Royaume du Maroc</strong></p>
            <p><strong>Collège Mouad Ibn Jabal</strong></p>
            <h1>DEVOIR À DOMICILE N°1</h1>
            <p>Mathématiques - 1ère Année Collège</p>
            <p>Semestre 1 - Année scolaire 2025/2026</p>
        </div>

        <div class="deadline">
            ⏰ Date de remise : Jeudi 17 octobre 2025
        </div>

        <div class="info-box">
            <div>
                <strong>Nom et Prénom :</strong> _________________________
            </div>
            <div>
                <strong>Classe :</strong> ___________
            </div>
        </div>

        <p class="note">La présentation, la rédaction et la propreté sont prises en compte dans la notation.</p>

        <div class="exercise">
            <div class="exercise-title">Exercice 1 : Opérations sur les nombres entiers (4 points)</div>
            <div class="exercise-content">
                <p><strong>Calculer les expressions suivantes en détaillant les étapes :</strong></p>
                <div class="question">
                    <strong>1)</strong> A = 156 + 289 - 127 = ___________
                </div>
                <div class="question">
                    <strong>2)</strong> B = 48 × 23 = ___________
                </div>
                <div class="question">
                    <strong>3)</strong> C = (64 + 16) × 8 - 240 = ___________
                </div>
                <div class="question">
                    <strong>4)</strong> D = 25 + 15 × 4 - 36 ÷ 6 = ___________
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 2 : Opérations sur les nombres décimaux (4 points)</div>
            <div class="exercise-content">
                <p><strong>Effectuer les calculs suivants :</strong></p>
                <div class="question">
                    <strong>1)</strong> E = 15,75 + 8,48 = ___________
                </div>
                <div class="question">
                    <strong>2)</strong> F = 32,6 - 18,95 = ___________
                </div>
                <div class="question">
                    <strong>3)</strong> G = 4,5 × 3,2 = ___________
                </div>
                <div class="question">
                    <strong>4)</strong> H = (22,5 + 7,5) × 0,6 = ___________
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 3 : Opérations sur les fractions (5 points)</div>
            <div class="exercise-content">
                <p><strong>Calculer et simplifier si possible :</strong></p>
                <div class="question">
                    <strong>1)</strong> I = 3/7 + 2/7 = ___________
                </div>
                <div class="question">
                    <strong>2)</strong> J = 5/6 - 1/6 = ___________
                </div>
                <div class="question">
                    <strong>3)</strong> K = 3/4 × 8/9 = ___________
                </div>
                <div class="question">
                    <strong>4)</strong> L = 5/8 + 3/4 = ___________ <span class="note">(mettre au même dénominateur)</span>
                </div>
                <div class="question">
                    <strong>5)</strong> M = 7/10 - 2/5 = ___________ <span class="note">(mettre au même dénominateur)</span>
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 4 : Droite graduée et fractions (4 points)</div>
            <div class="exercise-content">
                <p><strong>1)</strong> Placer les fractions suivantes sur la droite graduée ci-dessous : <em>(2 points)</em></p>
                <p style="margin-left: 20px;">A = 1/4  ;  B = 3/4  ;  C = 5/4  ;  D = 7/4</p>
                <div class="graduated-line">
                    <svg width="600" height="80" style="display: block; margin: 0 auto;">
                        <line x1="50" y1="40" x2="550" y2="40" stroke="black" stroke-width="2"/>
                        <line x1="50" y1="35" x2="50" y2="45" stroke="black" stroke-width="2"/>
                        <text x="50" y="60" text-anchor="middle" font-size="14">0</text>
                        <line x1="175" y1="35" x2="175" y2="45" stroke="black" stroke-width="2"/>
                        <text x="175" y="60" text-anchor="middle" font-size="14">1</text>
                        <line x1="300" y1="35" x2="300" y2="45" stroke="black" stroke-width="2"/>
                        <text x="300" y="60" text-anchor="middle" font-size="14">2</text>
                        <line x1="425" y1="35" x2="425" y2="45" stroke="black" stroke-width="2"/>
                        <text x="425" y="60" text-anchor="middle" font-size="14">3</text>
                        <line x1="550" y1="35" x2="550" y2="45" stroke="black" stroke-width="2"/>
                        <text x="550" y="60" text-anchor="middle" font-size="14">4</text>
                    </svg>
                </div>
                <p><strong>2)</strong> Compléter avec < , > ou = : <em>(2 points)</em></p>
                <div class="question">
                    <strong>a)</strong> 3/5 ___ 2/5
                </div>
                <div class="question">
                    <strong>b)</strong> 4/7 ___ 5/7
                </div>
                <div class="question">
                    <strong>c)</strong> 6/8 ___ 3/4
                </div>
                <div class="question">
                    <strong>d)</strong> 5/10 ___ 1/2
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 5 : Problème (3 points)</div>
            <div class="exercise-content">
                <p>
                    Ahmed possède une corde de 12,5 mètres. Il utilise 2/5 de cette corde pour attacher des plantes dans son jardin, puis il coupe 3,8 mètres pour un autre usage.
                </p>
                <p><strong>Questions :</strong></p>
                <div class="question">
                    <strong>1)</strong> Quelle longueur de corde a-t-il utilisée pour les plantes ? <em>(1 point)</em>
                </div>
                <div class="question">
                    <strong>2)</strong> Quelle longueur totale de corde a-t-il utilisée ? <em>(1 point)</em>
                </div>
                <div class="question">
                    <strong>3)</strong> Quelle longueur de corde lui reste-t-il ? <em>(1 point)</em>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; font-weight: bold;">
            Bon travail !
        </div>

        <div class="button-container no-print">
            <button class="back-btn" onclick="backToSelection()">← Retour</button>
            <button class="print-btn" onclick="window.print()">📥 Télécharger en PDF</button>
        </div>
    </div>

    <div id="devoir2" class="devoir-container" style="display: none;">
        <div class="header">
            <p><strong>Royaume du Maroc</strong></p>
            <p><strong>Collège Mouad Ibn Jabal</strong></p>
            <h1>DEVOIR À DOMICILE N°1</h1>
            <p>Mathématiques - 2ème Année Collège</p>
            <p>Semestre 1 - Année scolaire 2025/2026</p>
        </div>

        <div class="deadline">
            ⏰ Date de remise : Jeudi 17 octobre 2025
        </div>

        <div class="info-box">
            <div>
                <strong>Nom et Prénom :</strong> _________________________
            </div>
            <div>
                <strong>Classe :</strong> ___________
            </div>
        </div>

        <p class="note">La présentation, la rédaction et la propreté sont prises en compte dans la notation.</p>

        <div class="exercise">
            <div class="exercise-title">Exercice 1 : Calculs avec nombres rationnels (1,5 points)</div>
            <div class="exercise-content">
                <p><strong>1) Calculer A, B et C tel que :</strong></p>
                <div class="question" style="margin-left: 20px;">
                    A = 0,56 ÷ 7 × 100 + 2(5,2 - 8,7)
                </div>
                <div class="question" style="margin-left: 20px;">
                    B = (-12,7 + 7,6) × (1,2 - 2,1) ÷ (2,76 - 7,35)
                </div>
                <div class="question" style="margin-left: 20px;">
                    C = (-4,58 - 2,67) - (-15,2 + 2,5) × (1,9 - 1,3)
                </div>
                <br>
                <p><strong>2) En déduire la valeur de A + B + C</strong></p>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 2 : Fractions - Calculs et simplifications (4,5 points)</div>
            <div class="exercise-content">
                <p><strong>1) Calculer puis simplifier si possible ce qui suit :</strong></p>
                <div class="question">
                    D = 5/7 + (-2/3)
                </div>
                <div class="question">
                    E = -3/5 + 0,7
                </div>
                <div class="question">
                    F = 13/(-18) - 11/12
                </div>
                <div class="question">
                    G = 11/16 + (-30/32) + 15/24
                </div>
                <div class="question">
                    H = 17/13 + (-33/39) - 13/26
                </div>
                <div class="question">
                    I = (17/14 + 11/21) + (-22/42 + 11/14)
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 3 : Expression avec paramètres (1 point)</div>
            <div class="exercise-content">
                <p><em>a</em> et <em>b</em> sont deux rationnels non nuls.</p>
                <p><strong>Calculer l'expression :</strong></p>
                <div class="question" style="margin-left: 20px;">
                    J = 1/2 - (5 - a) - 2(b + 7/2) &nbsp;&nbsp; si &nbsp; a - 2b = -3
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 4 : Enlever les parenthèses et calculer (2 points)</div>
            <div class="exercise-content">
                <p><strong>Enlever les parenthèses et les crochets puis calculer I et J tel que :</strong></p>
                <div class="question">
                    I = (-7/6 + 5/9) - [(11/12 + 8/9) - 13/6]
                </div>
                <div class="question">
                    J = 5/16 - [(9/8 + 27/12) - (11/4 - 15/24)]
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 5 : Simplification des fractions (2 points)</div>
            <div class="exercise-content">
                <p><strong>Simplifier les rationnels suivants :</strong></p>
                <div class="question">
                    M = [(-22) × (-35)] / [21 × (-55)]
                </div>
                <div class="question">
                    N = 210 / (-84)
                </div>
                <div class="question">
                    O = (-234) / (-52)
                </div>
                <div class="question">
                    P = 204 / 306
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 6 : Équations (1,5 point)</div>
            <div class="exercise-content">
                <p><strong>Déterminer la valeur de <em>x</em> dans chaque cas suivant :</strong></p>
                <div class="question">
                    (2x + 1) / (-3 + x) = 3/2
                </div>
                <div class="question">
                    14 / (-6) = 18 / (-2x)
                </div>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 7 : Expression algébrique (1,5 point)</div>
            <div class="exercise-content">
                <p><em>x</em> est un nombre rationnel.</p>
                <p><strong>1. Simplifier l'expression suivante :</strong> <em>(1 point)</em></p>
                <div class="question" style="margin-left: 20px;">
                    L = (3x - 2)/6 + (7x + 5)/12
                </div>
                <br>
                <p><strong>2. Calculer L pour x = 2/13</strong> <em>(0,5 point)</em></p>
            </div>
        </div>

        <div class="exercise">
            <div class="exercise-title">Exercice 8 : Problème (2 points)</div>
            <div class="exercise-content">
                <p>
                    Un commerçant fait le bilan de sa journée. Le matin, il a gagné (+350) dirhams. L'après-midi, il a eu des dépenses de (-180) dirhams pour acheter de la marchandise. En fin de journée, il a vendu pour (+420) dirhams, mais il a dû payer une facture de (-95) dirhams.
                </p>
                <p><strong>Questions :</strong></p>
                <div class="question">
                    <strong>1)</strong> Écrire une expression qui représente le bilan total de la journée du commerçant. <em>(1 point)</em>
                    <br><br>
                    Expression : _______________________________________________
                </div>
                <div class="question">
                    <strong>2)</strong> Calculer ce bilan total. Le commerçant a-t-il gagné ou perdu de l'argent ? Combien ? <em>(1 point)</em>
                    <br><br>
                    Calcul : _______________________________________________
                    <br><br>
                    Réponse : _______________________________________________
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; font-weight: bold;">
            Bon travail !
        </div>

        <div class="button-container no-print">
            <button class="back-btn" onclick="backToSelection()">← Retour</button>
            <button class="print-btn" onclick="window.print()">📥 Télécharger en PDF</button>
        </div>
    </div>

    <script>
        function showDevoir1() {
            document.getElementById('selection').style.display = 'none';
            document.getElementById('devoir1').style.display = 'block';
            document.getElementById('devoir2').style.display = 'none';
        }

        function showDevoir2() {
            document.getElementById('selection').style.display = 'none';
            document.getElementById('devoir1').style.display = 'none';
            document.getElementById('devoir2').style.display = 'block';
        }

        function backToSelection() {
            document.getElementById('selection').style.display = 'block';
            document.getElementById('devoir1').style.display = 'none';
            document.getElementById('devoir2').style.display = 'none';
        }
    </script>
</body>
</html>
