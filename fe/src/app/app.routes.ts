import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./to-do-page/to-do-page').then(c=>c.ToDoPage)
    },
    // {
    //     path:'deletedTaskGroupsPage',
    //     loadComponent:()=>import('./task-group-page/task-group-page').then(c=>c.TaskGroupPage)
    // },
    {
        path:'taskList/:categoryId',
        loadComponent:()=>import('./to-do-page/to-do-page').then(c=>c.ToDoPage)
    },
    {
        path:'deletedTasksPage/:categoryId',
        loadComponent:()=>import('./to-do-page/to-do-page').then(c=>c.ToDoPage)
    },
    {
        path:'test',
        loadComponent: () => import('../test-component/test-component/test-component').then(c=>c.TestComponent)
    }
];
