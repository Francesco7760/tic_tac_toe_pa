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
    winner varchar(80), 
    turn INT DEFAULT 0,
    PRIMARY KEY (game_id)
);

CREATE TABLE moves(
    move_id INT AUTO_INCREMENT NOT NULL,
    player varchar(100) NOT NULL,
    game INT NOT NULL,
    game_state JSON NOT NULL,
    PRIMARY KEY (move_id)
);

INSERT INTO users (email, admin_role, token, in_game)
VALUES 
('admin@email.com',0, 20, 0),
('user_1@email.com',1, 20, 0),
('user_2@email.com',1, 20, 1),
('user_3@email.com',1,20, 1),
('annachiara@mail.com', 1, 999, 1),
('IA',1,99999, 1)
