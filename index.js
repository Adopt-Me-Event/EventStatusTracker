const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// Route to show the dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the webpage to get data
app.get('/api/data', (req, res) => res.json(players));

// Receiving data from Roblox
app.post('/update', (req, res) => {
    const data = req.body;
    players[data.playerName] = {
        bucks: data.bucks,
        gingerbread: data.gingerbread,
        humbug: data.humbug,         // Data slot 1
        sleighball: data.sleighball, // Data slot 2
        starcatch: data.starcatch,   // Data slot 3
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Full Multi-Timer Server Live"));
