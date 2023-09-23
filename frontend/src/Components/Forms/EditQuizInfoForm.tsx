import { Box, Button, TextField, Typography } from "@mui/material";
import { Answer, Question, Quiz } from "../../logic/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteQuiz, updateQuiz } from "../../logic/quizzes";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getQuestionsForQuiz } from "../../logic/questions";

const EditQuizInfoForm = (props: {
  quiz: Quiz;
  updateQuiz: (quiz: Quiz) => void;
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [canBePublished, setCanBePublished] = useState<boolean>(false);
  const fetchQuestions = useCallback(async () => {
    const response = await getQuestionsForQuiz(props.quiz.id);
    setQuestions(response);
  }, [props.quiz.id]);

  const confirm = useConfirm();
  const navigate = useNavigate();
  const handleEdit = async () => {
    const response = await updateQuiz(props.quiz);
    if (response.status === "updated") {
      enqueueSnackbar("Quiz updated!", { variant: "success" });
    }
    if (response.error) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
      response.error.forEach((error: string) => {
        enqueueSnackbar(error, { variant: "error" });
      });
    }
  };

  const handleDelete = () => {
    confirm({
      description: "Are you sure you want to delete this quiz?",
    })
      .then(async () => {
        const response = await deleteQuiz(props.quiz.id);
        if (response.status === "deleted") {
          enqueueSnackbar("Quiz deleted!", { variant: "success" });
          navigate("/");
        }
        if (response.error) {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
          enqueueSnackbar(response.error, { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Quiz not deleted!", { variant: "info" });
      });
  };

  const handlePublish = async () => {
    confirm({
      description:
        "Are you sure you want to publish this quiz? Once published, it cannot be edited.",
    })
      .then(async () => {
        props.updateQuiz({ ...props.quiz, is_public: true });
        const response = await updateQuiz({ ...props.quiz, is_public: true });
        if (response.status === "updated") {
          enqueueSnackbar("Quiz published!", { variant: "success" });
        }
        if (response.error) {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Quiz not published!", { variant: "info" });
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    const canBePublishedCheck =
      questions.length > 0 &&
      props.quiz.name &&
      props.quiz.description &&
      questions.every((question: Question) => question.answers.length > 0) &&
      questions.every((question: Question) =>
        question.answers.some((answer: Answer) => answer.is_correct),
      );
    setCanBePublished(canBePublishedCheck || false);
  }, [questions, props.quiz.name, props.quiz.description]);
  return (
    <>
      {!canBePublished && (
        <Typography variant="subtitle1" color="error">
          This quiz cannot be published yet. Please be sure to fill in all the
          fields and add at least one question with at least one answer marked
          as correct.
        </Typography>
      )}
      {props.quiz && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            alignItems: "left",
            width: "50%",
          }}
        >
          <TextField
            placeholder={"Title"}
            fullWidth
            value={props.quiz.name}
            onChange={(event) =>
              props.updateQuiz({ ...props.quiz, name: event.target.value })
            }
          />
          <TextField
            multiline
            rows={5}
            placeholder={"Write your note here..."}
            fullWidth
            value={props.quiz.description}
            onChange={(event) =>
              props.updateQuiz({
                ...props.quiz,
                description: event.target.value,
              })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              disabled={!canBePublished || props.quiz.is_public}
              onClick={handlePublish}
            >
              Publish
            </Button>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditQuizInfoForm;
