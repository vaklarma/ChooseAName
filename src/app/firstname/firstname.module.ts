import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstnameRoutingModule } from './firstname-routing.module';
import { FirstnameCardComponent } from './firstname-card/firstname-card.component';
import { FirstnameListComponent } from './firstname-list/firstname-list.component';

@NgModule({
  imports: [
    CommonModule,
    FirstnameRoutingModule
  ],
  declarations: [FirstnameCardComponent, FirstnameListComponent]
})
export class FirstnameModule { }
