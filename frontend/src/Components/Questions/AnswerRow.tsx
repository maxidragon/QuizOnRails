import { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Answer, Question } from "../../logic/interfaces";
import { useConfirm } from "material-ui-confirm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditAnswerModal from "../ModalComponents/Edit/EditAnswerModal";
import { enqueueSnackbar } from "notistack";
import { deleteAnswer } from "../../logic/answers";

const AnswerRow = (props: {
  answerRow: Answer;
  answerNumber: number;
  quizId: number;
  updateQuestion: (question: Question) => void;
  question: Question;
}) => {
  const confirm = useConfirm();
  const { answerRow } = props;
  const [hide, setHide] = useState<boolean>(false);
  const [editedAnswer, setEditedAnswer] = useState<Answer>(answerRow);
  const [openEditAnswerModal, setOpenEditAnswerModal] =
    useState<boolean>(false);

  const handleDelete = async () => {
    if (answerRow === null) return;
    confirm({
      description: "Are you sure you want to delete this answer?",
    })
      .then(async () => {
        const response = await deleteAnswer(
          props.quizId,
          answerRow.question_id,
          answerRow.id,
        );
        if (response.status === "deleted") {
          enqueueSnackbar("Answer deleted!", { variant: "success" });
          setHide(true);
        } else {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Answer not deleted!", { variant: "info" });
      });
  };

  const updateAnswer = (answer: Answer) => {
    setEditedAnswer(answer);
    props.updateQuestion({
      ...props.question,
      answers: props.question.answers.map((a) => {
        if (a.id === answer.id) {
          return answer;
        }
        return a;
      }),
    });
  };

  return (
    <>
      {!hide && (
        <>
          <TableRow key={answerRow.id}>
            <TableCell
              sx={{
                width: "10px",
              }}
            >
              {props.answerNumber + 1}
            </TableCell>
            <TableCell component="th" scope="row">
              {answerRow.text}
            </TableCell>
            <TableCell>{answerRow.is_correct ? "Yes" : "No"}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => {
                  setOpenEditAnswerModal(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>

          <EditAnswerModal
            open={openEditAnswerModal}
            handleClose={() => setOpenEditAnswerModal(false)}
            answer={editedAnswer}
            quizId={props.quizId}
            updateAnswer={updateAnswer}
          />
        </>
      )}
    </>
  );
};

export default AnswerRow;
