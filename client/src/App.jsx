import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#FBA1B7",
			},
			secondary: {
				main: "#FFD1DA",
			},
			mode: "dark",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="/board" element={<Home />} />
						<Route path="/board/:boardId" element={<Board />} />
					</Route>
					<Route path="/" element={<AuthLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
