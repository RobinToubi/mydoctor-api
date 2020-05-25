const Dossier = require("../models/Dossier");

class DossierController {

    // GET : all
    static getAllDossier(req,res) {
        Dossier
            .find()
            .then(dossiers => {
                res.send(dossiers);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Erreur rencontrée lors de la récupération des dossiers"
                });
            });
    }

    // GET : by ID
    static getDossierById(req,res) {
        Dossier.findById({
            _id: req.params.dossierId
        })
        .then(dossier => {
            if (!dossier) 
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            res.send(dossier);
        })
        .catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            return res.status(500).send({
                message: "Erreur lors de la récupération du dossier"
            });
        });
    }

    // POST : Créer Dossier
    static createDossier(req,res) {
        // Check si le body comporte des données
        if (!req.body)
            return res.status(400).send({
                message: "Le body doit comporter des données"
            });
        
        // Création du dossier
        const dossier = new Dossier({
            nom: req.body.nom,
            prenom: req.body.prenom,
            birthDate: req.body.birthDate,
            mobilePhone: req.body.mobilePhone,
            profession: req.body.profession,
            height: req.body.height,
            weight: req.body.weight,
            groupeSanguin: req.body.groupeSanguin,
            drogue: req.body.drogue,
            alcool: req.body.alcool,
            tabac: req.body.tabac,
            description: req.body.description
        });

        // Sauvegarde dans la BDD
        dossier
            .save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Erreur rencontrée lors de la récupération des dossiers"
                });
            });
    }

    // PUT : Update dossier
    static updateDossier(req,res) {
        // Check si le body comporte des données
        if (!req.body)
            return res.status(400).send({
                message: "Le body doit comporter des données"
            });
        
        // Find dossier
        Dossier.findByIdAndUpdate(req.params.dossierId, 
        {
            nom: req.body.nom,
            prenom: req.body.prenom,
            birthDate: req.body.birthDate,
            mobilePhone: req.body.mobilePhone,
            profession: req.body.profession,
            height: req.body.height,
            weight: req.body.weight,
            groupeSanguin: req.body.groupeSanguin,
            drogue: req.body.drogue,
            alcool: req.body.alcool,
            tabac: req.body.tabac,
            description: req.body.description
        }, {new: true})
        .then(dossier => {
            if (!dossier)
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            res.send(dossier);
        })
        .catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            return res.status(500).send({
                message: "Erreur lors de la récupération du dossier"
            });
        });
    }

    // DELETE : Supprimer un dossier
    static deleteDossier(req,res) {
        Dossier.findByIdAndRemove(req.params.dossierId)
        .then(dossier => {
            if (!dossier)
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            res.send(dossier);
        })
        .catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({
                    message: "Dossier non trouvé ou inexistant. Id du dossier en question :" + req.params.dossierId
                });
            return res.status(500).send({
                message: "Erreur lors de la récupération du dossier"
            });
        });
    }
}

module.exports = DossierController;