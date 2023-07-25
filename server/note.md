const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const tokenDecode = (req, res, next) => {
	const baererHeader = req.headers["authorization"];
	if (typeof baererHeader !== "undefined") {
		const bearer = baererHeader.split(" ")[1];
		try {
			const tokenDecode = jsonwebtoken.verify(
				bearer,
				process.env.TOKEN_SECRET
			);
			return tokenDecode;
		} catch {
			return false;
		}
	} else {
		return false;
	}
};

const verifyToken = async (req, res, next) => {
	const tokenDecode = tokenDecode(req);
	if (tokenDecode) {
		const user = await User.findById(tokenDecode.id);
		if (user) {
			req.user = user;
			next();
		}
	} else {
		res.status(401).json({
			errors: [
				{
					param: "token",
					msg: "Unauthorized!",
				},
			],
		});
	}
};

module.exports = {
	tokenDecode,
	verifyToken,
};
