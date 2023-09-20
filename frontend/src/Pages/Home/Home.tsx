import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { Quiz } from "../../logic/interfaces";
import { getQuizzes } from "../../logic/quizzes";
import QuizCard from "../../Components/CardComponents/QuizCard";
import PaginationFooter from "../../Components/Pagination/PaginationFooter";

const Home = () => {
  const [perPage, setPerPage] = useState(10);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchQuizzes = useCallback(
    async (searchParam?: string, pageParam: number = 1, perPageParam: number = 10) => {
      const response = await getQuizzes(searchParam, pageParam, perPageParam);
      setQuizzes(response.quizzes);
      setTotalPages(response.total_pages);
      setTotalItems(response.total_items);
      setLoading(false);
    },
    []
  );
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    fetchQuizzes(event.target.value, 1, perPage);
  };

  const handlePageChange = async (pageParam: number) => {
    setPage(pageParam);
    const response = await getQuizzes(search, pageParam, perPage);
    setQuizzes(response);
  };

  useEffect(() => {
    setTotalPages(1);
    setTotalItems(0);
    setPerPage(10); //remove it
    setPage(1);
    fetchQuizzes("", 1);
  }, [fetchQuizzes]);

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
        <PaginationFooter
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default Home;
