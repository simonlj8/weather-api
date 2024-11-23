//import express from express;

require('dotenv').config();
const express = require('express');
const app = express();

const apiKey = process.env.API_KEY;
const redisConnection = process.env.API_KEY;
const PORT = process.env.PORT

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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});