-- Création de la base de données
CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

-- Création de la table questions
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    choices JSON NOT NULL,
    correct INT NOT NULL
);

-- Création de la table scores
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    score INT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des questions de test
INSERT INTO questions (question, choices, correct) VALUES
('Quelle est la capitale de la France ?', '["Paris", "Londres", "Berlin", "Madrid"]', 0),
('Quel est le plus grand océan du monde ?', '["Océan Pacifique", "Océan Atlantique", "Océan Indien", "Océan Arctique"]', 0),
('Qui a peint la Joconde ?', '["Léonard de Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"]', 0),
('Quelle est la planète la plus proche du Soleil ?', '["Mercure", "Vénus", "Mars", "Jupiter"]', 0),
('En quelle année a eu lieu la Révolution française ?', '["1789", "1799", "1769", "1779"]', 0);
