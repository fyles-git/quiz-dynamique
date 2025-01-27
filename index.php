<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Web Development</title>
    <link rel="stylesheet" href="css/style.css?v=1.0">
</head>
<body>
    <div class="container">
        <!-- Section d'accueil avec le formulaire de nom -->
        <div id="welcome-section" class="section active">
            <h1>Quiz de Culture générale</h1>
            <div class="name-form">
                <input type="text" id="player-name" placeholder="Entrez votre nom" required>
                <button id="start-quiz">Commencer le Quiz</button>
            </div>
        </div>

        <!-- Section du quiz -->
        <div id="quiz-section" class="section">
            <div class="quiz-header">
                <div id="timer">30</div>
                <div id="score">Score: <span id="score-value">0</span></div>
            </div>
            <div id="question-container">
                <h2 id="question"></h2>
                <div id="choices"></div>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>

        <!-- Section des résultats -->
        <div id="results-section" class="section">
            <h2>Quiz Terminé!</h2>
            <div id="final-score"></div>
            <div id="leaderboard">
                <h3>Classement</h3>
                <table id="scores-table">
                    <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Nom</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <button id="restart-quiz">Rejouer</button>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>

