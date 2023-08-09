import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificPredictionsComponent } from './specific-predictions/specific-predictions.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'specific-predictions', component: SpecificPredictionsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
