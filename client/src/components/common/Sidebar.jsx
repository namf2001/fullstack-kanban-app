import {
	Box,
	Drawer,
	Icon,
	IconButton,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.value);
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<Drawer
			variant="permanent"
			container={window.document.body}
			open={true}
			sx={{
				width: "240px",
				height: "100vh",
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: "240px",
					boxSizing: "border-box",
				},
			}}>
			<List
				disablePadding
				sx={{
					width: "100%",
					height: "100%",
					backgroundColor: "secondary.main",
				}}>
				<ListItem>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<Typography variant="h6" sx={{ ml: 1 }}>
							<b>{user?.username}</b>
						</Typography>
						<IconButton onClick={handleLogout}>
							<LogoutOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: "10px" }} />
				<ListItem>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<Typography variant="h6" sx={{ ml: 1 }}>
							<b>Favorites</b>
						</Typography>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: "10px" }} />
				<ListItem>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<Typography variant="h6" sx={{ ml: 1 }}>
							<b>Private</b>
						</Typography>
						<IconButton onClick={handleLogout}>
							<AddBoxOutlinedIcon fontSize="small"/>
						</IconButton>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: "10px" }} />
			</List>
		</Drawer>
	);
};

export default Sidebar;
