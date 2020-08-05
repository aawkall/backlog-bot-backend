CREATE DATABASE IF NOT EXISTS backlog_bot;

-- TODO: At some point, go through a large list of all games and put in all the games you've beaten plus ratings
-- From back to PS1 maybe?

-- TODO: When selecting books, you may not want to consider OnHold
-- But, when selecting games, you should probably always consider OnHold to force you to finish things

CREATE TABLE IF NOT EXISTS books (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn CHAR(13) NOT NULL UNIQUE,
    cover_url VARCHAR(255),
    book_type ENUM('Fiction', 'NonFiction', 'SelfHelp', 'GraphicNovel', 'Professional') NOT NULL,
    shelf ENUM('WantToRead', 'CurrentlyReading', 'Read', 'OnHold') NOT NULL,
    current_page SMALLINT UNSIGNED DEFAULT 0,
    total_pages SMALLINT UNSIGNED NOT NULL,
    percentage_complete SMALLINT UNSIGNED NOT NULL,
    rating DECIMAL(2,1) DEFAULT -1.0,
    notes VARCHAR(255),
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

-- TODO: depends_on will contain an ID to another book or game that it depends on to be completed first
-- When adding or updating a new game / book, the UI will have to allow the user to select a book / game that it depends on
-- Then that ID can be passed in via the add / update and referenced here
-- Then, if the game or book is marked as complete or read, we need to update any dependent books to clear this column
-- This will require separate logic than just regular update - probably a separate API call as well
--
--
-- 1. Update the DB table model to add this depends_on field
-- 2. Remove any notes that have "first" in it, then update the depends_on field to reference the ID of the game
-- 3. Make sure all current DB data is setup correctly
-- 4. In the controller for updating a game or book, add new logic to check if the status is now read / completed
--    If so, we have to call a DB method to clear all dependencies for that ID
-- 5. DB method to specifically update all rows that have that ID in depends_on and delete that reference
-- 6. Update the random functions to omit things that "depends on" is not null
