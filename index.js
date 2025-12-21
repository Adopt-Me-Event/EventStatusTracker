const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// Root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// API for the website to read
app.get('/api/data', (req, res) => res.json(players));

// Receiver for Roblox data
app.post('/update', (req, res) => {
    const data = req.body;
    players[data.playerName] = {
        bucks: data.bucks,
        gingerbread: data.gingerbread,
        humbug: data.humbug,     // Timer 1
        sleighball: data.sleighball, // Timer 2
        starcatch: data.starcatch,   // Timer 3
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Full Tracker Service Live"));
