const Router = require("express").Router;
const axios = require("axios");
const auth = require('../middlewares/auth');
const router = Router();
const CityController = require('../controllers/CityController');


// Constantes permettant d'appeler l'API OpenWeather
const API_KEY = "4113af7312fef078b1b929dd172c231d";
const API_URL = "https://samples.openweathermap.org/data/2.5/weather";

router.get("/weather/:city", auth, function(req, res) {
  const city = req.params.city;
  axios
    .get(`${API_URL}?q=${city}&appid=${API_KEY}`)
    .then(resp => res.status(200).json(resp.data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Routes permettant CRUD villes
router.post('/api/weather', auth,CityController.addCity);
router.delete('/api/weather',auth, CityController.deleteCity);
router.get('/api/weather', auth, CityController.getCities);

module.exports = router;
