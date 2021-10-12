const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

const app = express();


// SET UP THE ASSETS FOLDER
app.use(express.static(path.join(__dirname, "public")));


// REQUIRE PASSPORT
require("./config/passport");


// DB CONFIG
const db = require("./config/keys").MongoURI;


// CONNECT TO MongoDB
if (db) {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}


// EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// EXPRESS SESSION
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use("/", require("./api/api.js"));
app.use("/code", require("./api/codeapi.js"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
