import { createConnection } from 'mysql';
import { createInterface } from 'readline';
import express from 'express';
const app = express();
import { nanoid } from 'nanoid'; // Install via: npm install nanoid

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "Number1jr!",
    database: "Url" // Change to your database name
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to generate a unique shortened URL
function genShortenedURL() {
    return nanoid(6);
}

// Route to handle redirection from shortened URL to original URL
app.get('/:shortenedURL', (req, res) => {
    const { shortenedURL } = req.params;
    connection.query('SELECT originalURL FROM URLMappings WHERE shortenedURL = ?', [shortenedURL], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const originalURL = results[0].originalURL;
                res.redirect(originalURL);
            } else {
                res.status(404).send('Shortened URL not found');
            }
        }
    });
});

rl.question("Please enter URL: ", (originalURL) => {
    const shortenedURL = genShortenedURL();
    const query = 'INSERT INTO URLMappings (originalURL, shortenedURL) VALUES (?, ?)';
    const values = [originalURL, shortenedURL];
    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(error);
        } else {
            console.log('URLs inserted successfully.');
            console.log('Shortened URL:', shortenedURL);
        }
        connection.end();
        rl.close();
    });
});

connection.connect();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
