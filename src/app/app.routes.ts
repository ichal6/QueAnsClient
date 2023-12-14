import { Routes } from '@angular/router';
import {RandomComponent} from "./question/random/random.component";
import {EntryComponent} from "./entry/entry.component";

export const routes: Routes = [
  {path: '', component: RandomComponent},
  {path: 'entry', component: EntryComponent}
];
