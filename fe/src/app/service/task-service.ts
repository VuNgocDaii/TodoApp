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
  load(type: boolean,catId: number) : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      let tasks = JSON.parse(json) as Task[];
      tasks = tasks.filter(task => task.isDeleted===type && task.categoryId === catId);
      // for (let task of tasks)
      //   console.log(task.taskId);
      return tasks;
    } catch {
      return [];
    }
  }
  loadTask(currentTaskId: number,catId: number): any {
        let taskList = this.loadFullCat();
        const task = taskList.find(t => t.taskId === currentTaskId);
        return task;
      }
  loadFull(catId: number) : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      let tasks = JSON.parse(json) as Task[];
      tasks = tasks.filter(task => task.categoryId === catId);
      // tasks = tasks.filter(task => task.isDeleted===false);
      // for (let task of tasks)
      //   console.log(task.taskId);
      return tasks;
    } catch {
      return [];
    }
  }
  loadFullCatType(state: boolean) : Task[] {
    const json = localStorage.getItem(STORAGE_TASK);
    if (!json) return [];
    try {
      let tasks = JSON.parse(json) as Task[];
      tasks = tasks.filter(t=>t.isDeleted===state);
      // tasks = tasks.filter(task => task.isDeleted===false);
      // for (let task of tasks)
      //   console.log(task.taskId);
      return tasks;
    } catch {
      return [];
    }
  }
  loadFullCat() : Task[] {
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
  add(newTitle: string, newDescription: string, newStatus: string, newPriority: string,catId: number) {
    const newTaskId = this.genNewId();
    let taskList = this.loadFullCat();
    taskList = taskList.reverse();
    const newTask = new Task(
        newTaskId,
        newTitle,
        newDescription,
        newStatus,
         newPriority,
        // createAt : new Date().toISOString(),
        // updateAt : new Date().toISOString(),
        // isDeleted : false
        catId
    );
    taskList.push(newTask);
    taskList = taskList.reverse();
    localStorage.setItem(STORAGE_TASK,JSON.stringify(taskList));
  }
  delete(currentTaskId?: number, catId?: number) {
       
        let taskList = this.loadFullCat();
        for (let task of taskList)
        console.log(task.taskId);
        const index = taskList.findIndex(t => t.taskId === currentTaskId);
        if (index>-1) {
            taskList[index].updateAt = new Date();
            taskList[index].isDeleted = true;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
            for (let task of taskList)
           console.log(task.taskId+ ' ' + task.categoryId + ' ' + task.isDeleted);
        } 
    
  }
  searchAndFilter(curUrl?:string,searchString?: string, statusFilter?: string[],prorityFilter?: string[],catId?: number): Task[] {
        if (!catId) catId=0;
        let taskList ;
        if (curUrl?.includes('/deletedTasksPage')) taskList = this.load(true,catId);
        else taskList = this.load(false,catId);
        if (curUrl === '/') taskList = this.loadFullCatType(false);
        if (curUrl === '/deletedTasksPage/0') taskList = this.loadFullCatType(true);
        if (searchString) {
            const lowerCaseSearchTerm = searchString.toLowerCase().trim();
            taskList = taskList.filter(task => task.title.toLowerCase().includes(lowerCaseSearchTerm));
        }
          if (statusFilter !== undefined && statusFilter !== null && statusFilter.length!=0) 
              taskList = taskList.filter(task => (task.status && statusFilter.includes(task.status)));
        
        if (prorityFilter !== undefined && prorityFilter !== null && prorityFilter.length!=0) 
            taskList = taskList.filter(task =>(task.priority && prorityFilter.includes(task.priority)));
        //  for (let t of taskList) console.log(t.taskId+' '+t.title);
        return taskList;
    }
    update(updatedTask: Task,catId: number): void {
        let taskList = this.loadFullCat();
        const index = taskList.findIndex(t => t.taskId === updatedTask.taskId );

        if (index>-1) {
            updatedTask.updateAt = new Date();
            taskList[index] = updatedTask;
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
        } 
    }

    markDone(currentTaskId: number, catId: number): void {
        let taskList = this.loadFullCat();
        const task = taskList.find(t => t.taskId === currentTaskId && t.categoryId ===catId);

        if (task) {
            task.status = 'Done';
            task.updateAt = new Date();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
            this.update(task,catId);
        }
    }

    unmarkDone(currentTaskId: number, catId: number): void {
        let taskList = this.loadFullCat();
        const task = taskList.find(t => t.taskId === currentTaskId && t.categoryId === catId);

        if (task) {
            task.status = 'Pending';
            task.updateAt = new Date();
            
            localStorage.setItem(STORAGE_TASK, JSON.stringify(taskList));
            this.update(task,catId);
        } 
    }
     restore(currentTaskId?: number, catId?: number) {
        let taskList = this.loadFullCat();
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
