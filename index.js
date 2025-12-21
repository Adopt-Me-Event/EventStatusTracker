const express = require('express');
const app = express();
app.use(express.json());

let players = {}; 
let commandQueue = {}; 
let currentKey = "KEY_WAITING";

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/api/data', (req, res) => {
    const key = req.query.key;
    if (key && key.startsWith("KEY_")) {
        if (currentKey === "KEY_WAITING") currentKey = key;
        if (key === currentKey) return res.json(players);
    }
    res.status(401).send();
});

app.post('/send-command', (req, res) => {
    const { target, cmd, key } = req.body;
    if (key === currentKey) {
        commandQueue[target] = cmd;
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.post('/update', (req, res) => {
    const d = req.body;
    players[d.playerName] = d; // Stores everything including inventory
    
    // Send back command if one exists
    const cmd = commandQueue[d.playerName] || "";
    commandQueue[d.playerName] = ""; 
    res.send(cmd);
});

app.listen(10000);
