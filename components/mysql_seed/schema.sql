CREATE DATABASE IF NOT EXISTS tictactoe;

USE tictactoe;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS moves;

CREATE TABLE users(
    email varchar(100) NOT NULL,
    role enum('player', 'admin') NOT NULL,
    token REAL DEFAULT 0,
    num_win INT DEFAULT 0,
    num_win_ab INT DEFAULT 0,
    num_win_vs_ia INT DEFAULT 0,
    num_lose INT DEFAULT 0,
    num_lose_ab INT DEFAULT 0,
    num_lose_vs_ia INT DEFAULT 0,
    PRIMARY KEY (email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

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
('user_1@email.com','player', 20,2,1,1,1),
('user_2@email.com','player', 20,7,1,0,0),
('user_3@email.com','player',0,7,0,4,2),
('user_4@email.com','player', 0,2,2,2,2),
('user_5@email.com','player', 0,1,1,1,1),
('IA','admin',0,5,2,4,0);

CREATE TABLE games(
    game_id INT AUTO_INCREMENT NOT NULL,
    player_1 varchar(100) NOT NULL,
    player_2 varchar(100) NOT NULL,
    status enum('open', 'abandoned', 'close_request_player1', 'close_request_player2') NOT NULL,
    winner varchar(100), 
    loser varchar(100),
    turn_player varchar(100) NOT NULL,
    x_player varchar(100) NOT NULL,
    game_state_last varchar(100) NOT NULL,
    start DATE NOT NULL,
    PRIMARY KEY (game_id),
    FOREIGN KEY (player_1) REFERENCES users(email),
    FOREIGN KEY (player_2) REFERENCES users(email),
    FOREIGN KEY (winner) REFERENCES users(email),
    FOREIGN KEY (loser) REFERENCES users(email),
    FOREIGN KEY (turn_player) REFERENCES users(email),
    FOREIGN KEY (x_player) REFERENCES users(email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


CREATE TABLE moves(
    move_id INT AUTO_INCREMENT NOT NULL,
    player varchar(100) NOT NULL,
    game INT NOT NULL,
    game_state varchar(100) NOT NULL,
    start DATE NOT NULL,
    PRIMARY KEY (move_id),
    FOREIGN KEY (game) REFERENCES games(game_id),
    FOREIGN KEY (player) REFERENCES users(email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;