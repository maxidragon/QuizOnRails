import { useRef } from "react";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formStyle, style } from "../modalStyles";
import ActionsButtons from "../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createQuiz } from "../../../logic/quizzes";

const CreateQuizModal = (props: { open: boolean; handleClose: () => void }) => {
  const nameRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
    useRef();
  const descriptionRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();

  const handleCreate = async () => {
    if (!nameRef.current || !descriptionRef.current) return;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const response = await createQuiz(name, description);
    if (response.status === "created") {
      enqueueSnackbar("Quiz created!", { variant: "success" });
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
              Create new quiz
            </Typography>
          </Grid>
          <Grid item>
            <TextField placeholder={"Name"} fullWidth inputRef={nameRef} />
          </Grid>
          <Grid item>
            <TextField
              multiline
              rows={15}
              placeholder={"Description"}
              fullWidth
              inputRef={descriptionRef}
            />
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

export default CreateQuizModal;
