import { Box, Typography, Modal, TextField, Grid } from "@mui/material";
import { formStyle, style } from "../modalStyles";
import { enqueueSnackbar } from "notistack";
import ActionsButtons from "../ActionsButtons";
import EditIcon from "@mui/icons-material/Edit";
import { Question } from "../../../logic/interfaces";
import { editQuestion } from "../../../logic/questions";

const EditQuestionModal = (props: {
  open: boolean;
  handleClose: () => void;
  question: Question;
  updateQuestion: (question: Question) => void;
}) => {
  const handleEdit = async () => {
    const response = await editQuestion(props.question);
    if (response.status === "updated") {
      enqueueSnackbar("Question updated!", { variant: "success" });
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
              Edit question
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder={"Text"}
              fullWidth
              value={props.question.text}
              onChange={(event) =>
                props.updateQuestion({
                  ...props.question,
                  text: event.target.value,
                })
              }
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

export default EditQuestionModal;
