const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// --- DUAL-KEY LOGIC (Fixes Timezone Mismatch) ---
const getValidKeys = () => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const formatDate = (date) => date.toISOString().slice(0, 10).replace(/-/g, "");
    
    // Generates keys for Today and Yesterday in UTC
    return [
        "KEY_" + formatDate(now) + "secure",
        "KEY_" + formatDate(yesterday) + "secure"
    ];
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// API protection: Key must match one of the two valid UTC keys
app.get('/api/data', (req, res) => {
    const userKey = req.query.key;
    const validKeys = getValidKeys();

    if (validKeys.includes(userKey)) {
        res.json(players);
    } else {
        console.log(`[AUTH] Rejected: ${userKey}. Server expecting one of:`, validKeys);
        res.status(401).json({ error: "Invalid Key." });
    }
});

app.post('/update', (req, res) => {
    const d = req.body;
    if (!d.playerName) return res.sendStatus(400);
    players[d.playerName] = {
        bucks: d.bucks, gingerbread: d.gingerbread,
        humbug: d.humbug, sleighball: d.sleighball, starcatch: d.starcatch,
        inGame: d.inGame, lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log("SERVER LIVE. Acceptable Keys today:");
    getValidKeys().forEach(k => console.log(" > " + k));
    console.log("-----------------------------------------");
});
