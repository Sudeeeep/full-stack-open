const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "must be atleast 3 characters long"],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

UserSchema.plugin(uniqueValidator);

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", UserSchema);
