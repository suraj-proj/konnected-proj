-- Create Database
CREATE DATABASE konnected;

-- Create Ranks Table
CREATE TABLE ranks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        points VARCHAR(50) NOT NULL
        );
        INSERT INTO ranks (id, name, points) 
        VALUES (1, 'Beginner', '0 - 500 XP'),
        (2, 'Apprentice', '501 - 1000 XP'),
        (3, 'Journeymen', '1001 - 5000 XP'),
        (4, 'Expert', '5001 - 10000 XP'),
        (5, 'Master', '10001 - 25000 XP'),
        (6, 'Grandmaster', '25001 - 50000 XP'),
        (7, 'Legend', '50001+ XP')
        ON CONFLICT DO NOTHING;

-- Create Levels Table
CREATE TABLE levels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sl_name VARCHAR(255) NOT NULL,
        is_verified VARCHAR(1)
        );
INSERT INTO levels (id, name, is_verified) 
        VALUES (1, 'Grade 1', '1'),
        (2, 'Grade 2', '1'),
        (3, 'Grade 3', '2'),
        (4, 'Grade 4', '1'),
        (5, 'Grade 5', '1'),
        (6, 'Grade 6', '1'),
        (7, 'Grade 7', '1'),
        (8, 'Grade 8', '1'),
        (9, 'Grade 9', '1'),
        (10, 'Grade 10', '1'),
        (11, 'Grade 11 - Science', '1'),
        (12, 'Grade 12 - Science', '1'),
        (13, 'Grade 11 - Humanities', '1'),
        (14, 'Grade 12 - Humanities', '1'),
        (15, 'Grade 11 - Management', '1'),
        (16, 'Grade 12 - Management', '1')
        ON CONFLICT DO NOTHING;

-- Create Users table
CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(40) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(10),
        avatar VARCHAR(1000),
        bio VARCHAR(255),
        points INT,
        rank INT,
        level INT,
        is_admin VARCHAR(1),
        is_activated VARCHAR(1),
        reset_token VARCHAR(100),
        activate_token VARCHAR(100),
        CONSTRAINT fk_rank
          FOREIGN KEY(rank) 
          REFERENCES ranks(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        CONSTRAINT fk_level
          FOREIGN KEY(level) 
          REFERENCES levels(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
        );
-- Create Books Table
CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        s_name VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        level INT,
        author VARCHAR(50),
        is_verified VARCHAR(1),
        CONSTRAINT fk_level
          FOREIGN KEY(level) 
          REFERENCES levels(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
);
-- Create Topics Table
CREATE TABLE topics (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        st_name VARCHAR(255) NOT NULL,
        book INT,
        CONSTRAINT fk_book
          FOREIGN KEY(book) 
          REFERENCES books(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
);

-- Create BookLevel Junction Table
CREATE TABLE bookLevel (
        id SERIAL PRIMARY KEY,
        book_id INT,
        level_id INT,
        CONSTRAINT fk_book
          FOREIGN KEY(book_id) 
          REFERENCES books(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        CONSTRAINT fk_level
          FOREIGN KEY(level_id) 
          REFERENCES levels(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
);