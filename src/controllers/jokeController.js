const Joke = require("../models/jokeModel"); // MongoDB Model
const MySQLJoke = require("../models/mysqlJokeModel"); // MySQL Model

exports.getJoke = async (req, res) => {
  try {
    const jokes = await Joke.find(); // MongoDB operation
    res.status(200).send(jokes);
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.status(500).send({ message: "Error fetching joke" });
  }
};

exports.updateJoke = async (req, res) => {
  const { jokeId, content, type } = req.body;
  try {
    await Joke.findByIdAndUpdate(jokeId, { content, type }); // MongoDB operation
    res.status(200).send({ message: "Joke updated successfully" });
  } catch (error) {
    console.error("Error updating joke:", error.message);
    res.status(500).send({ message: "Error updating joke" });
  }
};

exports.submitJoke = async (req, res) => {
  const { joke, type } = req.body;
  try {
    await MySQLJoke.create({ content: joke, type, is_moderated: true }); // MySQL operation
    res.status(200).send({ message: "Joke submitted to MySQL" });
  } catch (error) {
    console.error("Error submitting joke:", error.message);
    res.status(500).send({ message: "Error submitting joke" });
  }
};

exports.deleteJoke = async (req, res) => {
  const { jokeId } = req.body;
  try {
    await Joke.findByIdAndDelete(jokeId); // MongoDB operation
    res.status(200).send({ message: "Joke deleted successfully" });
  } catch (error) {
    console.error("Error deleting joke:", error.message);
    res.status(500).send({ message: "Error deleting joke" });
  }
};
