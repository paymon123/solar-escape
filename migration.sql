CREATE DATABASE phaser_game;
\c phaser_game
CREATE TABLE scores (
    ID int NOT NULL PRIMARY KEY,
    username text NOT NULL,
    score text NOT NULL
  
);

