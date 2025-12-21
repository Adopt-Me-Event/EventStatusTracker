const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

// This variable holds your data in the server's memory
let gameData = { 
    playerName: "Waiting for Data...", 
    bucks: 0, 
    gingerbread: 0, 
    sleighball: "00:00",
    humbug: "00:00",
    star: "00:00"
};

// Roblox will send data to: https://your-site.onrender.com/update
app.post('/update', (req, res) => {
    gameData = req.body;
    res.sendStatus(200); 
});

// The website will request data from: https://your-site.onrender.com/api/data
app.get('/api/data', (req, res) => {
    res.json(gameData);
});

// Serves the HTML file when you visit the main link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));