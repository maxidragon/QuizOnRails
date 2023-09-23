import { Button, Card, CardContent, Typography } from "@mui/material";
import { PublicAnswer } from "../../logic/interfaces";
import { submitAnswer } from "../../logic/solvingQuiz";
import { enqueueSnackbar } from "notistack";

const AnswerCard = (props: {
  answer: PublicAnswer;
  quizId: number;
  handleSubmitAnswer: () => void;
}) => {
  const handleSubmit = async () => {
    const response = await submitAnswer(props.quizId, props.answer.id);
    if (response.id) {
      props.handleSubmitAnswer();
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
    props.handleSubmitAnswer();
  };
  return (
    <Card
      sx={{
        width: 300,
        mr: 5,
        mt: 2,
        cursor: "pointer",
      }}
    >
      <CardContent sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {props.answer.text}
        </Typography>
        <Button
          sx={{ mt: 2, alignSelf: "center" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
