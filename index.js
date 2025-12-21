const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// This object holds all players. Key = Player Name, Value = Their Data
let players = {}; 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Sends all player data to the dashboard
app.get('/api/data', (req, res) => {
    res.json(players);
});

// Receives data from any account running the script
app.post('/update', (req, res) => {
    const data = req.body;
    if (!data.playerName) return res.sendStatus(400);

    // This creates or updates the specific slot for this player name
    players[data.playerName] = {
        bucks: data.bucks,
        gingerbread: data.gingerbread,
        humbug: data.humbug,
        sleighball: data.sleighball,
        starcatch: data.starcatch,
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Multi-player tracker live on port ${PORT}`));
