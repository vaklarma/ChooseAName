import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarItemComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class CoreModule {
}
