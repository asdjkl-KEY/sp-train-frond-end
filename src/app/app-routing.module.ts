import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainComponent } from './components/train/train.component';
import { OptionsComponent } from './components/options/options.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './components/news/news.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "options",
    component: OptionsComponent
  },
  {
    path: "train",
    component: TrainComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
