const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; // This holds all active accounts

// Route to receive data from Roblox
app.post('/update', (req, res) => {
    const data = req.body;
    players[data.playerName] = {
        ...data,
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

// Route for the website to get the data
app.get('/api/data', (req, res) => res.json(players));

// Route to show the dashboard
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(10000, () => console.log("Multi-account server live on port 10000"));
