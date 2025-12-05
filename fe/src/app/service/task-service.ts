import { Injectable } from '@angular/core';
import {Task} from '../model/task.model';
const STORAGE_TASK = 'key_task';
const STORAGE_ID = 'key_id';
@Injectable({
  providedIn: 'root',
})

export class TaskService {
  genNewId() : number {
    const raw = localStorage.getItem(STORAGE_ID);
    let newId = raw ? Number(raw) : 1;
    if (!Number.isFinite(newId) || newId<0) newId = 0;
    localStorage.setItem(STORAGE_ID,String(newId+1));
    return newId;
  }
  load(type: boolean) : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      let tasks = JSON.parse(json) as Task[];
      tasks = tasks.filter(task => task.isDeleted===type);
      // for (let task of tasks)
      //   console.log(task.taskId);
      return tasks;
    } catch {
      return [];
    }
  }
  loadFull() : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      let tasks = JSON.parse(json) as Task[];
      // tasks = tasks.filter(task => task.isDeleted===false);
      // for (let task of tasks)
      //   console.log(task.taskId);
      return tasks;
    } catch {
      return [];
    }
  }
  add(newTitle: string, newDescription: string, newStatus: string, newPriority: string) {
    const newTaskId = this.genNewId();
    const taskList = this.loadFull();
    const newTask : Task = {
        taskId : newTaskId,
        title : newTitle,
        description : newDescription,
        status : newStatus,
        priority : newPriority,
        createAt : new Date().toISOString(),
        updateAt : new Date().toISOString(),
        isDeleted : false
    };
    taskList.push(newTask);
    localStorage.setItem(STORAGE_TASK,JSON.stringify(taskList));
  }
  delete(currentTaskId?: number) {
        let taskList = this.loadFull();
        for (let task of taskList)
        console.log(task.taskId);
        const index = taskList.findIndex(t => t.taskId === currentTaskId);
        if (index>-1) {
            taskList[index].isDeleted = true;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
            for (let task of taskList)
           console.log(task.taskId);
        } 
    
  }
  searchAndFilter(curUrl?:string,searchString?: string, statusFilter?: string[],prorityFilter?: string[]): Task[] {
        let taskList ;
          if (curUrl==='/deletedTasksPage') taskList = this.load(true);
        else taskList = this.load(false);
        if (searchString) {
            const lowerCaseSearchTerm = searchString.toLowerCase().trim();
            taskList = taskList.filter(task => task.title.toLowerCase().includes(lowerCaseSearchTerm));
        }
          if (statusFilter !== undefined && statusFilter !== null && statusFilter.length!=0) 
              taskList = taskList.filter(task => statusFilter.includes(task.status));
        
        if (prorityFilter !== undefined && prorityFilter !== null && prorityFilter.length!=0) 
            taskList = taskList.filter(task => prorityFilter.includes(task.priority));
        
        return taskList;
    }
    update(updatedTask: Task): void {
        let taskList = this.loadFull();
        const index = taskList.findIndex(t => t.taskId === updatedTask.taskId);

        if (index>-1) {
            updatedTask.updateAt = new Date().toISOString();
            taskList[index] = updatedTask;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        } 
    }

    markDone(currentTaskId: number): void {
        let taskList = this.loadFull();
        const task = taskList.find(t => t.taskId === currentTaskId);

        if (task) {
            task.status = 'Done';
            task.updateAt = new Date().toISOString();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        }
    }

    unmarkDone(currentTaskId: number): void {
        let taskList = this.loadFull();
        const task = taskList.find(t => t.taskId === currentTaskId);

        if (task) {
            task.status = 'Pending';
            task.updateAt = new Date().toISOString();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        } 
    }
     restore(currentTaskId?: number) {
        let taskList = this.loadFull();
        for (let task of taskList)
        console.log(task.taskId);
        const index = taskList.findIndex(t => t.taskId === currentTaskId);
        if (index>-1) {
            taskList[index].isDeleted = false;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
            for (let task of taskList)
           console.log(task.taskId);
        } 
    
  }
}
