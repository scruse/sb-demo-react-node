require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3003;

app.use(cors());

// POST
// returns data from AWS page-data endpoint
app.post("/solo-brands", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(process.env.API_KEY);
  try {
    const { apiRoute } = req.params;
    const apiResponse = await fetch(
      "https://mvclo8gyq3.execute-api.us-east-2.amazonaws.com/latest/page-data",
      {
        method: "POST",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + process.env.API_KEY,
        },
      }
    );
    const apiResponseJson = await apiResponse.json();

    console.log(apiResponseJson);

    res.send(apiResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => console.log(port));
