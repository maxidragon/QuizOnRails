import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Grid,
} from "@mui/material";
import { Question } from "../../logic/interfaces";
import CreateAnswerModal from "../ModalComponents/Create/CreateAnswerModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
const QuestionRow = (props: {
  row: Question;
  handleCloseCreateModal: () => void;
}) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const handleCloseCreateModal = async () => {
    setOpenCreateModal(false);
    props.handleCloseCreateModal();
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          sx={{
            width: "10px",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.text}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid item>
                  <Typography variant="h6">Answers</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="add question"
                    size="small"
                    onClick={() => setOpenCreateModal(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Text</TableCell>
                    <TableCell>Correct</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.answers.map((answerRow) => (
                    <TableRow key={answerRow.id}>
                      <TableCell component="th" scope="row">
                        {answerRow.text}
                      </TableCell>
                      <TableCell>
                        {answerRow.is_correct ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <CreateAnswerModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        quizId={row.quiz_id}
        questionId={row.id}
      />
    </>
  );
};

export default QuestionRow;
