CREATE DATABASE IF NOT EXISTS tictactoe;

USE tictactoe;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS moves;

CREATE TABLE users(
    email varchar(100) NOT NULL,
    role varchar(25) NOT NULL,
    token REAL DEFAULT 0,
    num_win INT DEFAULT 0,
    num_win_ab INT DEFAULT 0,
    num_win_vs_ia INT DEFAULT 0,
    num_lose INT DEFAULT 0,
    num_lose_ab INT DEFAULT 0,
    num_lose_vs_ia INT DEFAULT 0,
    PRIMARY KEY (email)
);

CREATE TABLE games(
    game_id INT AUTO_INCREMENT NOT NULL,
    player_1 varchar(100) NOT NULL,
    player_2 varchar(100) NOT NULL,
    game_open BOOLEAN DEFAULT true,
    game_abandoned BOOLEAN DEFAULT false,
    winner varchar(100), 
    loser varchar(100),
    turn_player varchar(100) NOT NULL,
    x_player varchar(100) NOT NULL,
    game_state_last varchar(100) NOT NULL,
    PRIMARY KEY (game_id)
);

CREATE TABLE moves(
    move_id INT AUTO_INCREMENT NOT NULL,
    player varchar(100) NOT NULL,
    game INT NOT NULL,
    game_state varchar(100) NOT NULL,
    start DATE NOT NULL,
    PRIMARY KEY (move_id)
);

INSERT INTO users (
    email, 
    role, 
    token,
    num_win,
    num_win_ab,
    num_lose,
    num_lose_ab)
VALUES 
('admin@email.com','admin', 20,3,0,1,0),
('user_1@email.com','user', 20,2,1,1,1),
('user_2@email.com','user', 20,7,1,0,0),
('user_3@email.com','user',0,7,0,4,2),
('user_4@email.com','user', 0,2,2,2,2),
('user_5@email.com','user', 0,1,1,1,1),
('IA','admin',0,5,2,4,0);

INSERT INTO games (
    game_id, 
    player_1, 
    player_2, 
    game_open, 
    game_abandoned, 
    winner, 
    loser, 
    turn_player, 
    x_player, 
    game_state_last)
VALUES 
('1','user_1@email.com','user_4@email.com',0,1,'user_1@email.com', 'user_4@email.com','user_4@email.com','user_4@email.com','["", "", "", "", "", "", "", "", ""]'),
('2','user_5@email.com','user_3@email.com',0,1,'user_3@email.com', 'user_5@email.com','user_5@email.com','user_5@mail.com','["", "", "", "", "", "", "", "", ""]'),
('3','user_2@email.com','user_4@email.com',0,1,'user_2@email.com', 'user_4@email.com','user_3@email.com','user_4@mail.com','["", "", "", "", "", "", "", "", ""]'),
('4','user_5@email.com','user_2@email.com',1,0,'', '','user_2@email.com','user_5@mail.com','["", "", "", "", "", "", "", "", ""]'),
('5','user_1@email.com','user_3@email.com',1,0,'', '','user_3@email.com','user_1@mail.com','["", "", "", "", "", "", "", "", ""]'),
('6','user_3@email.com','user_1@email.com',0,1,'user_3@email.com', 'user_1@email.com','user_3@email.com','user_43@mail.com','["", "", "", "", "", "", "", "", ""]'),
('7','user_3@email.com','user_1@email.com',0,1,'user_3@email.com', 'user_1@email.com','user_3@email.com','user_43@mail.com','["", "", "", "", "", "", "", "", ""]'),
('8','user_3@email.com','user_1@email.com',0,1,'user_3@email.com', 'user_1@email.com','user_3@email.com','user_43@mail.com','["", "", "", "", "", "", "", "", ""]');

INSERT INTO moves (
    move_id,
    player,
    game,
    game_state,
    start) 
VALUES 
('1','user_1@email.com','1','["X", "", "", "", "", "", "", "", ""]', CURDATE()),
('2','user_4@email.com','1','["X", "O", "", "", "", "", "", "", ""]', CURDATE()),
('3','user_1@email.com','1','["X", "O", "X", "", "", "", "", "", ""]', CURDATE()),
('4','user_5@email.com','2','["", "", "X", "", "", "", "", "", ""]', CURDATE()),
('5','user_3@email.com','2','["", "", "X", "", "O", "", "", "", ""]', CURDATE()),
('6','user_5@email.com','2','["", "", "X", "", "", "", "", "X", ""]', CURDATE());