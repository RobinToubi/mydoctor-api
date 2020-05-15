const mongoose = require('mongoose');

const InterventionSchema = new mongoose.Schema({
    circonstances: { type: String, default: "" },
    soinsRealises: { type: String, default: "" },
    suivis: { type: String, default: "" },
    dossierId: {type: String, required:true, index: true }
});

// On exporte le schéma que nous venons de construire
module.exports = mongoose.model("Intervention", InterventionSchema);