const jwt = require("jsonwebtoken");

// Vérification du token envoyé lors des requêtes
const auth = (req, res, next) => {
  if (req.headers.authorization != undefined) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    console.log(token);
    jwt.verify(
      token,
      "erngeondvdovndoer",
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ error: "Token must be provided" });
  }
};

module.exports = auth;