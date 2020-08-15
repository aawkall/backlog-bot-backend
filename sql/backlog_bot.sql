CREATE DATABASE IF NOT EXISTS backlog_bot;

CREATE TABLE IF NOT EXISTS books (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn CHAR(13) NOT NULL UNIQUE,
    cover_url VARCHAR(255),
    book_type ENUM('Fiction', 'NonFiction', 'SelfHelp', 'GraphicNovel', 'Professional') NOT NULL,
    notes VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS games (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    platform ENUM('Nintendo3DS', '3DSEmulation', 'PCEmulation', 'AppleArcade', 'iOS', 'OculusQuest', 'PC', 'PS3', 'PS4', 'VitaEmulated', 'PSP', 'PSVita', 'PSVR', 'NintendoSwitch', 'Wii', 'WiiU', 'XboxOne') NOT NULL,
    platform_type ENUM('PC', 'Console', 'VR', 'Handheld', 'Mobile') NOT NULL,
    cover_url VARCHAR(255),
    notes VARCHAR(255),
    PRIMARY KEY (id)
);
