import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Signup = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [usernameErrText, setUsernameErrText] = useState("");
	const [passwordErrText, setPasswordErrText] = useState("");
	const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

	const handlSubmit = async (e) => {
		e.preventDefault();
		setUsernameErrText("");
		setPasswordErrText("");
		setConfirmPasswordErrText("");

		const data = new FormData(e.currentTarget);
		const username = data.get("username");
		const password = data.get("password");
		const confirmPassword = data.get("confirmPassword");

		let err = false;
		if (username.length === "") {
			setUsernameErrText("Username is required");
			err = true;
		}
		if (password.length === "") {
			setPasswordErrText("Password is required");
			err = true;
		}
		if (confirmPassword.length === "") {
			setConfirmPasswordErrText("Confirm Password is required");
			err = true;
		}
		if (err) {
			return;
		}
		setLoading(true);

		try {
			const res = await authApi.signup({
				username,
				password,
				confirmPassword,
			});
			setLoading(false);
			localStorage.setItem("token", res.token);
			navigate("/");
		} catch (error) {
			console.log(error);
			const errors = error.data.errors;
			errors.forEach((error) => {
				if (error.param === "username") {
					setUsernameErrText(error.msg);
				}
				if (error.param === "password") {
					setPasswordErrText(error.msg);
				}
				if (error.param === "confirmPassword") {
					setConfirmPasswordErrText(error.msg);
				}
			});
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
				<TextField
					margin="normal"
					required
					fullWidth
					id="confirmPassword"
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					disabled={loading}
					error={confirmPasswordErrText !== ""}
					helperText={confirmPasswordErrText}
				/>
				<LoadingButton
					sx={{ mt: 3, mb: 2 }}
					type="submit"
					fullWidth
					variant="outlined"
					loading={loading}>
					Signup
				</LoadingButton>
			</Box>
			<Button component={Link} to="/login" sx={{ textTransform: "none" }}>
				Already have an account? Login
			</Button>
		</>
	);
};

export default Signup;
