import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

interface Region {
  codigoProvince: string;
  nombre: string;
}

interface Province {
  codigo: string;
  provincia: string;
}
interface climaticsValues {
  latitud: string;
  provincia : string;
  altitud : string;
  indicativo : string;
  nombre : string;
  indsinop : string;
  longitud : string;
}

interface WeatherData {
  indicativo: string;
  nombre: string;
  ubicacion: string;
  codigo: string;
  maxDiasMesPrec: string[];
  anioMaxDiasMesPrec: string[];
  mesMaxDiasMesPrec: string;
  maxDiasMesNieve: string[];
  anioMaxDiasMesNieve: string[];
  mesMaxDiasMesNieve: string;
  maxDiasMesTormenta: string[];
  anioMaxDiasMesTormenta: string[];
  mesMaxDiasMesTormenta: string;
  precMaxDia: string[];
  diaMaxDia: string[];
  anioMaxDia: string[];
  mesMaxDia: string;
  precMaxMen: string[];
  anioMaxMen: string[];
  mesMaxMen: string;
  precMinMen: string[];
  anioMinMes: string[];
  mesMinMen: string;
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
  sectionOPCResponse17: boolean = false;

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

  climaticValues: climaticsValues[] = [];  
  climaticValuesLoaded: climaticsValues[] = [];  

  selectedIndicator: string = '1387';
  selectedIndicatorResponseApi: climaticsValues[] = [];

  yearInput: string = '2022';
  yearInput2: string = '2023';

  AnnualMonthlyClimateData: any[] = [];
  matchingName: string = '';

  meteorologicalParameter: any[] = [
    {codigo: "P", parametro: "Precipitación"},
    {codigo: "T", parametro: "Temperatura"},
    {codigo: "V", parametro: "Viento"},
  ];
  selectweatherParameter: string = 'P';

  WeatherDataValues: WeatherData[] = [];
  WeatherDataArray: WeatherData[] = [];

  EmaStation: string = '';
  WeatherParameter: string = '';
  
  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;

    if (this.contentToChange === 'opcion11') {
      this.loadClimaticData();
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
      this.loadClimaticData();
      this.sectionOPC13 = true;
      this.selectedTitle = 'Estaciones por indicativo.';
      this.selectedSubtitle = 'Características de la estación climatológica pasada por parámetro. ';
      this.selectedContent =
        'Características de la estación climatológica pasada por parámetro. ';
    }
    else if(this.contentToChange === 'opcion14'){
      this.sectionOPC14 = true;
      this.selectedTitle = ' Inventario de estaciones (valores climatológicos). ';
      this.selectedSubtitle = 'Inventario con las características de todas las estaciones climatológicas. Periodicidad: 1 vez al día. ';
      this.selectedContent =
        'Inventario con las características de todas las estaciones climatológicas. Periodicidad: 1 vez al día. ';
      this.callToApiOPC14();
    }
    else if(this.contentToChange === 'opcion15'){
      this.loadClimaticData();
      this.sectionOPC15 = true;
      this.selectedTitle = '  Climatologías mensuales anuales.  ';
      this.selectedSubtitle = 'Valores medios mensuales y anuales de los datos climatológicos para la estación y el periodo de años pasados por parámetro. Periodicidad de actualización: 1 vez al día. ';
      this.selectedContent =
        'Valores medios mensuales y anuales de los datos climatológicos para la estación y el periodo de años pasados por parámetro. Periodicidad de actualización: 1 vez al día. ';
    }
    else if(this.contentToChange === 'opcion16'){
      this.loadClimaticData();
      this.sectionOPC16 = true;
      this.selectedTitle = '  Climatologías normales (periodo 1981-2010).  ';
      this.selectedSubtitle = 'Valores climatológicos normales (periodo 1981-2010) para la estación pasada por parámetro. Periodicidad: 1 vez al día. ';
      this.selectedContent =
        'Valores climatológicos normales (periodo 1981-2010) para la estación pasada por parámetro. Periodicidad: 1 vez al día. ';

    }
    else if(this.contentToChange === 'opcion17'){
      this.loadClimaticData();
      this.sectionOPC17 = true;
      this.selectedTitle = '  Valores extremos.  ';
      this.selectedSubtitle = 'Valores extremos para la estación y la variable (precipitación, temperatura y viento) pasadas por parámetro. Periodicidad: 1 vez al día. ';
      this.selectedContent =
        'Valores extremos para la estación y la variable (precipitación, temperatura y viento) pasadas por parámetro. Periodicidad: 1 vez al día. ';

    }
  }

  callToApiOPC11(): void{

    if(this.selectedDate !== null || this.selectedDate2 !== null){
      let fechaIniStr = this.selectedDate + ':00UTC';
      let fechaFinStr =  this.selectedDate2 + ':00UTC';
      let indicativoEMA = this.selectedIndicator;
      console.log("fechaIniStr: ", fechaIniStr);
      console.log("fechaFinStr: ", fechaFinStr);
      console.log("selectedIndicator: ", this.selectedIndicator);
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
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          console.log(response);
          if (response && response.datos) {
            const dataUrl = response.datos;
  
            this.http.get(dataUrl).subscribe(
              (data: any) => {
                if (data.length > 0) {
                  // this.sectionOPCResponse12 = true;
                  console.log(data);
                } else {
                  console.error('El arreglo de datos está vacío.');
                }
              },
              (error) => {
                console.error('Error al obtener los datos de la API:', error);
              }
            );
          } else {
            console.error('La respuesta de la API no contiene el campo "datos".');
          }
        },
        (error) => {
          console.error('Error al obtener la URL de los datos de la API:', error);
        }
      );
    }
    else{
      console.log("No tienes datos que mostrar!");
    }
    
  }

  callToApiOPC13(): void{
    console.log(this.selectedIndicator);
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/estaciones/${this.selectedIndicator}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<climaticsValues[]>(dataUrl).subscribe(
            (data: any) => {
              if (data.length > 0) {
                console.log(data);
                this.sectionOPCResponse13 = true;
                this.selectedIndicatorResponseApi = data;                
              } else {
                console.error('El arreglo de datos está vacío.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
  }


  callToApiOPC14(): void{
    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=${apiKey}`;
    
    console.log(apiUrl);
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<climaticsValues[]>(dataUrl).subscribe(
            (data: any) => {
              if (data.length > 0) {
                console.log(data);
                
                this.sectionOPCResponse14 = true;
                this.climaticValues = data;
                this.climaticValues.sort((a, b) => (a.provincia > b.provincia) ? 1 : -1);
                // this.saveDataAsJSON(data);
              } else {
                console.error('El arreglo de datos está vacío.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
  }

  callToApiOPC15(): void{
    console.log(this.yearInput);
    console.log(this.yearInput2);
    console.log(this.selectedIndicator);

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/mensualesanuales/datos/anioini/${this.yearInput}/aniofin/${this.yearInput2}/estacion/${this.selectedIndicator}?api_key=${apiKey}`;
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<climaticsValues[]>(dataUrl).subscribe(
            (data: any) => {
              if (data.length > 0) {
                console.log(data);                
                this.sectionOPCResponse15 = true;
                this.AnnualMonthlyClimateData = data;
                console.log("Datos en la variable: ", this.AnnualMonthlyClimateData);                

                for (let i = 0; i < this.climaticValuesLoaded.length; i++) {
                  if (this.climaticValuesLoaded[i].indicativo === this.selectedIndicator) {
                    this.matchingName = this.climaticValuesLoaded[i].nombre;
                    break;
                  }
                }
              } else {
                console.error('El arreglo de datos está vacío.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
  }

  callToApiOPC16(): void{
    console.log(this.selectedIndicator);

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/normales/estacion/${this.selectedIndicator}?api_key=${apiKey}`;
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<climaticsValues[]>(dataUrl).subscribe(
            (data: any) => {
              if (data.length > 0) {
                console.log(data);                
                this.sectionOPCResponse16 = true;
                this.AnnualMonthlyClimateData = data;
                console.log("Datos en la variable: ", this.AnnualMonthlyClimateData);                

                for (let i = 0; i < this.climaticValuesLoaded.length; i++) {
                  if (this.climaticValuesLoaded[i].indicativo === this.selectedIndicator) {
                    this.matchingName = this.climaticValuesLoaded[i].nombre;
                    break;
                  }
                }
              } else {
                console.error('El arreglo de datos está vacío.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
  }

  callToApiOPC17(){
    console.log("this.selectweatherParameter: ", this.selectweatherParameter);
    console.log("this.selectedIndicator: ", this.selectedIndicator);

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/valores/climatologicos/valoresextremos/parametro/${this.selectweatherParameter}/estacion/${this.selectedIndicator}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get(dataUrl).subscribe(
            (data: any) => {
              if (Object.keys(data).length > 0) {
                console.log(data);                
                this.sectionOPCResponse17 = true;
                this.WeatherDataValues = data;
                this.WeatherDataArray = Object.values(this.WeatherDataValues);
                this.EmaStation = this.selectedIndicator;
                this.WeatherParameter = this.selectweatherParameter;
              } else {
                console.error('El arreglo de datos está vacío.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
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

  loadClimaticData() {
    const jsonFilePath = 'assets/moreData/climatic_data.json';

    this.http.get<climaticsValues[]>(jsonFilePath).subscribe(
      (data) => {
        this.climaticValuesLoaded = data;
        this.climaticValuesLoaded.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        // console.log('Datos cargados:', this.climaticValuesLoaded);
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  // saveDataAsJSON(data: climaticsValues[]): void {
  //   const jsonData = JSON.stringify(data, null, 2);
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'climatic_data.txt';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}