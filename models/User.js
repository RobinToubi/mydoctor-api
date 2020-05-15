const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  firstname: {type: String, required: true},
  lastname: {type: String, required:true},
  isVerified: { type: Boolean, default: 0},
  isGod: { type: Boolean, default: 0}
});

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", function(next) {
  mongoose
    .model("User", UserSchema)
    .findOne({ username: this.username })
    .exec((err, user) => {
      if (err) next(err);
      else if (user) next(new Error("User already exist."));
      else {
        bcrypt
          .hash(this.password, 10)
          .then(hashedPassword => {
            this.password = hashedPassword;
            next();
          })
          .catch(err => next(err));
      }
    });
});

module.exports = mongoose.model("User", UserSchema);