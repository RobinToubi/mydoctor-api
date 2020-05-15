// const City = require("../models/City");

// class CityController {

//   // Récupérer toutes les villes reliées à l'username donné en paramètre
//   static getCities(req, res) {
//     console.log(req.body);
//     City.find({
//       username: 'rgimenez'
//     }).exec((err, cities) => {
//       if (err) res.status(500).json({ error: err.message });
//       res.status(200).json({ cities });
//       console.log(cities.id);
//     });
//   }

//   // Permet d'ajouter une ville à nos villes préférées
//   static addCity(req, res) {
//     new City({
//       id: req.body.cityId,
//       username: req.body.username, 
//     }).save((err, city) => {
//       (err) ? res.status(500).json({ error: err.message }) : res.status(201).json({ city });
//     });
//   }

//   // Permet de supprimer une ville de nos villes préférées
//   static deleteCity(req,res) {
//     City.findOneAndRemove({
//       cityId: req.body.cityId,
//       username: req.body.username
//     }).exec((err, cities) => {
//       (err) ? res.status(500).json({ error: err.message })
//       : res.status(200).json({
//         message: "City deleted from favorites cities",
//         id: req.body.cityId
//         });
//     });
//   }
// }

// module.exports = CityController;
