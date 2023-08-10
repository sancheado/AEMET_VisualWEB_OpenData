import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpecificPredictionsComponent } from './specific-predictions/specific-predictions.component';
import { FormsModule } from '@angular/forms';
import { ObservationConventionalComponent } from './observation-conventional/observation-conventional.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecificPredictionsComponent,
    ObservationConventionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
