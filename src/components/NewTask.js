import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import { TextLabel, Frame, Row } from '../styles/styles';

function NewTask(props) {
    //Initialize task to empty task
    const [task, setTask] = useState({ title: "", description: "", dueDate: dayjs(), completed: false });
    const [error, setError] = useState(null);

    //Error handling and submitting
    const handleNewTask = () => {
        setError(null);
        if (task.title === "") {
            setError("Title is a required field.");
            return;
        }
        if (!task.dueDate) {
            setError("Due Date is a required field.");
            return;
        }
        props.handleNewTask(task);
    }

    return (
        <Frame height='100%' width='100%'>
            <TextField style={{ margin: 5, width: 250 }}
                required
                id="title-textbox"
                label="Title"
                defaultValue=""
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <TextField style={{ margin: 10, width: 250 }}
                id="desc-textbox"
                label="Description"
                defaultValue=""
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} style={{ margin: 10 }}>
                <DatePicker
                    value={task?.dueDate ?? dayjs()}
                    onChange={(newValue, context) => {
                        if (context.validationError == null) {
                            setTask({ ...task, dueDate: newValue });
                        }
                    }} />
            </LocalizationProvider>
            <Row style={{ margin: 5 }}>
                <TextLabel>Completed</TextLabel>
                <Checkbox label="Completed"
                    onChange={(e) => setTask({ ...task, completed: e.target.checked })} />
            </Row>
            <Row>
                <Button variant="outlined" onClick={handleNewTask} style={{ margin: 10 }}>
                    Add Task
                </Button>
                <Button variant="outlined" onClick={props.handleClose} style={{ margin: 10 }}>
                    Cancel
                </Button>
            </Row>
            <Typography id="error" style={{ color: 'red' }}>
                {error}
            </Typography>
        </Frame>
    );
}

export default NewTask;