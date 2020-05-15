const mongoose = require("mongoose");

// Schéma
const DossierSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type:String, required: true },
    birthDate: { type: Date, required: true },
    mobilePhone: { type: Number, default: 0 },
    profession: { type: String, default:"" },
    height: {type: Number, default: "" },
    weight: {type: Number, default: "" },
    groupeSanguin: { type: String, default:"" },
    drogue: { type: String, default:"" },
    alcool: { type: String, default:"" },
    tabac: { type: String, default:"" },
    description: { type: String, default:"" }
});

// Effectuer ce traitement avant de sauvegarder un élément
DossierSchema.pre("save", function(next) {
    mongoose
        .model("Dossier", DossierSchema)
        .findOne({ 
            _id: this._id       
        })
        .exec((err, dossier) => {
            if (err) next(err);
            else if (dossier) next(new Error("Ce dossier existe déjà."));
            else {
                next();
            }
        })
});

// On exporte le schéma que nous venons de construire
module.exports = mongoose.model("Dossier", DossierSchema);