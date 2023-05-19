import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';

const label = { inputProps: { 'aria-label': 'Complete' } };

function NewTask(props) {
    //Initialize task to empty task
    const [task, setTask] = useState({ title: "", description: "", dueDate: null, completed: false });
    const [error, setError] = useState(null);

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
        <div>
            <TextField
                required
                id="title-textbox"
                label="Title"
                defaultValue=""
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <TextField
                id="desc-textbox"
                label="Description"
                defaultValue=""
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={task?.dueDate ?? dayjs()}
                    onChange={(newValue, context) => {
                        if (context.validationError == null) {
                            setTask({ ...task, dueDate: newValue });
                        }
                    }} />
            </LocalizationProvider>
            <Checkbox {...label}
                onChange={(e) => setTask({ ...task, completed: e.target.checked })} />
            <Button onClick={handleNewTask}>
                Add Task
            </Button>
            <Button onClick={props.handleClose}>
                Cancel
            </Button>
            <Typography id="error" style={{ color: 'red' }}>
                {error}
            </Typography>
        </div>
    );
}

export default NewTask;