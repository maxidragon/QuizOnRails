import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResults } from "../../logic/solvingQuiz";
import { QuizResult as QuizResultType } from "../../logic/interfaces";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";

const QuizResult = () => {
  const { quizAttemptId } = useParams<{ quizAttemptId: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResultType | null>(null);
  useEffect(() => {
    if (!quizAttemptId) return;
    const fetchData = async () => {
      const data = await getResults(+quizAttemptId);
      console.log(data);
      setResults(data);
    };
    fetchData();
  }, [quizAttemptId]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {results ? (
          <>
            <Grid item>
              <Typography variant="h4">{results.quiz.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Your result: {results.score}%
              </Typography>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back to home
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default QuizResult;
