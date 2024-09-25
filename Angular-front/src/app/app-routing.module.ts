import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfumeIndexComponent } from './pages/perfume/perfume-index/perfume-index.component';
import { PerfumeCreateComponent } from './pages/perfume/perfume-create/perfume-create.component';
import { PerfumeEditComponent } from './pages/perfume/perfume-edit/perfume-edit.component';
import { Message404Component } from './messages/message404/message404.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'perfumes',component:PerfumeIndexComponent},
  {path:'perfumes/create',component:PerfumeCreateComponent},
  {path:'perfumes/edit/:id',component:PerfumeEditComponent},
  {path:'**',component:Message404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
