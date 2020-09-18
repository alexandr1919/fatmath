import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SummaryComponent } from './summary/summary.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [HomeComponent, SummaryComponent, NavigationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
