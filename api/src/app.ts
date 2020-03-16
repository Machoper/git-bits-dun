import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { TaskRoutes } from "./routes/task-routes";

dotenv.config();

class App {
    
    public app: Application;
    public taskRoutes: TaskRoutes = new TaskRoutes();

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.taskRoutes.setRoutes(this.app);
    }

    private setConfig(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));  
        this.app.use(cors());
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost:27017/GitBitsDun', 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
                // ssl: false,
                // sslValidate: false
                // checkServerIdentity: false
                // replicaSet: 'replset'
            }
            // (err) => { 
            //     console.log('connected to MongoDB!');
            //     console.log(err);
            // }
        )
        .then(() => console.log('DB Connected!'))
        .catch(err => console.log(err.reason));
    }
}

export default new App().app;