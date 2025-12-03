import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'test',
        loadComponent: () => import('../test-component/test-component/test-component').then(c=>c.TestComponent)
    }
];
