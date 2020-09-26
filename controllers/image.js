const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "400e944441c143bfae3ff1fa5b296b10",
});

const handleAPIcall = (req, res) => {
  // Clarifai.FACE_DETECT_MODEL
  // "c0c0ac362b03416da06ab3fa36fb58e3"
  console.log("this is the line:", req.body);
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body; // we send the id with the request
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.status(200).json(entries[0]))
    .catch((err) => res.status(400).json("unable to get count/entries"));
};

module.exports = {
  handleImage,
  handleAPIcall,
};
