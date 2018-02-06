let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");

router.get("/", loginRequired, db.getSingleUser );
router.get("/new", db.getAllUsers)
router.post("/new", db.registerUser);
router.get("/clicks", loginRequired, db.getUserClicks);
router.patch("/clicks", loginRequired, db.updateUserClicks);
router.post("/login", db.loginUser);
router.get("/logout", loginRequired, db.logoutUser);

module.exports = router;
