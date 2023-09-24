import { useParams } from "react-router-dom";

const QuizResult = () => {
  const { quizAttemptId } = useParams<{ quizAttemptId: string }>();
  return <>Quiz result for attempt {quizAttemptId}</>;
};

export default QuizResult;
