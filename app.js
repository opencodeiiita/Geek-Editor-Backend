const express = require("express");
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

const app = express();

//Set Up the Assets Folder
app.use(express.static(path.join(__dirname, "public")));

//require passport

require("./config/passport");

// Passport Config
// require('./config/passport')(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Db Connection from .env file
// const db = process.env.MONGO_URI;

// Connect to MongoDB
if (db) {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    // store: MongoStore.create({
    //   mongoUrl: db,
    // }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./api/api.js"));
app.use("/code", require("./api/codeapi.js"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
