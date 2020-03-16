import { Task } from '../models/task-model';
import { Request, Response } from 'express';

const success = (data?: any): any => { 
    return { data };
};

export class TaskController{

    constructor() {}

    public getAllTasks (req: Request, res: Response) {           
        Task.find({}, (err, tasks) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(success(tasks));
        });
    }

    public addTask(req: Request, res: Response) {   
        let payload = { ... req.body };
        payload.creationDate = new Date();             
        let newTask = new Task(payload);
        newTask.save((err, task) => {
            if(err){
                res.status(500).send(err);
            }    
            res.json(success(task));
        });
    }

    public getTask (req: Request, res: Response) {           
        Task.findById(req.params.taskId, (err, task) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(success(task));
        });
    }

    public updateTask (req: Request, res: Response) {           
        Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, task) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(success(task));
        });
    }

    public deleteTask (req: Request, res: Response) {           
        Task.deleteOne({ _id: req.params.taskId }, (err) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(success());
        });
    }
}