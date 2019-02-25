import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstnameListComponent} from './firstname-list/firstname-list.component';

const routes: Routes = [
  {
    path: 'firstname',
    children: [
      {path: '', component: FirstnameListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstnameRoutingModule { }
