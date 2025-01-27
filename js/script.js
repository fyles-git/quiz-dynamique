let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;
let questions = [];
let playerName = '';

// Éléments DOM
const welcomeSection = document.getElementById('welcome-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const playerNameInput = document.getElementById('player-name');
const startQuizButton = document.getElementById('start-quiz');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score-value');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-quiz');
const progressBar = document.querySelector('.progress');
const scoresTableBody = document.querySelector('#scores-table tbody');

// Chargement initial des questions et des scores
document.addEventListener('DOMContentLoaded', () => {
    // Charger les questions
    fetch('data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            shuffleArray(questions);
        })
        .catch(error => console.error('Erreur chargement questions:', error));

    // Charger les scores
    loadLeaderboard();
});

// Gestionnaires d'événements
startQuizButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', () => {
    hideSection(resultsSection);
    showSection(welcomeSection);
    playerNameInput.value = '';
});

function startQuiz() {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Veuillez entrer votre nom');
        return;
    }
    
    currentQuestion = 0;
    score = 0;
    updateScore();
    shuffleArray(questions);
    hideSection(welcomeSection);
    showSection(quizSection);
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer); // Arrêter le timer précédent s'il existe

    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice';
        button.textContent = choice;
        button.addEventListener('click', () => checkAnswer(index));
        choicesElement.appendChild(button);
    });

    // Mise à jour de la barre de progression
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Démarrer le timer
    startTimer();
}

function checkAnswer(choiceIndex) {
    clearInterval(timer);
    const question = questions[currentQuestion];
    const buttons = choicesElement.getElementsByClassName('choice');
    
    // Désactiver tous les boutons
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    // Marquer la réponse correcte et incorrecte
    buttons[question.correct].classList.add('correct');
    if (choiceIndex !== question.correct) {
        buttons[choiceIndex].classList.add('incorrect');
    } else {
        score++;
        updateScore();
    }

    // Passer à la question suivante après un délai
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1500);
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            loadQuestion();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const finalScore = Math.round((score / questions.length) * 100);
    finalScoreElement.textContent = `Score: ${finalScore}%`;
    
    // Sauvegarder le score
    saveScore(finalScore);
    
    hideSection(quizSection);
    showSection(resultsSection);
}

function saveScore(finalScore) {
    fetch('php/save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playerName,
            score: finalScore
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateLeaderboard(data.scores);
        }
    })
    .catch(error => console.error('Erreur sauvegarde score:', error));
}

function loadLeaderboard() {
    fetch('php/save_score.php')
        .then(response => response.json())
        .then(data => {
            if (data.scores) {
                updateLeaderboard(data.scores);
            }
        })
        .catch(error => console.error('Erreur chargement scores:', error));
}

function updateLeaderboard(scores) {
    scoresTableBody.innerHTML = '';
    scores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.score}%</td>
            <td>${new Date(score.date).toLocaleDateString()}</td>
        `;
        scoresTableBody.appendChild(row);
    });
}

function updateScore() {
    scoreElement.textContent = score;
}

function hideSection(section) {
    section.classList.remove('active');
}

function showSection(section) {
    section.classList.add('active');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
