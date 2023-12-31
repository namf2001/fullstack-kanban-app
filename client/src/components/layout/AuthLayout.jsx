import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtlis";
import Loading from "../common/Loading";
import { Box, Container } from "@mui/material";
import logoDark from "../../assets/images/logo-dark.png";

const AuthLayout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuth = await authUtils.isAuthenticated();
			if (isAuth) {
				navigate("/");
			}
			setLoading(false);
		};
		checkAuth();
	}, [navigate]);
	
	return loading ? (
		<Loading fullHeight />
	) : (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<img
					src={logoDark}
					style={{
						width: "100px",
					}}
					alt="logo"
				/>
				<Outlet />
			</Box>
		</Container>
	);
};

export default AuthLayout;
