const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/WeatherDB");
mongoose.connection.once("open", () => {
  console.log("Connected to database:", mongoose.connection.name);
});

// Bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
