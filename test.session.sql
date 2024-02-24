--@block
CREATE TABLE UserInput(
    id INT PRIMARY KEY,
    actualURL VARCHAR(255)
);

--@block
CREATE TABLE OutputURL(
    id INT PRIMARY KEY,
    newURL VARCHAR(255)
)
--@block
CREATE TABLE URLMappings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    originalURL VARCHAR(255),
    shortenedURL VARCHAR(50) UNIQUE
);