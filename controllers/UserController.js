const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_KEY = "jesuisbatman";

class UserController {
  static register(req, res) {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) res.status(401).json({ error: err.message });
      else {
        newUser.password = undefined;
        newUser.isGod = undefined;
        newUser.isVerified = undefined;
        res.status(201).json(newUser);
      }
    });
  }

  static login(req, res) {
    User.findOne({ username: req.body.username }).exec((err, user) => {
      if (err) res.status(401).json({ error: err.message });
      else if (!user) res.status(401).json({ error: "User does not exist." });
      else {
        user
          .isValidPassword(req.body.password)
          .then(isValid => {
            if (!isValid) res.status(401).json({ error: "Invalid password." });
            else {
              const token = jwt.sign(
                { username: user.username,
                  nom: user.nom },
                  JWT_KEY
              );
              res.status(200).json({ token: token });
            }
          })
          .catch(err => res.status(401).json({ error: err.message }));
      }
    });
  }

  // Vérifier qu'un utilisateur est bien authentifié
  static verify(req,res) {
    const token = JSON.parse(req.body.token);

    jwt.verify(
      token['token'],
      JWT_KEY,
      (err,verifiedJwt) => {
        if (err) { 
            console.log(err.message);
            res.status(401);
            res.send(verifiedJwt);
        } else {
          res.status(200);
          res.send(verifiedJwt);
        }
      }
    )
  }

  static getUnvrifiedUsers(req,res) {
    User.find({
      isVerified: 0
    }).exec((err,users) => {
      if (err) res.status(401).json({ error: err.message });
      else {
        res.status(200).json({ users })
      }
    })
  }
}

module.exports = UserController;
