import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificPredictionsComponent } from './specific-predictions/specific-predictions.component';
import { ObservationConventionalComponent } from './observation-conventional/observation-conventional.component';
import { DailyClimatologiesComponent } from './daily-climatologies/daily-climatologies.component';
import { SatelliteInformationComponent } from './satellite-information/satellite-information.component';
import { MapsAndChartsComponent } from './maps-and-charts/maps-and-charts.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClimatologicProductsComponent } from './climatologic-products/climatologic-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'specific-predictions', component: SpecificPredictionsComponent, pathMatch: 'full' },
  { path: 'observation-conventional', component: ObservationConventionalComponent, pathMatch: 'full' },
  { path: 'daily-climatologies', component: DailyClimatologiesComponent, pathMatch: 'full' },
  { path: 'satellite-information', component: SatelliteInformationComponent, pathMatch: 'full' },
  { path: 'maps-charts', component: MapsAndChartsComponent, pathMatch: 'full' },
  { path: 'teacher-teacher', component: TeacherComponent, pathMatch: 'full' },
  { path: 'climatologic-products', component: ClimatologicProductsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
