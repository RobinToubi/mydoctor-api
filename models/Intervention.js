const mongoose = require('mongoose');
const DossierSchema = require("./Dossier");

const InterventionSchema = new mongoose.Schema({
    dossierId: {type: String, required:true, index: true },
    circonstances: { type: String, default: "" },
    soinsRealises: { type: String, default: "" },
    suivis: { type: String, default: "" }
});

InterventionSchema.pre('save', (next) => {
    mongoose
        .model("Dossier", DossierSchema)
        .findById({ _id: this.dossierId })
        .exec((err, dossier) => {
            if (err) next(err);
            else if (dossier) next();
        });
});

// On exporte le schéma que nous venons de construire
module.exports = mongoose.model("Intervention", InterventionSchema);