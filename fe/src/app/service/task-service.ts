import { Injectable } from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../model/task.model';
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
  add(newTitle: string, newDescription: string, newStatus: TaskStatus, newPriority: TaskPriority, newCreateAt: string, newUpdateAt: string) {
    const newTaskId = this.genNewId();
    const taskList = this.load();
    const newTask : Task = {
        taskId : newTaskId,
        title : newTitle,
        description : newDescription,
        status : newStatus,
        priority : newPriority,
        createAt : new Date().toISOString(),
        updateAt : new Date().toISOString()
    };
    taskList.push(newTask);
    localStorage.setItem(STORAGE_TASK,JSON.stringify(taskList));
  }
  delete(currentTaskId: number) {
    const taskList = this.load().filter(t => t.taskId !== currentTaskId);
    localStorage.setItem(STORAGE_TASK,JSON.stringify(taskList));
  }
}
