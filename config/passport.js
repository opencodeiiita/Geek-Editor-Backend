// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/user");
// // const connection = require("./database");
// // const User = connection.models.User;
// const validPassword = require("../utils/passwordUtils").validPassword;
// const bodyParser = require("body-parser");

// const verifyCallback = (username, password, done) => {
//   User.findOne({ username: username }, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       console.log("incorrect Username");
//       return done(null, false, { message: "Incorrect username." });
//     }
//     if (!validPassword(password, user.hash, user.salt)) {
//       console.log("incorrect password");
//       return done(null, false, { message: "Incorrect password." });
//     }
//     if (validPassword(password, user.hash, user.salt)) {
//       console.log("Account credentials matched");
//       return done(null, user);
//     }

//     console.log("unexpected error");
//   });
// };

// const strategy = new LocalStrategy(verifyCallback);

// passport.use(strategy);

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
