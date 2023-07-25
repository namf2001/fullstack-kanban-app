const router = require("express").Router();
const { register, login } = require("../controllers/user");
const { body } = require("express-validator");
const { validate } = require("../handlers/validation");
const { verifyToken } = require("../handlers/tokenHandler");
const User = require('../models/user')

router.post(
	"/signup",
	body("username")
		.isLength({ min: 8 })
		.withMessage("Username must be at least 8 characters long"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password confirmation does not match password");
		}
		return true;
	}),
	body("username").custom(async (value) => {
		return await User.findOne({ username: value }).then((user) => {
			if (user) {
				return Promise.reject("Username already in use");
			}
		});
	}),
	validate,
	register
);

router.post(
	"/login",
	body("username")
		.isLength({ min: 8 })
		.withMessage("Username must be at least 8 characters long"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	validate,
	login
);

router.post("/verify-token", verifyToken, (req, res) => {
	res.status(200).json(req.user);
});

module.exports = router;