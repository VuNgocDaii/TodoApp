// export type TaskStatus = 'Pending' | 'Done';
// export type TaskPriority = 'High' | 'Medium' | 'Low';
export interface Task {
    taskId : number;
    title : string;
    description : string;
    status : string;
    priority : string;
    createAt : string;
    updateAt : string;
    isDeleted : boolean;
}
