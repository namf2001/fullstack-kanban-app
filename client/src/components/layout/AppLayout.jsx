import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtlis";
import Loading from "../common/Loading";
import { Box } from "@mui/material";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const user = await authUtils.isAuthenticated();
      console.log(user);
			if (!user) {
				navigate("/login");
			} else {
				//save user data to context
        dispatch(setUser(user))
				setLoading(false);
			}
		};
		checkAuth();
	}, [navigate, dispatch]);

	return loading ? (
		<Loading fullHeight />
	) : (
		<Box sx={{ display: "flex" }}>
			<Sidebar />
			<Box
				sx={{
					flexGrow: 1,
					p: 3,
					width: "max-content",
				}}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppLayout;
