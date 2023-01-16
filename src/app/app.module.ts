import { HomePageComponent } from './Components/HomePage/HomePage.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UsersComponent } from './Components/Uyeler/Users/Users.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CategoriesComponent } from './Components/Kategoriler/Categories/Categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { LoginComponent } from './Components/Login/Login.component';
import { SignUpComponent } from './Components/SignUp/SignUp.component';
import { ProfileComponent } from './Components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UsersComponent,
    CategoriesComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
