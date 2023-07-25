const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
	try {
		const { username, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "24h" }
		);

		res.status(201).json({ user, token });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			errors: [
				{
					param: "server",
					msg: err.message || "Something went wrong!",
				},
			],
		});
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username: username.trim() }).select(
			"password username"
		);
		if (!user) {
			return res.status(401).json({
				errors: [
					{
						param: "username",
						msg: "Invalid username or password",
					},
				],
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				errors: [
					{
						param: "password",
						msg: "Wrong credentials!",
					},
				],
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.TOKEN_SECRET,
			{ expiresIn: "24h" }
		);

		res.status(200).json({ user, token });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
};

module.exports = {
	register,
	login,
};
