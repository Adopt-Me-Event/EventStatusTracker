const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 

// --- PASSCODE LOGIC ---
// This generates a unique code for the day (e.g., "Code-20251221")
const getDailyPasscode = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return "VIP" + date; // Your passcode today would be VIP20251221
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Protect the data: Only send if the passcode in the request is correct
app.get('/api/data', (req, res) => {
    const userCode = req.query.pass;
    if (userCode === getDailyPasscode()) {
        res.json(players);
    } else {
        res.status(401).json({ error: "Invalid or Expired Passcode" });
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

app.listen(10000, () => console.log("Secure Tracker Live. Passcode is: " + getDailyPasscode()));
