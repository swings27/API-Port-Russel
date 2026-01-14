const axios = require('axios');

// Middleware pour charger météo et marée actuelle
exports.loadWeatherAndTides = async (req, res, next) => {

    // 1️⃣ Fonctions internes
    const getWeather = async (ville) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`
            );
            return {
                ville: res.data.name,
                temperature: res.data.main.temp,
                description: res.data.weather[0].description
            };
        } catch (err) {
            console.error('Erreur météo :', err.message);
            return null;
        }
    };

    const getTides = async (lat, lon) => {
        try {
            const res = await axios.get('https://www.worldtides.info/api/v3', {
                params: {
                    heights: true,
                    lat: lat,
                    lon: lon,
                    key: process.env.WORLDTIDES_API_KEY
                }
            });
            return res.data;
        } catch (err) {
            console.error('Erreur marées :', err.message);
            return null;
        }
    };

    try {
        // 2️⃣ Ville définie pour météo et marées
        const ville = 'Marseille';
        const lat = '43.2965';
        const lon = '5.3698';

        // 3️⃣ Récupérer les données
        const weather = await getWeather(ville);
        const tidesData = await getTides(lat, lon);

        // 4️⃣ Filtrer la marée actuelle (la plus proche)
        let currentTide = null;
        if (tidesData && tidesData.heights) {
            const now = Date.now();
            currentTide = tidesData.heights.reduce((prev, curr) => {
                return Math.abs(curr.dt * 1000 - now) < Math.abs(prev.dt * 1000 - now)
                    ? curr
                    : prev;
            }, tidesData.heights[0]);
        }

        // ✅ Ajouter à res.locals pour être disponibles dans toutes les vues
        res.locals.weather = weather;
        res.locals.currentTide = currentTide;

        next();
    } catch (err) {
        console.error('Erreur chargement météo/marées :', err);
        req.weather = null;
        req.currentTide = null;
        next();
    }
};