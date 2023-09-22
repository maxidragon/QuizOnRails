import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import CreateQuizModal from "../../Components/ModalComponents/Create/CreateQuizModal";
import PaginationFooter from "../../Components/Pagination/PaginationFooter";
import { Quiz } from "../../logic/interfaces";
import { getMyQuizzes } from "../../logic/quizzes";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
const MyQuizzes = () => {
  const [perPage, setPerPage] = useState(10);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchQuizzes = useCallback(
    async (
      searchParam?: string,
      pageParam: number = 1,
      perPageParam: number = 10,
    ) => {
      const response = await getMyQuizzes(searchParam, pageParam, perPageParam);
      setQuizzes(response.quizzes);
      setTotalPages(response.total_pages);
      setTotalItems(response.total_items);
      setLoading(false);
    },
    [],
  );
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    fetchQuizzes(event.target.value, 1, perPage);
  };

  const handlePageChange = async (pageParam: number) => {
    setPage(pageParam);
    const response = await getMyQuizzes(search, pageParam, perPage);
    setQuizzes(response);
  };

  useEffect(() => {
    setTotalPages(1);
    setTotalItems(0);
    setPerPage(10); //remove it
    setPage(1);
    fetchQuizzes("", 1);
  }, [fetchQuizzes]);

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    fetchQuizzes("", 1);
  };
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
        <Typography variant="h3">My quizzes</Typography>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setOpenCreateModal(true)}
        >
          Create a new quiz
        </Button>
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
            <Table>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
              {quizzes.map((quiz: Quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.name}</TableCell>
                  <TableCell>{quiz.description}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/quiz/${quiz.id}/manage`}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </>
        )}
        <PaginationFooter
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
        />
        <CreateQuizModal
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
        />
      </Box>
    </>
  );
};

export default MyQuizzes;
