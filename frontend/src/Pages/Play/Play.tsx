import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import AnswerCard from "../../Components/CardComponents/AnswerCard";
import { PlayAnswer, PlayQuestion, PlayQuiz } from "../../logic/interfaces";
import { getAnswers, getInfo, startQuiz } from "../../logic/solvingQuiz";

const Play = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<PlayQuiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 0,
    number: 0,
  });
  const [answers, setAnswers] = useState<PlayAnswer[]>([]);

  const getUserAnswers = useCallback(async () => {
    if (!id) return;
    const data = await getAnswers(+id);
    setAnswers(data);
  }, [id]);

  const handleSubmitAnswer = (id: number) => {
    //TODO
    //last question
    if (currentQuestion.number === quiz?.questions.length) {
      return;
    }
    const newAnswers = [...answers];
    const foundIndex = newAnswers.findIndex(
      (obj) => obj.question_id === currentQuestion.id,
    );

    if (foundIndex !== -1) {
      newAnswers[foundIndex].answer_id = id;
    } else {
      newAnswers.push({ answer_id: id, question_id: currentQuestion.id });
    }
    setAnswers(newAnswers);
    setCurrentQuestion({
      id: quiz?.questions[currentQuestion.number].id || 0,
      number: currentQuestion.number + 1,
    });
  };

  useEffect(() => {
    if (!id) return;
    const handleStartQuiz = async () => {
      await startQuiz(+id);
      const response = await getInfo(+id);
      setQuiz(response);
      setCurrentQuestion({
        id: response.questions[0].id,
        number: 1,
      });
      console.log(response);
    };
    handleStartQuiz();
    getUserAnswers();
  }, [id, getUserAnswers]);

  return (
    <>
      {quiz && (
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Quiz {id}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {quiz.questions.map((question: PlayQuestion, i) => (
              <Button
                variant="contained"
                color={
                  question.id === currentQuestion.id ? "primary" : "secondary"
                }
                sx={{ mr: 2 }}
                key={question.id}
                onClick={() => {
                  setCurrentQuestion({
                    id: question.id,
                    number: i + 1,
                  });
                }}
              >
                {i + 1}
              </Button>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {currentQuestion.number}.{" "}
              {
                quiz.questions.find(
                  (question) => question.id === currentQuestion.id,
                )?.text
              }
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {quiz.questions
              .find((question) => question.id === currentQuestion.id)
              ?.answers.map((answer) => (
                <AnswerCard
                  answer={answer}
                  quizId={quiz.id}
                  handleSubmitAnswer={handleSubmitAnswer}
                  isPreviouslySelected={answers.some(
                    (a) => a.answer_id === answer.id,
                  )}
                />
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Play;
