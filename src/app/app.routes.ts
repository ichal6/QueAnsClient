import { Routes } from '@angular/router';
import {RandomComponent} from "./question/random/random.component";
import {EntryComponent} from "./entry/entry.component";
import {AuthRouteGuardService} from "./authentication/auth-route-guard.service";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./authentication/login/login/login.component";

export const routes: Routes = [
  {path: '', component: RandomComponent},
  {path: 'entry', component: EntryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthRouteGuardService]},

  {path: '**', redirectTo: '/'},
];
