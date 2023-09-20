import { useNavigate } from "react-router-dom";
import { Quiz } from "../../logic/interfaces";
import { Card, CardContent, Typography } from "@mui/material";

const QuizCard = (props: { quiz: Quiz }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 300,
        mr: 5,
        mt: 2,
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/quiz/${props.quiz.id}`);
      }}
    >
      <CardContent sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.quiz.name}
        </Typography>
        <Typography variant="body2">{props.quiz.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
