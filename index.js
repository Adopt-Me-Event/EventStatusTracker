const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

let players = {}; 
let currentMasterKey = "KEY_START"; // Initial key

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// API to check the key and get data
app.get('/api/data', (req, res) => {
    const userKey = req.query.key;

    // If the key starts with KEY_ and the server is at START, or it matches the current one
    if (userKey && userKey.startsWith("KEY_")) {
        if (currentMasterKey === "KEY_START") {
            currentMasterKey = userKey; // Sets the key to whatever Lootdest gave you
        }
        
        if (userKey === currentMasterKey) {
            return res.json(players);
        }
    }
    
    res.status(401).json({ error: "Invalid Key" });
});

// Roblox update route
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
app.listen(PORT, () => console.log("Server Live. Waiting for first KEY_ input."));
