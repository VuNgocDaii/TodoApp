// export type TaskStatus = 'Pending' | 'Done';
// export type TaskPriority = 'High' | 'Medium' | 'Low';
export class Task {
    taskId : number;
    title : string;
    description? : string;
    status? : string;
    priority? : string;
    createAt? : Date;
    updateAt? : Date;
    isDeleted? : boolean;
    constructor(newTaskId: number, newTitle: string, newDescription:string, newStatus: string, newPriority: string) {
       this.taskId = newTaskId;
       this.title = newTitle;
       this.description = newDescription;
       this.status = newStatus;
       this.priority = newPriority;
       this.createAt = new Date();
       this.updateAt = new Date();
       this.isDeleted = false;
    }
}
