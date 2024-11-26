import express from "express"
import 'dotenv/config';
import axios from "axios";
import {rateLimit} from "express-rate-limit";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";

const app = express();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';
const redisConnection = process.env.API_KEY;
const PORT = process.env.PORT || 3000

app.set('trust proxy', 1);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve frontend build files
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());


const limiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000,
        limit: 20,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        message: {
        error: 'To many request, try again later.',
    },
    }
)

app.use('/api/weather', limiter)

app.get("/", (req, res) => {
    res.send("Nothing to see here");
});

// app.get('/api', (req, res) => {
//     res.send("Nothing to see here");
// });

async function getWeather(location) {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: location, // Plats 
                aqi: 'yes',   // Air Quality Index, sätt till "yes" om du vill ha AQI-data
            },
        });

        const weatherData = response.data;
        console.log(`Vädret i ${location}:`, weatherData);
        return weatherData;
    } catch (error) {
        console.error('Kunde inte hämta väderdata:', error.message);
    }
}

// Testa funktionen
getWeather('UMEÅ');


app.get('/api/weather/:location', async (req, res) => {
    const location = req.params.location;
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: location,
                aqi: 'yes',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.log("Fel vid hämtning av väderdata:", error.message);
        res.status(500).json({error: 'Kan inte hämrta väderdata'})
    }
});

// Serve React frontend for all routes not starting with /api
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

////// Hardcoded for test
// app.get('/api/weather', (req, res) => {
//     const weatherResponse = {
//         location: "Umeå",
//         temperature: 2,
//         condition: "Cloudy",
//         windSpeed: 27,
//         unit: "Celsius",
//         timestamp: new Date().toISOString(),
    
//     };

//     res.json(weatherResponse);

// });
///////


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"))
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});