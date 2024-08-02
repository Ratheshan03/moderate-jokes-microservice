const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const user = {
  email: "admin@admin.com",
  password: bcrypt.hashSync("admin123", 8),
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({ accessToken: token });
};
