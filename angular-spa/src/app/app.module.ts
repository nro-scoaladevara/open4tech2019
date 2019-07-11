import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListHomeComponent } from './list/home/list-home.component';
import { SharedModule } from './shared/shared.module';
import { ListDetailsComponent } from './list/list-details/list-details.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemHomeComponent } from './list-item/home/list-item-home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListHomeComponent,
    ListDetailsComponent,
    ListComponent,
    ListItemComponent,
    ListItemHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
