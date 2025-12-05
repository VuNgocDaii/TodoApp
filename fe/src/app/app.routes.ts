import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./to-do-page/to-do-page').then(c=>c.ToDoPage)
    },
    {
        path:'deletedTasksPage',
        loadComponent:()=>import('./to-do-page/to-do-page').then(c=>c.ToDoPage)
    },
    {
        path:'test',
        loadComponent: () => import('../test-component/test-component/test-component').then(c=>c.TestComponent)
    }
];
