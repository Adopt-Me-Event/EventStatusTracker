const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// --- KEY GENERATION LOGIC ---
const getRequiredKey = () => {
    // Generates a code based on Year, Month, and Day (changes every 24 hours)
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    // This matches your requirement: "KEY_" + unique daily string
    return "KEY_" + date + "secure"; 
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// API protection: Key must match EXACTLY
app.get('/api/data', (req, res) => {
    const userKey = req.query.key;
    if (userKey === getRequiredKey()) {
        res.json(players);
    } else {
        res.status(401).json({ error: "Invalid Key. Get a new one from the link." });
    }
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

app.listen(10000, () => console.log("System Protected. Current Key: " + getRequiredKey()));
