const Joke = require("../models/jokeModel");
const MySQLJoke = require("../models/mysqlJokeModel");

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Retrieve all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Successfully retrieved jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   type:
 *                     type: string
 *                   is_moderated:
 *                     type: boolean
 *       500:
 *         description: Error fetching joke
 */
exports.getJoke = async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.status(200).send(jokes);
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.status(500).send({ message: "Error fetching joke" });
  }
};

/**
 * @swagger
 * /api/jokes:
 *   put:
 *     summary: Update an existing joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jokeId:
 *                 type: string
 *                 example: "64a7a9f8c2a9d76e84390bba"
 *               content:
 *                 type: string
 *                 example: "Why did the scarecrow win an award? Because he was outstanding in his field!"
 *               type:
 *                 type: string
 *                 example: "pun"
 *     responses:
 *       200:
 *         description: Joke updated successfully
 *       500:
 *         description: Error updating joke
 */
exports.updateJoke = async (req, res) => {
  const { jokeId, content, type } = req.body;
  try {
    await Joke.findByIdAndUpdate(jokeId, { content, type });
    res.status(200).send({ message: "Joke updated successfully" });
  } catch (error) {
    console.error("Error updating joke:", error.message);
    res.status(500).send({ message: "Error updating joke" });
  }
};

/**
 * @swagger
 * /api/jokes:
 *   post:
 *     summary: Submit a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               joke:
 *                 type: string
 *                 example: "Why don't skeletons fight each other? They don't have the guts."
 *               type:
 *                 type: string
 *                 example: "one-liner"
 *     responses:
 *       200:
 *         description: Joke submitted successfully
 *       500:
 *         description: Error submitting joke
 */
exports.submitJoke = async (req, res) => {
  const { joke, type } = req.body;
  try {
    await MySQLJoke.create({ content: joke, type, is_moderated: true });
    res.status(200).send({ message: "Joke submitted to MySQL" });
  } catch (error) {
    console.error("Error submitting joke:", error.message);
    res.status(500).send({ message: "Error submitting joke" });
  }
};

/**
 * @swagger
 * /api/jokes:
 *   delete:
 *     summary: Delete an existing joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jokeId:
 *                 type: string
 *                 example: "64a7a9f8c2a9d76e84390bba"
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *       500:
 *         description: Error deleting joke
 */
exports.deleteJoke = async (req, res) => {
  const { jokeId } = req.body;
  try {
    await Joke.findByIdAndDelete(jokeId);
    res.status(200).send({ message: "Joke deleted successfully" });
  } catch (error) {
    console.error("Error deleting joke:", error.message);
    res.status(500).send({ message: "Error deleting joke" });
  }
};
