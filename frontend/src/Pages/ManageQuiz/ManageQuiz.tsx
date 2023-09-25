import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz, QuizStats } from "../../logic/interfaces";
import { getQuiz, getQuizStats } from "../../logic/quizzes";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import EditQuizInfoForm from "../../Components/Forms/EditQuizInfoForm";
import Questions from "../../Components/Questions/Questions";

const ManageQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [stats, setStats] = useState<QuizStats | null>(null);

  const fetchQuiz = useCallback(async () => {
    if (!id) return null;
    const response = await getQuiz(+id);
    if (!response.can_manage) {
      enqueueSnackbar("You can't manage this quiz!", { variant: "error" });
      navigate(`/error`);
    }
    const statsResponse = await getQuizStats(+id);
    setStats(statsResponse);
    setQuiz(response.quiz);
  }, [id, navigate]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

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
            gap: 2,
            ml: 10,
            mt: 2,
          }}
        >
          <Grid item>
            <Typography variant="h5">Manage quiz</Typography>
            <Typography variant="body1" color="gray">
              {quiz.is_public
                ? "After publishing quiz you can't edit questions and answers anymore. You can only edit quiz info."
                : "Here you can edit quiz info and questions."}
            </Typography>
          </Grid>
          <Grid item>
            <EditQuizInfoForm quiz={quiz} updateQuiz={updateQuiz} />
          </Grid>
          <Grid item>
            <Questions quizId={quiz.id} isPublic={quiz.is_public} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Quiz stats</Typography>
            <Typography variant="body1">
              Number of solutions: {stats?.total_answers}
            </Typography>
            <Typography variant="body1">
              Average result: {stats?.average_result}%
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default ManageQuiz;
