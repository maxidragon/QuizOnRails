import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Question, Quiz } from "../../logic/interfaces";
import { getQuiz } from "../../logic/quizzes";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import EditQuizInfoForm from "../../Components/Forms/EditQuizInfoForm";

const ManageQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>();

  const fetchQuiz = useCallback(async () => {
    if (!id) return null;
    const response = await getQuiz(+id);
    console.log(response);
    if (!response.can_manage) {
      enqueueSnackbar("You can't manage this quiz!", { variant: "error" });
      navigate(`/error`);
    }
    setQuiz(response.quiz);
    setQuestions(response.questions);
  }, [id, navigate]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  questions?.forEach((question) => {
    console.log(question);
  });

  const updateQuiz = (quiz: Quiz) => {
    setQuiz(quiz);
  };

  return (
    <>
      {quiz ? (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            ml: 10,
            mt: 2,
          }}
        >
          <Grid item>
            <Typography variant="h5">Manage quiz</Typography>
          </Grid>
          <Grid item>
            <EditQuizInfoForm quiz={quiz} updateQuiz={updateQuiz} />
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default ManageQuiz;
