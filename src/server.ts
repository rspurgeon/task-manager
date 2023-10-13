// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import {
    getTasks, createTask, getTaskById, updateTask, deleteTask
} from './controllers/taskController';

const app = express();

app.use(bodyParser.json());

// Define routes
app.get('/tasks', getTasks);
app.post('/tasks', createTask);
app.get('/tasks/:taskId', getTaskById);
app.put('/tasks/:taskId', updateTask);
app.delete('/tasks/:taskId', deleteTask);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
