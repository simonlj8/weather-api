//import express from express;

const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hej Hej Monica!!");
});

app.get('/api/weather', (req, res) => {
    const weatherResponse = {
        location: "Umeå",
        temperature: 1,
        condition: "Cloudy",
        windSpeed: 27,
        unit: "Celsius",
        timestamp: new Date().toISOString(),
    
    };

    res.json(weatherResponse);

});

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});