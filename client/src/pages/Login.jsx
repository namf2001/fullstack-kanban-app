import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [usernameErrText, setUsernameErrText] = useState("");
	const [passwordErrText, setPasswordErrText] = useState("");

	const handlSubmit = async (e) => {
		e.preventDefault();
		setUsernameErrText("");
		setPasswordErrText("");

		const data = new FormData(e.currentTarget);
		const username = data.get("username");
		const password = data.get("password");

		let err = false;

		if (!username.length) {
			setUsernameErrText("Username is required");
			err = true;
		}
		if (!password.length) {
			setPasswordErrText("Password is required");
			err = true;
		}
		if (err) {
			return;
		}
		setLoading(true);

		try {
			const res = await authApi.login({
				username,
				password,
			});
			setLoading(false);
      console.log(res.token);
			localStorage.setItem("token", res.token);
			navigate("/");
		} catch (error) {
			console.log(error.data.errors);
			const errors = error.data.errors;
			errors.forEach((error) => {
				if (error.param === "username") {
					setUsernameErrText(error.msg);
				}
				if (error.param === "password") {
					setPasswordErrText(error.msg);
				}
			});
			setLoading(false);
		}
	};

	return (
		<>
			<Box component="form" sx={{ mt: 1 }} onSubmit={handlSubmit}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					disabled={loading}
					error={usernameErrText !== ""}
					helperText={usernameErrText}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="password"
					label="Password"
					name="password"
					type="password"
					disabled={loading}
					error={passwordErrText !== ""}
					helperText={passwordErrText}
				/>
				<LoadingButton
					sx={{ mt: 3, mb: 2 }}
					type="submit"
					fullWidth
					variant="contained"
					loading={loading}>
					Login
				</LoadingButton>
			</Box>
			<Button
				component={Link}
				to="/signup"
				sx={{ textTransform: "none" }}>
				Don&apos;t have an account? Signup
			</Button>
		</>
	);
};

export default Login;
