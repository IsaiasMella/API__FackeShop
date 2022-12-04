CREATE DATABASE IF NOT EXISTS fackeshop_db
 
USE fackeshop_db

CREATE TABLE Users (
    id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,
    password VARCHAR(60) DEFAULT NULL,
    email VARCHAR(60) DEFAULT NULL
)

INSERT INTO users (name,last_name,password,email) VALUES (
'isaias',
'mella',
'123456',
'isaias.mella2013@gmail.com'
)