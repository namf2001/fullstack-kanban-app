import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import { useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(false);
	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<LoadingButton
				variant="outlined"
				color="primary"
				// onClick={createBoard}
				loading={loading}>
				Click here to create your first board
			</LoadingButton>
		</Box>
	);
};

export default Home;
