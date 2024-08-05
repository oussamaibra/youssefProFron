import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostProjectComponent } from './components/post-project/post-project.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { ViewProjectDetailsComponent } from './components/view-project-details/view-project-details.component';

const routes: Routes = [
  {path:"dashboard", component: DashboardComponent},
  {path:"project", component: PostProjectComponent},
  {path:"project/:id/edit", component: UpdateProjectComponent},
  {path:"project-details/:id", component: ViewProjectDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
