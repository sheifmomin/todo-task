import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'task',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../list-view/list-view.module').then(m => m.ListViewPageModule)
      },
      {
        path: 'write',
        loadChildren: () => import('../write-task/write-task.module').then(m => m.WriteTaskPageModule)
      },
      {
        path: 'view',
        loadChildren: () => import('../task-view/task-view.module').then(m => m.TaskViewPageModule)
      },
      {
        path: '',
        redirectTo: '/task/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/task/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
