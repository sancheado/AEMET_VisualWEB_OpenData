import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificPredictionsComponent } from './specific-predictions/specific-predictions.component';
import { ObservationConventionalComponent } from './observation-conventional/observation-conventional.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'specific-predictions', component: SpecificPredictionsComponent, pathMatch: 'full' },
  { path: 'observation-conventional', component: ObservationConventionalComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
