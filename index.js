const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// This serves your dashboard page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// This sends the data to your dashboard
app.get('/api/data', (req, res) => {
    res.json(players);
});

// This receives data from your Roblox accounts
app.post('/update', (req, res) => {
    const data = req.body;
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
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
