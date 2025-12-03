export type TaskStatus = 'Pending' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export interface Task {
    taskId : number;
    title : string;
    description : string;
    status : TaskStatus;
    priority : TaskPriority;
    createAt : string;
    updateAt : string;
}
