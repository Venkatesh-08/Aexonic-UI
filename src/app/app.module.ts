import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTabsModule} from '@angular/material/tabs'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio'
import {MatButtonModule} from '@angular/material/button'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import {ToastrModule} from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    ModalModule.forRoot(),
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    AuthModule
  ],
  providers: [
    CdkColumnDef,
    {
       provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
       multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
