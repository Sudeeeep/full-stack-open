const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
require("express-async-errors");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    response.status(400).json({
      error:
        "User validation failed: password: must be atleast 3 characters long",
    });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
