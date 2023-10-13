// src/controllers/taskController.ts

import { Request, Response } from 'express';
import { Task } from '../models/Task';

let tasks: Task[] = [];
let idCounter = 1;

export const getTasks = (req: Request, res: Response) => {
    const status = req.query.status as 'pending' | 'completed';
    if (status) {
        return res.json(tasks.filter(task => task.status === status));
    }
    return res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
    const task: Task = {
        id: idCounter++,
        ...req.body
    };
    tasks.push(task);
    res.status(201).json(task);
};

export const getTaskById = (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === Number(req.params.taskId));
    if (task) {
        return res.json(task);
    }
    return res.status(404).send({ message: 'Task not found' });
};

export const updateTask = (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.taskId));
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        return res.json(tasks[index]);
    }
    return res.status(404).send({ message: 'Task not found' });
};

export const deleteTask = (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.taskId));
    if (index !== -1) {
        tasks.splice(index, 1);
        return res.status(204).send();
    }
    return res.status(404).send({ message: 'Task not found' });
};
