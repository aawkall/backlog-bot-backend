CREATE DATABASE IF NOT EXISTS backlog_bot;

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
