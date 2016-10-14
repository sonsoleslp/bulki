import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ResizableModule } from 'angular2-resizable';
import { RouterModule }   from '@angular/router';
import { appRouterProviders } from './app.routes';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }     from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DatafilesService } from './datafiles.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BulkitableComponent } from './bulkitable/bulkitable.component';
import { ListComponent } from './list/list.component';
import { ConfigComponent } from './config/config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTableModule } from "angular2-datatable";
 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CanvasComponent,
    BulkitableComponent,
    ListComponent,
    ConfigComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
    MaterialModule.forRoot(),
    ResizableModule,
    DataTableModule,
    RouterModule.forRoot(appRouterProviders)
  ],
  providers: [DatafilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
