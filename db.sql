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
    description VARCHAR(500),
    img VARCHAR(100),
    releaseDate DATE
);

CREATE TABLE reviews(
    id INT PRIMARY KEY AUTO_INCREMENT,
    review VARCHAR(500),
    rating INT(1),
    user_id INT ,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

