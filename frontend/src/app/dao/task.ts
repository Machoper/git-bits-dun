export interface Task {
    _id: string;
    title: string;
    description?: string;
    creationDate: Date;
    priority: number;
    completed: boolean;
    hasTimer?: boolean;
}
