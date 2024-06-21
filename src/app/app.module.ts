import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpecificPredictionsComponent } from './specific-predictions/specific-predictions.component';
import { FormsModule } from '@angular/forms';
import { ObservationConventionalComponent } from './observation-conventional/observation-conventional.component';
import { DailyClimatologiesComponent } from './daily-climatologies/daily-climatologies.component';
import { SatelliteInformationComponent } from './satellite-information/satellite-information.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MapsAndChartsComponent } from './maps-and-charts/maps-and-charts.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClarityModule } from '@clr/angular';
import { ClimatologicProductsComponent } from './climatologic-products/climatologic-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecificPredictionsComponent,
    ObservationConventionalComponent,
    DailyClimatologiesComponent,
    SatelliteInformationComponent,
    MapsAndChartsComponent,
    TeacherComponent,
    ClimatologicProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ClarityModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
