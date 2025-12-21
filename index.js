const express = require('express');
const path = require('path'); // This helps find files reliably
const app = express();

app.use(express.json());

let players = {};

// 1. THE FIX: This tells the server exactly what to show at the URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. This is the API for the dashboard data
app.get('/api/data', (req, res) => {
    res.json(players);
});

// 3. This receives data from Roblox
app.post('/update', (req, res) => {
    const data = req.body;
    players[data.playerName] = {
        ...data,
        lastSeen: new Date().toLocaleTimeString()
    };
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Multi-account server live on port ${PORT}`);
});
