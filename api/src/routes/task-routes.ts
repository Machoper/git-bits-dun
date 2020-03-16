import { Application, Router } from 'express';
import { TaskController } from "../controllers/task-controller";
import dotenv from 'dotenv';

dotenv.config();
const prefix = process.env.API_PREFIX || '/api/v1';

export class TaskRoutes {

    public taskController: TaskController = new TaskController();

    public setRoutes(app: Application): void {
        let router = Router();
        router.route('/tasks').get(this.taskController.getAllTasks);
        router.route('/task').post(this.taskController.addTask);
        router.route('/task/:taskId')
            .get(this.taskController.getTask)
            .put(this.taskController.updateTask)
            .delete(this.taskController.deleteTask);
        app.use(prefix, router);
    }
}