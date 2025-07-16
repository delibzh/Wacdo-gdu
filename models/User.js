const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "preparation", "accueil", "client"],
    },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

// haché le mdp vant de sauvegarder l'utilisateur :
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    //généré un sel et hashé le mdp  ( 10 tour pour équilibrer sécu + perfs)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // passer l'erreur au middleware suivant
  }
});

//méthode pour  comparer le mdp saisi avec le mdp hashé
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.plugin(uniqueValidator, { message: "{PATH} doit être unique" });

module.exports = mongoose.model("User", userSchema);
