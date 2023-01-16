import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './Components/HomePage/HomePage.component';
import { CategoriesComponent } from './Components/Kategoriler/Categories/Categories.component';
import { LoginComponent } from './Components/Login/Login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignUpComponent } from './Components/SignUp/SignUp.component';
import { UsersComponent } from './Components/Uyeler/Users/Users.component';
import {  canActivate,redirectUnauthorizedTo,redirectLoggedInTo,} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {path: "home", component: HomePageComponent,...canActivate(redirectToLogin),},
  {path: "categories", component: CategoriesComponent,...canActivate(redirectToLogin),},
  {path: "users", component: UsersComponent,...canActivate(redirectToLogin),}, 
  {path: "login", component: LoginComponent,...canActivate(redirectToHome),}, 
  {path: "signUp", component: SignUpComponent,...canActivate(redirectToHome),}, 
  {path: "profile", component: ProfileComponent,...canActivate(redirectToLogin),}, 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
