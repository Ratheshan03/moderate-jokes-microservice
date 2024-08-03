const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Admin User
const user = {
  email: "admin@admin.com",
  password: bcrypt.hashSync("admin123", 8),
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */
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
