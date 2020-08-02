CREATE DATABASE IF NOT EXISTS backlog_bot;

-- TODO: If I'm going to use the title / author, etc directly in the UI
-- I need to make sure those fields are stored case sensitive

-- TODO: consider adding an FK link 'depends on' to games
-- Then we can skip any games that have a 'depends on' when choosing a random one
-- And when the game that something depends on is completed, that link is deleted
-- TODO: OR - you can just check the notes for "first". And when you mark a game as completed, give the user a chance to update the notes

-- TODO: At some point, go through a large list of all games and put in all the games you've beaten plus ratings
-- From back to PS1 maybe?

-- TODO: When selecting books, you may not want to consider OnHold
-- But, when selecting games, you should probably always consider OnHold to force you to finish things

CREATE TABLE IF NOT EXISTS books (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn BIGINT UNSIGNED NOT NULL UNIQUE,
    cover_url VARCHAR(255),
    book_type ENUM('Fiction', 'NonFiction', 'SelfHelp', 'GraphicNovel', 'Professional') NOT NULL,
    shelf ENUM('WantToRead', 'CurrentlyReading', 'Read', 'OnHold') NOT NULL,
    current_page SMALLINT UNSIGNED DEFAULT 0,
    total_pages SMALLINT UNSIGNED NOT NULL,
    percentage_complete SMALLINT UNSIGNED NOT NULL,
    rating DECIMAL(2,1) DEFAULT -1.0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS games (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    platform ENUM('Nintendo 3DS', '3DS Emulation', 'PC Emulation', 'Apple Arcade', 'iOS', 'Oculus Quest', 'PC', 'PS3', 'PS4', 'Vita Emulated', 'PSP', 'PS Vita', 'PS VR', 'Nintendo Switch', 'Wii', 'Wii U', 'Xbox One') NOT NULL,
    platform_type ENUM('PC', 'PC TV', 'Console', 'VR', 'Handheld', 'Mobile') NOT NULL,
    status ENUM('Backlog', 'CurrentlyPlaying', 'Completed', 'OnHold') NOT NULL,
    cover_url VARCHAR(255),
    rating TINYINT DEFAULT -1,
    notes VARCHAR(255),
    PRIMARY KEY (id)
);
