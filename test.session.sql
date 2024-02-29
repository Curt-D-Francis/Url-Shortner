
--@block
CREATE TABLE URLMappings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    originalURL VARCHAR(255),
    shortenedURL VARCHAR(50) UNIQUE
);
