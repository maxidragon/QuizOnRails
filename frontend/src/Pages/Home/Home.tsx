import React, { useEffect, useState } from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { Quiz } from "../../logic/interfaces";
import { getQuizzes } from "../../logic/quizzes";
import QuizCard from "../../Components/CardComponents/QuizCard";

const Home = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchQuizzes = async (searchParam?: string) => {
    const response = await getQuizzes(searchParam);
    setQuizzes(response);
    setLoading(false);
  };
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    fetchQuizzes(event.target.value);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

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
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 10,
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {quizzes.map((quiz: Quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
