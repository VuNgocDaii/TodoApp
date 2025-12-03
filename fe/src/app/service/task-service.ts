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
  load() : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      return JSON.parse(json) as Task[];
    } catch {
      return [];
    }
  }
  add(newTitle: string, newDescription: string, newStatus: string, newPriority: string, newCreateAt: string, newUpdateAt: string) {
    const newTaskId = this.genNewId();
    const taskList = this.load();
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
  delete(currentTaskId: number) {
    const taskList = this.load().filter(t => t.taskId !== currentTaskId);
    localStorage.setItem(STORAGE_TASK,JSON.stringify(taskList));
  }
  searchAndFilter(searchString?: string, statusFilter?: string,prorityFilter?: string): Task[] {
        let taskList = this.load();
        if (searchString) {
            const lowerCaseSearchTerm = searchString.toLowerCase().trim();
            taskList = taskList.filter(task => task.title.toLowerCase().includes(lowerCaseSearchTerm));
        }
          if (statusFilter !== undefined && statusFilter !== null && statusFilter!='') 
              taskList = taskList.filter(task => task.status === statusFilter);
        

        if (prorityFilter !== undefined && prorityFilter !== null && prorityFilter!='') 
            taskList = taskList.filter(task => task.priority === prorityFilter);
        
        return taskList;
    }
    update(updatedTask: Task): void {
        let taskList = this.load();
        const index = taskList.findIndex(t => t.taskId === updatedTask.taskId);

        if (index>-1) {
            updatedTask.updateAt = new Date().toISOString();
            taskList[index] = updatedTask;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        } 
    }

    markDone(currentTaskId: number): void {
        let taskList = this.load();
        const task = taskList.find(t => t.taskId === currentTaskId);

        if (task) {
            task.status = 'Done';
            task.updateAt = new Date().toISOString();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        }
    }

    unmarkDone(currentTaskId: number): void {
        let taskList = this.load();
        const task = taskList.find(t => t.taskId === currentTaskId);

        if (task) {
            task.status = 'Pending';
            task.updateAt = new Date().toISOString();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        } 
    }
}
