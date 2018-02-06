const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function getAllUsers(req, res, next) {
  db
    .any("select * from users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL users"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateUserClicks(req, res, next) {
  db
    .none(
      "update users set clicks = ${clicks} where id = ${id}",
      {
        clicks: req.body.clicks,
        username: req.user.username
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        message: "Changed user clicks"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getUserClicks(req, res, next) {
  console.log("get clicks");
  db
    .one("select clicks from users where id = ${id}", req.id)
    .then(function(data) {
      console.log("got clicks: ", data);
      res.status(200).json({
        status: "success",
        clicks: data.clicks,
        message: "Fetched user clicks"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  db
    .any("select * from users where username = ${username}", req.user)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched one user"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateSingleUser(req, res, next) {
  db
    .none(
      "update users set username = ${newName} where username = ${username}",
      req.body
    )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        message: "Changed one user"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function loginUser(req, res, next) {
  
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).send("error while trying to log in");
    } else if (!user) {
      res.status(401).send("invalid username/password");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.status(200).send(user);
        }
      });
    }
  })(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function registerUser(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        error: err
      });
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  registerUser: registerUser,
  updateSingleUser: updateSingleUser,
  loginUser: loginUser,
  logoutuser: logoutUser,
  getUserClicks: getUserClicks,
  updateUserClicks: updateUserClicks
};
