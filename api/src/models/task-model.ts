import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String
    },
    creationDate: {
        type: Date            
    },
    priority: {
        type: Number,
        required: true         
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

export const Task = model('Task', TaskSchema, 'Task');