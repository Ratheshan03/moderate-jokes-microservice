const axios = require("axios");

const SUBMIT_JOKES_URL = "http://localhost:3001";
const DELIVER_JOKES_URL = "http://localhost:3000";

exports.getJoke = async (req, res) => {
  try {
    const response = await axios.get(`${SUBMIT_JOKES_URL}/jokes`);
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.status(500).send({ message: "Error fetching joke" });
  }
};

exports.updateJoke = async (req, res) => {
  const { jokeId, content, type } = req.body;
  console.log("Update Request Data:", { jokeId, content, type });

  try {
    const response = await axios.put(`${SUBMIT_JOKES_URL}/jokes/${jokeId}`, {
      content,
      type,
    });
    console.log("Update Response:", response.data);
    res.status(200).send({ message: "Joke updated successfully" });
  } catch (error) {
    console.error("Error updating joke:", error.message);
    res.status(500).send({ message: "Error updating joke" });
  }
};

exports.submitJoke = async (req, res) => {
  const { joke, type } = req.body;

  try {
    const jokeData = {
      content: joke,
      type: type,
      is_moderated: true,
    };

    await axios.post(`${DELIVER_JOKES_URL}/jokes`, jokeData);
    res.status(200).send({ message: "Joke submitted to Deliver Jokes" });
  } catch (error) {
    console.error("Error submitting joke:", error.message);
    res.status(500).send({ message: "Error submitting joke" });
  }
};

exports.deleteJoke = async (req, res) => {
  const { jokeId } = req.body;
  try {
    console.log(`Deleting joke with ID: ${jokeId}`);
    await axios.delete(`${SUBMIT_JOKES_URL}/jokes/${jokeId}`);
    res.status(200).send({ message: "Joke deleted successfully" });
  } catch (error) {
    console.error("Error deleting joke:", error.message);
    res.status(500).send({ message: "Error deleting joke" });
  }
};
