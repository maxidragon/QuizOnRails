import { useState, useCallback, useEffect } from "react";
import { Question } from "../../logic/interfaces";
import { getQuestionsForQuiz } from "../../logic/questions";
import QuestionRow from "./QuestionRow";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateQuestionModal from "../ModalComponents/Create/CreateQuestionModal";

const Questions = (props: { quizId: number }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const fetchQuestions = useCallback(async () => {
    const response = await getQuestionsForQuiz(props.quizId);
    setQuestions(response);
  }, [props.quizId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleCloseCreateModal = async () => {
    setOpenCreateModal(false);
    await fetchQuestions();
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid item>
          <Typography variant="h5">Questions</Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="add question"
            size="small"
            onClick={() => setOpenCreateModal(true)}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          maxWidth: "80%",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Answers</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions &&
              questions.map((question: Question, i: number) => (
                <QuestionRow
                  key={question.id}
                  row={question}
                  handleCloseCreateModal={handleCloseCreateModal}
                  questionNumber={i + 1}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateQuestionModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        quizId={props.quizId}
      />
    </>
  );
};

export default Questions;
