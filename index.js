const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 
let currentMasterKey = "KEY_START"; // Server resets to this on restart

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/data', (req, res) => {
    const userKey = req.query.key;
    if (userKey && userKey.startsWith("KEY_")) {
        // If it's a new session, the first KEY_ entered becomes the master
        if (currentMasterKey === "KEY_START") currentMasterKey = userKey;
        if (userKey === currentMasterKey) return res.json(players);
    }
    res.status(401).json({ error: "Invalid Key" });
});

app.post('/update', (req, res) => {
    const d = req.body;
    players[d.playerName] = {
        bucks: d.bucks, gingerbread: d.gingerbread,
        humbug: d.humbug, sleighball: d.sleighball, starcatch: d.starcatch,
        inGame: d.inGame, lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server Live and Secure"));
