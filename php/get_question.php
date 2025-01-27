<?php
header('Content-Type: application/json');
require_once 'config.php';

function getQuestionFromJson() {
    $jsonFile = __DIR__ . '/../data/questions.json';
    $jsonData = file_get_contents($jsonFile);
    $questions = json_decode($jsonData, true)['questions'];
    $randomIndex = array_rand($questions);
    return $questions[$randomIndex];
}

function getQuestionFromDB() {
    $pdo = getDbConnection();
    if (!$pdo) {
        return null;
    }

    try {
        $stmt = $pdo->query("SELECT * FROM questions ORDER BY RAND() LIMIT 1");
        $question = $stmt->fetch();
        
        if ($question) {
            return [
                'question' => $question['question'],
                'choices' => json_decode($question['choices']),
                'correct' => $question['correct']
            ];
        }
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération de la question : " . $e->getMessage());
    }
    
    return null;
}

// Vérifier la source des questions (JSON ou MySQL)
$source = isset($_GET['source']) ? $_GET['source'] : 'json';
$question = null;

if ($source === 'mysql') {
    $question = getQuestionFromDB();
    // Si erreur avec MySQL, on utilise JSON comme fallback
    if (!$question) {
        $question = getQuestionFromJson();
    }
} else {
    $question = getQuestionFromJson();
}

echo json_encode($question);
