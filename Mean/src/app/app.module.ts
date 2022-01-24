import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import {HeaderComponent} from './Header/header.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { ANgularMaterialModule } from './angular-material.module';
import { PostsModule } from './Posts/posts.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    ANgularMaterialModule,
    PostsModule,


  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi : true} ,
              {provide : HTTP_INTERCEPTORS, useClass:ErrorInterceptor , multi : true}],
  bootstrap: [AppComponent],
  entryComponents : [ErrorComponent]
})
export class AppModule { }
