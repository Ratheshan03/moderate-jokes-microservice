const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, jokeController.getJoke);
router.put("/", authMiddleware, jokeController.updateJoke);
router.post("/", authMiddleware, jokeController.submitJoke);
router.delete("/", authMiddleware, jokeController.deleteJoke);

module.exports = router;
