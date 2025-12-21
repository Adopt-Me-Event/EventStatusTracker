const express = require('express');
const path = require('path');
const app = express();

// Increase JSON limit to handle large inventories
app.use(express.json({ limit: '10mb' }));

let players = {}; 
let commandQueue = {}; 

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// PUBLIC API: No key required anymore
app.get('/api/data', (req, res) => {
    res.json(players);
});

// Sends commands to Roblox (Optional feature)
app.post('/send-command', (req, res) => {
    const { target, cmd } = req.body;
    commandQueue[target] = cmd;
    res.sendStatus(200);
});

// Receives data from Roblox LocalScript
app.post('/update', (req, res) => {
    const d = req.body;
    if (d && d.playerName) {
        players[d.playerName] = d; 
        
        // Check for pending commands for this player
        const cmd = commandQueue[d.playerName] || "";
        commandQueue[d.playerName] = ""; 
        res.send(cmd);
    } else {
        res.status(400).send("Invalid Data");
    }
});

// Listen on Render's port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
