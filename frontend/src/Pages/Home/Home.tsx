import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Typography variant="h3">Welcome to QuizOnRails</Typography>
      </Box>
    </>
  );
};

export default Home;
