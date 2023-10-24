import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-satellite-information',
  templateUrl: './satellite-information.component.html',
  styleUrls: ['./satellite-information.component.css']
})
export class SatelliteInformationComponent {
  contentToChange: string = '';

  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
  ) {}
  
  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;
  }

  
  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
