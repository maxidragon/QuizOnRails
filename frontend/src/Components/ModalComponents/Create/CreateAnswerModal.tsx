import { useRef } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formStyle, style } from "../modalStyles";
import ActionsButtons from "../ActionsButtons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createAnswer } from "../../../logic/answers";

const CreateAnswerModal = (props: {
  open: boolean;
  handleClose: () => void;
  quizId: number;
  questionId: number;
}) => {
  const textRef: React.MutableRefObject<HTMLInputElement | null | undefined> =
    useRef();
  //eslint-disable-next-line
  const isCorrectRef: any = useRef();
  const handleCreate = async () => {
    if (!textRef.current || !isCorrectRef.current) return;
    const text = textRef.current.value;
    const response = await createAnswer(
      props.quizId,
      props.questionId,
      text,
      isCorrectRef.current.checked,
    );
    if (response.status === "created") {
      enqueueSnackbar("Answer added!", { variant: "success" });
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
              Add answer
            </Typography>
          </Grid>
          <Grid item>
            <TextField placeholder={"Text"} fullWidth inputRef={textRef} />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox inputRef={isCorrectRef} />}
              label="Correct"
            />
          </Grid>
        </Grid>
        <ActionsButtons
          cancel={props.handleClose}
          submit={handleCreate}
          submitText={"Add"}
          submitIcon={<AddCircleIcon />}
        />
      </Box>
    </Modal>
  );
};

export default CreateAnswerModal;
