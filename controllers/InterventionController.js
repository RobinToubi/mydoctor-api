const Intervention = require("../models/Intervention");

class InterventionController {

    // GET : All
    static getInterventions(req,res) {
        Intervention
            .find()
            .then(interventions => {
                res.send(interventions);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Erreur recontrée lors de la récupération des données"
                });
            });
    }

    static getIntervention(req,res) {
        Intervention
            .findById({ _id: req.params.interventionId})
            .then(intervention => {
                if (!intervention)
                    return res.status(404).send({
                        message: "Intervention non trouvée"
                    });
                res.send(intervention);
            })
            .catch(err => {
                if (err.kind === 'ObjectId')
                    return res.status(404).send({
                        message: 'Intervention non trouvée'
                    });
                return res.status(500).send({
                    message: "Erreur lors de la récupération de l'intervention"
                });
            });
    }

    // POST : One
    static postIntervention(req,res) {
        // Validate request
        if(!req.body.content) {
            return res.status(400).send({
            message: "Intervention content can not be empty"
            });
        }

        // Create an Intervention
        const intervention = new Intervention({
            interventionID: req.body.idintervention, 
            circonstances: req.body.circonstances,
            soinsRealises: req.body.soins,
            suivis: req.body.suivi
        });

        // Save Note in the database
        note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la création de l'intervention."
            });
        });
    };

    // PUT : Update intervention
    static updateintervention(req,res) {
        // Check si le body comporte des données
        if (!req.body)
            return res.status(400).send({
                message: "Le body doit comporter des données"
            });
        
        // Find intervention
        Intervention.findByIdAndUpdate(req.params.interventionId, 
        {
            dossierId: req.body.dossierId,
            circonstances: req.body.circonstances,
            soinsRealises: req.body.soins,
            suivis: req.body.suivi
        }, {new: true})
        .then(intervention => {
            if (!intervention)
                return res.status(404).send({
                    message: "intervention non trouvé ou inexistant. Id du intervention en question :" + req.params.interventionId
                });
            res.send(intervention);
        })
        .catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({
                    message: "intervention non trouvé ou inexistant. Id du intervention en question :" + req.params.interventionId
                });
            return res.status(500).send({
                message: "Erreur lors de la récupération du intervention"
            });
        });
    }

    // DELETE : Supprimer une intervention
    static deleteIntervention(req,res) {
        Intervention.findByIdAndRemove(req.params.interventionId)
        .then(intervention => {
            if (!intervention)
                return res.status(404).send({
                    message: "Intervention non trouvé ou inexistant. Id du intervention en question :" + req.params.interventionId
                });
            res.send(intervention);
        })
        .catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({
                    message: "Intervention non trouvé ou inexistant. Id du intervention en question :" + req.params.interventionId
                });
            return res.status(500).send({
                message: "Erreur lors de la récupération de l'intervention"
            });
        });
    }
}

module.exports = InterventionController;