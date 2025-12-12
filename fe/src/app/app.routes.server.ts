import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'taskList/:categoryId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'deletedTasksPage/:categoryId',
    renderMode: RenderMode.Server,
  },

  {
    path: 'test',
    renderMode: RenderMode.Server,
  },
];
