const express = require('express');
const app = express();
app.use(express.json());

// This now stores many players by their name
let players = {};

app.post('/update', (req, res) => {
    const { playerName, bucks, gingerbread, sleighball, humbug } = req.body;
    
    // Save or update this specific player in the list
    players[playerName] = {
        bucks,
        gingerbread,
        sleighball,
        humbug,
        lastUpdate: new Date().toLocaleTimeString()
    };
    
    res.sendStatus(200);
});

app.get('/data', (req, res) => {
    res.json(players);
});

app.listen(10000, () => console.log("Multi-account server running"));
