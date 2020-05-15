const jwt = require("jsonwebtoken");

// Vérification du token envoyé lors des requêtes
const auth = (req, res, next) => {
  const isValidToken = jwt.verify(
    req.headers.authorization,
    "jesuisbatman"
  );
  if (isValidToken) {
    next();
  } else {
    res.status(401).json({ error: "Authorization required" });
  }
};

module.exports = auth;