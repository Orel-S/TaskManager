import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Row } from '../styles/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function TaskModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title: {props?.task?.title ?? ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {props?.task?.description ?? ""}
          </Typography>
          <Typography id="modal-modal-duedate" sx={{ mt: 2 }}>
            Due Date: {props?.task?.dueDate ?? ""}
          </Typography>
          <Typography id="modal-modal-completed" sx={{ mt: 2 }}>
            Completed: {props?.task?.completed ?? ""}
          </Typography>
          <Row>
            <Button variant="outlined" style={{ margin: 10 }} onClick={props.handleClose}>Close</Button>
            <Button variant="outlined" style={{ margin: 10 }} onClick={props.handleComplete}>{props?.task?.completed === "Yes" ? "Mark Incomplete" : "Mark Complete"} </Button>
          </Row>
        </Box>
      </Modal>
    </div>
  );
}

export default TaskModal;