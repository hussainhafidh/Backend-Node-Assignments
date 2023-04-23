const express = require("express");
const eventRoute = require("./Routes/events");
const db = require("mongoose");

const app = express();

app.use(express.json());
app.use("/", eventRoute);

db.connect("mongodb://localhost:27017/events")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
