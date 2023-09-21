import {
  Box,
  Typography,
  Modal,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { formStyle, style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../ActionsButtons";
import EditIcon from "@mui/icons-material/Edit";
import { editAnswer } from "../../../logic/answers";
import { Answer } from "../../../logic/interfaces";

const EditAnswerModal = (props: {
  open: boolean;
  handleClose: () => void;
  answer: Answer;
  quizId: number;
  updateAnswer: (answer: Answer) => void;
}) => {
  const handleEdit = async () => {
    const response = await editAnswer(props.answer, props.quizId);
    if (response.status === "updated") {
      enqueueSnackbar("Answer updated!", { variant: "success" });
      props.handleClose();
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Grid container sx={formStyle}>
          <Grid item>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit answer
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Text"}
              fullWidth
              value={props.answer.text}
              onChange={(event) =>
                props.updateAnswer({
                  ...props.answer,
                  text: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.answer.is_correct}
                  onChange={(event) =>
                    props.updateAnswer({
                      ...props.answer,
                      is_correct: event.target.checked,
                    })
                  }
                />
              }
              label="Correct"
            />
          </Grid>
        </Grid>
        <ActionsButtons
          cancel={props.handleClose}
          submit={handleEdit}
          submitText={"Edit"}
          submitIcon={<EditIcon />}
        />
      </Box>
    </Modal>
  );
};

export default EditAnswerModal;
