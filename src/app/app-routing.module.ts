import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '', loadChildren: './firstname/firstname.module#FirstnameModule'},


  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
