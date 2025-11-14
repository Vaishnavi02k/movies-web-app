CREATE DATABASE hackathon;
use hackathon;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(100),
    mobile VARCHAR(15),
    birth DATE,
    CONSTRAINT chk_mobile_number CHECK (mobile IS NULL OR mobile REGEXP '^[0-9]{10}$')
);


CREATE TABLE movies(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(25),
    description VARCHAR(100),
    img VARCHAR(30),
    releaseDate DATE
);
