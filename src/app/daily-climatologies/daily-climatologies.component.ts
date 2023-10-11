import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';

interface Region {
  codigoProvince: string;
  nombre: string;
}

interface Province {
  codigo: string;
  provincia: string;
}

@Component({
  selector: 'app-daily-climatologies',
  templateUrl: './daily-climatologies.component.html',
  styleUrls: ['./daily-climatologies.component.css']
})


export class DailyClimatologiesComponent {
  contentToChange: string = '';

  sectionOPC11: boolean = false;
  sectionOPCResponse11: boolean = false;
  sectionOPC12: boolean = false;
  sectionOPCResponse12: boolean = false;
  sectionOPC13: boolean = false;
  sectionOPCResponse13: boolean = false;
  sectionOPC14: boolean = false;
  sectionOPCResponse14: boolean = false;
  sectionOPC15: boolean = false;
  sectionOPCResponse15: boolean = false;
  sectionOPC16: boolean = false;
  sectionOPCResponse16: boolean = false;
  sectionOPC17: boolean = false;
  selectedTitle: string = '';
  selectedSubtitle: string = '';
  selectedContent: string = '';

  selectedDate: Date = new Date();
  selectedDate2: Date = new Date();

  selectedProvince: string = '03';
  selectedRegion: string = '03';
  selectedMuni: string = '133';

  excelMunicipiosData: any[] = [];
  filteredData: any[] = [];


  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;

    console.log(this.contentToChange);

    if (this.contentToChange === 'opcion11') {
      this.sectionOPC11 = true;
      this.selectedTitle = 'Climatologías diarías.';
      this.selectedSubtitle = 'Valores climatológicos para el rango de fechas y la estación seleccionada. Periodicidad: 1 vez al día. ';
      this.selectedContent =
        'Valores climatológicos para el rango de fechas y la estación seleccionada. Periodicidad: 1 vez al día. ';
    }
    else if(this.contentToChange === 'opcion12'){
      this.sectionOPC12 = true;
      this.selectedTitle = 'Climatologías diarías.';
      this.selectedSubtitle = 'Valores climatológicos de todas las estaciones para el rango de fechas seleccionado. Periodicidad: 1 vez al día. ';
      this.selectedContent =
        'Valores climatológicos de todas las estaciones para el rango de fechas seleccionado. Periodicidad: 1 vez al día. ';
    }
    else if(this.contentToChange === 'opcion13'){

    }
    else if(this.contentToChange === 'opcion14'){

    }
    else if(this.contentToChange === 'opcion15'){

    }
    else if(this.contentToChange === 'opcion16'){

    }
    else if(this.contentToChange === 'opcion17'){

    }
  }

  callToApiOPC11(): void{
    if(this.selectedDate != null || this.selectedDate != ''){
      console.log(this.selectedDate);
      console.log(this.selectedProvince);
      console.log(this.selectedMuni);

    }
    else{
      console.log("No tienes datos que mostrar!");
      console.log(this.selectedMuni);
    }
    
  }

  callToApiOPC12(): void{
    if (this.selectedDate !== null) {
      let fechaIniStr = this.selectedDate + ':00UTC';
      let fechaFinStr =  this.selectedDate2 + ':00UTC';
      console.log(fechaIniStr);
      console.log(fechaFinStr);

      const apiKey = environment.apiKey;

      const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/${fechaIniStr}/fechafin/${fechaFinStr}/todasestaciones?api_key=${apiKey}`;
      console.log(apiUrl);
    }
    else{
      console.log("No tienes datos que mostrar!");
    }
    
  }

  formatDate(date: Date): string {
    console.log(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    console.log(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}UTC`);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}UTC`;
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
