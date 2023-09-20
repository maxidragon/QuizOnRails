import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Quiz } from "../../logic/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteQuiz, updateQuiz } from "../../logic/quizzes";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";

const EditQuizInfoForm = (props: {
  quiz: Quiz;
  updateQuiz: (quiz: Quiz) => void;
}) => {
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
        }).then(async () => {
            const response = await deleteQuiz(props.quiz.id);
            if (response.status === "deleted") {
                enqueueSnackbar("Quiz deleted!", { variant: "success" });
                navigate("/")
            }
            if (response.error) {
                enqueueSnackbar("Something went wrong!", { variant: "error" });
                enqueueSnackbar(response.error, { variant: "error" });
            }
        }
    ).catch(() => {
        enqueueSnackbar("Quiz not deleted!", { variant: "error" });
    });
  };

  return (
    <>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={props.quiz.is_public}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  props.updateQuiz({
                    ...props.quiz,
                    is_public: event.target.checked,
                  })
                }
              />
            }
            label="Public"
          />
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
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
