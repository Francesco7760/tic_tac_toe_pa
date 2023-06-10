CREATE DATABASE IF NOT EXISTS tictactoe;

USE tictactoe;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS moves;

CREATE TABLE users(
    email varchar(100) NOT NULL,
    admin_role BOOLEAN DEFAULT false,
    token INT DEFAULT 0,
    PRIMARY KEY (email)
);

CREATE TABLE games(
    game_id INT AUTO_INCREMENT NOT NULL,
    player_1 varchar(100) NOT NULL,
    player_2 varchar(100) NOT NULL,
    game_open BOOLEAN DEFAULT false,
    game_abandoned BOOLEAN DEFAULT false,
    winner varchar(100), 
    turn INT DEFAULT 0,
    PRIMARY KEY (game_id),
    FOREIGN KEY (player_1) REFERENCES users(email),
    FOREIGN KEY (player_2) REFERENCES users(email),
    FOREIGN KEY (winner) REFERENCES users(email)
);

CREATE TABLE moves(
    move_id INT AUTO_INCREMENT NOT NULL,
    player varchar(100) NOT NULL,
    game INT NOT NULL,
    game_state JSON NOT NULL,
    start DATE NOT NULL,
    PRIMARY KEY (move_id),
    FOREIGN KEY (game) REFERENCES games(game_id),
    FOREIGN KEY (player) REFERENCES users(email)
);

INSERT INTO users (email, admin_role, token)
VALUES 
('admin@email.com',0, 20),
('user_1@email.com',1, 20),
('user_2@email.com',1, 20),
('user_3@email.com',1,20),
('annachiara@mail.com', 1, 999),
('IA',1,99999)
