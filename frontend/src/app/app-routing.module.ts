import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'create', component: CreateComponent},
  { path: 'edit/:postId', component: CreateComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

