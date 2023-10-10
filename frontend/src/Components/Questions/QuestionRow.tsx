import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Grid,
} from "@mui/material";
import { Question } from "../../logic/interfaces";
import { deleteQuestion } from "../../logic/questions";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import CreateAnswerModal from "../ModalComponents/Create/CreateAnswerModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import EditQuestionModal from "../ModalComponents/Edit/EditQuestionModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AnswerRow from "./AnswerRow";

const QuestionRow = (props: {
  row: Question;
  handleCreateAnswer: () => void;
  questionNumber: number;
  isPublic: boolean;
}) => {
  const confirm = useConfirm();
  const { row } = props;
  const [hide, setHide] = useState<boolean>(false);
  const [editedQuestion, setEditedQuestion] = useState<Question>(row);
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditQuestionModal, setOpenEditQuestionModal] =
    useState<boolean>(false);

  const handleCloseCreateModal = async () => {
    setOpenCreateModal(false);
    props.handleCreateAnswer();
  };

  const handleDelete = async () => {
    if (row === null) return;
    confirm({
      description:
        "Are you sure you want to delete this question with all answers?",
    })
      .then(async () => {
        const response = await deleteQuestion(row.quiz_id, row.id);
        if (response.status === "deleted") {
          enqueueSnackbar("Question deleted!", { variant: "success" });
          setHide(true);
        } else {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Question not deleted!", { variant: "info" });
      });
  };

  const updateQuestion = (question: Question) => {
    setEditedQuestion(question);
  };

  return (
    <>
      {!hide && (
        <>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell
              sx={{
                width: "10px",
              }}
            >
              {props.questionNumber}
            </TableCell>
            <TableCell
              sx={{
                width: "10px",
              }}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {editedQuestion.text}
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => setOpenEditQuestionModal(true)}
                disabled={props.isPublic}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} disabled={props.isPublic}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid item>
                      <Typography variant="h6">Answers</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="add question"
                        size="small"
                        onClick={() => setOpenCreateModal(true)}
                        disabled={props.isPublic}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {!editedQuestion.answers.some(
                    (answer) => answer.is_correct,
                  ) && (
                    <Typography variant="subtitle1" color="error">
                      This question has no correct answer!
                    </Typography>
                  )}
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Text</TableCell>
                        <TableCell>Correct</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.answers.map(
                        (answerRow, answerNumber: number) => (
                          <AnswerRow
                            key={answerRow.id}
                            answerRow={answerRow}
                            quizId={row.quiz_id}
                            answerNumber={answerNumber}
                            updateQuestion={updateQuestion}
                            question={editedQuestion}
                            isPublic={props.isPublic}
                          />
                        ),
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          <CreateAnswerModal
            open={openCreateModal}
            handleClose={handleCloseCreateModal}
            quizId={row.quiz_id}
            questionId={row.id}
          />
          <EditQuestionModal
            open={openEditQuestionModal}
            handleClose={() => setOpenEditQuestionModal(false)}
            question={editedQuestion}
            updateQuestion={updateQuestion}
          />
        </>
      )}
    </>
  );
};

export default QuestionRow;
