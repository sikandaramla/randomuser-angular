import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomuserComponent } from './randomuser/randomuser.component';

const routes: Routes = [
  {path:'',redirectTo:'randomuser',pathMatch:'full'},
  {path:'randomuser',component:RandomuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
