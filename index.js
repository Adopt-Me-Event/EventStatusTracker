const express = require('express');
const app = express();
app.use(express.json());

let players = {}; 
let currentMasterKey = "KEY_WAITING";

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/api/data', (req, res) => {
    const userKey = req.query.key;
    if (userKey && userKey.startsWith("KEY_")) {
        if (currentMasterKey === "KEY_WAITING") currentMasterKey = userKey;
        if (userKey === currentMasterKey) return res.json(players);
    }
    res.status(401).send();
});

app.post('/update', (req, res) => {
    const d = req.body;
    players[d.playerName] = {
        bucks: d.bucks,
        gingerbread: d.gingerbread,
        humbug: d.humbug,
        sleighball: d.sleighball,
        starcatch: d.starcatch,
        inGame: d.inGame,
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

app.listen(10000);
