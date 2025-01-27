<?php
header('Content-Type: application/json');

// Fonction pour lire les scores
function getScores() {
    $scoresFile = '../data/scores.json';
    if (file_exists($scoresFile)) {
        $scores = json_decode(file_get_contents($scoresFile), true);
        return $scores['scores'] ?? [];
    }
    return [];
}

// Fonction pour sauvegarder les scores
function saveScores($scores) {
    $scoresFile = '../data/scores.json';
    $data = ['scores' => $scores];
    file_put_contents($scoresFile, json_encode($data, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name']) && isset($data['score'])) {
        $newScore = [
            'name' => htmlspecialchars($data['name']),
            'score' => intval($data['score']),
            'date' => date('Y-m-d H:i:s')
        ];
        
        $scores = getScores();
        $scores[] = $newScore;
        
        // Trier les scores par ordre décroissant
        usort($scores, function($a, $b) {
            return $b['score'] - $a['score'];
        });
        
        // Garder seulement les 10 meilleurs scores
        $scores = array_slice($scores, 0, 10);
        
        saveScores($scores);
        
        echo json_encode(['success' => true, 'scores' => $scores]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Données manquantes']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $scores = getScores();
    echo json_encode(['scores' => $scores]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>
