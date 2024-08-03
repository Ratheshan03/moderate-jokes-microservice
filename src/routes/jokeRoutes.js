const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Retrieve all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A list of jokes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
router.get("/", authMiddleware, jokeController.getJoke);

/**
 * @swagger
 * /api/jokes:
 *   put:
 *     summary: Update a joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       200:
 *         description: Joke updated successfully
 */
router.put("/", authMiddleware, jokeController.updateJoke);

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
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       200:
 *         description: Joke submitted successfully
 */
router.post("/", authMiddleware, jokeController.submitJoke);

/**
 * @swagger
 * /api/jokes:
 *   delete:
 *     summary: Delete a joke
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
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 */
router.delete("/", authMiddleware, jokeController.deleteJoke);

module.exports = router;
