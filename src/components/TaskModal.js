import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

function TaskModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props?.task?.title ?? ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props?.task?.description ?? ""}
          </Typography>
          <Typography id="modal-modal-duedate" sx={{ mt: 2 }}>
            {props?.task?.dueDate ?? ""}
          </Typography>
          <Typography id="modal-modal-completed" sx={{ mt: 2 }}>
            {props?.task?.completed ?? ""}
          </Typography>
          <Button onClick={props.handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TaskModal;