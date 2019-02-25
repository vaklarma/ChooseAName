import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {NavbarItemComponent} from './navbar-item/navbar-item.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarItemComponent,
    PageNotFoundComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    NavbarItemComponent
  ]
})
export class CoreModule {
}
