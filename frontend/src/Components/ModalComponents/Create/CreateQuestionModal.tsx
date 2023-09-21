import { useRef } from "react";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formStyle, style } from "../modalStyles";
import ActionsButtons from "../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createQuestion } from "../../../logic/questions";

const CreateQuestionModal = (props: {
  open: boolean;
  handleClose: () => void;
  quizId: number;
}) => {
  const textRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
    useRef();

  const handleCreate = async () => {
    if (!textRef.current) return;
    const text = textRef.current.value;
    const response = await createQuestion(props.quizId, text);
    if (response.status === "created") {
      enqueueSnackbar("Question created!", { variant: "success" });
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
              Add question
            </Typography>
          </Grid>
          <Grid item>
            <TextField placeholder={"Text"} fullWidth inputRef={textRef} />
          </Grid>
        </Grid>
        <ActionsButtons
          cancel={props.handleClose}
          submit={handleCreate}
          submitText={"Create"}
          submitIcon={<AddCircleIcon />}
        />
      </Box>
    </Modal>
  );
};

export default CreateQuestionModal;
