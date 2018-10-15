const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/users")


const app = express();

mongoose
  .connect(
    "mongodb+srv://joel:ZURlWuvN3x2DEJOM@cluster0-fggwh.mongodb.net/post-db?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Connection to DB failed.");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);

module.exports = app;
