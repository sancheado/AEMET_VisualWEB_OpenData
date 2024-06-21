import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { environment } from 'src/environments/environment';
import { ResponseAPI1 } from '../ResponseAPI1';
import { SeccionItem } from '../ResponseAPI1';
import { ParrafoItem } from '../ResponseAPI1';
import { Location } from '@angular/common';
import ResponseAPI2 from '../ResponseAPI2';
import { AppComponent } from '../app.component';
import { BeachForecast } from '../BeachForecast';
import { DatePipe } from '@angular/common';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

interface AreaMontañosa {
  codigo: string;
  areaMontaosa: string;
}

interface CodigoDia {
  codigo: string;
  dia: string;
}

// Define una interfaz para el tipo de los datos de sección
interface SeccionData {
  prediccion: {
    apartado: Apartado[];
  };
  atmosferalibre: {
    apartado: Apartado[];
  };
  sensacion_termica: {
    lugar: Lugar[];
  };
}

// Define una interfaz para el tipo de los datos de apartado
interface Apartado {
  cabecera: string;
  texto: string;
  nombre: string;
}

// Define una interfaz para el tipo de los datos de lugar
interface Lugar {
  minima: number;
  stminima: number;
  maxima: number;
  stmaxima: number;
  nombre: string;
}

interface Region {
  codigoProvince: string;
  nombre: string;
}

interface Province {
  codigo: string;
  provincia: string;
}

interface Option7 {
  codigo: string;
  dia: string;
}

interface UvData {
  Ciudad: string;
  'Radiación UV': string;
}

interface excelCod {
  CODAUTO: string;
  CPRO: string;
  CMUN: string;
  DC: string;
  NOMBRE: string;
}

interface DatosFormateados {
  provincia: string;
  nombre: string;
  elaborado: string;
  prediccion: { dia: any[] };
  origen: { productor: string; web: string; enlace: string; language: string; copyright: string };
  id: number;
}

interface DatosFormateados2 {
  elaborado: string;
  id: number;
  origen: { productor: string; web: string; enlace: string; language: string; copyright: string };
  prediccion: { dia: any[] };
  provincia: string;
  nombre: string;
}

@Component({
  selector: 'app-specific-predictions',
  templateUrl: './specific-predictions.component.html',
  styleUrls: ['./specific-predictions.component.css'],
})
export class SpecificPredictionsComponent {
  @Input() data: any;


  contentToChange: string = '';
  titleSection: string = '';
  SubtitleSection: string = '';

  SectionOPC1: boolean = false;
  SectionOPC2: boolean = false;
  SectionOPC3: boolean = false;
  SectionOPC4: boolean = false;
  SectionOPC5: boolean = false;
  SectionOPC6: boolean = false;
  SectionOPC7: boolean = false;

  ResponseAPI1: boolean = false;
  ResponseAPI2: boolean = false;
  ResponseAPI3: boolean = false;
  ResponseAPI4: boolean = false;
  ResponseAPI5: boolean = false;
  ResponseAPI6: boolean = false;
  ResponseAPI7: boolean = false;

  apiData: ResponseAPI1 = {
    id: '',
    nombre: '',
    origen: {
      notaLegal: '',
      productor: '',
      web: '',
      tipo: '',
      language: '',
      copyright: '',
    },
    seccion: [],
  };

  seccionData: SeccionItem = {
    nombre: ' ',
    lugar: ' ',
    apartado: '',
    parrafo: [],
  };

  parrafoData: ParrafoItem = {
    numero: '',
    texto: '',
  };

  apiData2: ResponseAPI2 = {
    origen: {
      productor: '',
      web: '',
      tipo: '',
      language: '',
      copyright: '',
      notaLegal: '',
    },
    seccion: {
      prediccion: {
        apartado: [],
      },
      atmosferalibre: {
        apartado: [],
      },
      sensacion_termica: {
        lugar: [],
      },
    },
    id: '',
    nombre: '',
  };

  // Opciones para el select
  areaMontanosaList: AreaMontañosa[] = [
    { codigo: 'peu1', areaMontaosa: 'Picos de Europa' },
    { codigo: 'nav1', areaMontaosa: 'Pirineo Navarro' },
    { codigo: 'arn1', areaMontaosa: 'Pirineo Aragonés' },
    { codigo: 'cat1', areaMontaosa: 'Pirineo Catalán' },
    { codigo: 'rio1', areaMontaosa: 'Ibérica Riojana' },
    { codigo: 'arn2', areaMontaosa: 'Ibérica Aragonesa' },
    { codigo: 'mad2', areaMontaosa: 'Sierras de Guadarrama y Somosierra' },
    { codigo: 'gre1', areaMontaosa: 'Sierra de Gredos' },
    { codigo: 'nev1', areaMontaosa: 'Sierra Nevada' },
  ];

  selectedArea: string = 'peu1';

  codigoDia: CodigoDia[] = [
    { codigo: '0', dia: 'día actual' },
    { codigo: '1', dia: 'd+1 (mañana)' },
    { codigo: '2', dia: 'd+2 (pasado mañana)' },
    { codigo: '3', dia: 'd+3 (siguente a pasado mañana)' },
  ];

  areaMontanosaList2: AreaMontañosa[] = [
    { codigo: '0', areaMontaosa: 'Pirineo Catalán' },
    { codigo: '1', areaMontaosa: 'Pirineo Navarro y Aragonés' },
  ];

  regionList: Region[] = [
    { nombre: 'Región de Murcia', codigoProvince: '30' },
    { nombre: 'Comunidad Valenciana', codigoProvince: '03' },
    { nombre: 'Comunidad Valenciana', codigoProvince: '46' },
    { nombre: 'Comunidad Valenciana', codigoProvince: '12' },
    { nombre: 'Cataluña', codigoProvince: '43' },
    { nombre: 'Cataluña', codigoProvince: '08' },
    { nombre: 'Cataluña', codigoProvince: '17' },
    { nombre: 'Cataluña', codigoProvince: '25' },
    { nombre: 'Andalucia', codigoProvince: '21' },
    { nombre: 'Andalucia', codigoProvince: '41' },
    { nombre: 'Andalucia', codigoProvince: '11' },
    { nombre: 'Andalucia', codigoProvince: '29' },
    { nombre: 'Andalucia', codigoProvince: '18' },
    { nombre: 'Andalucia', codigoProvince: '23' },
    { nombre: 'Andalucia', codigoProvince: '04' },
    { nombre: 'Comunidad De Madrid', codigoProvince: '28' },
    { nombre: 'La Rioja', codigoProvince: '26' },
    { nombre: 'Castilla y la Mancha', codigoProvince: '02' },
    { nombre: 'Castilla y la Mancha', codigoProvince: '16' },
    { nombre: 'Castilla y la Mancha', codigoProvince: '19' },
    { nombre: 'Castilla y la Mancha', codigoProvince: '45' },
    { nombre: 'Castilla y la Mancha', codigoProvince: '13' },
    { nombre: 'Castilla y Leon', codigoProvince: '24' },
    { nombre: 'Castilla y Leon', codigoProvince: '49' },
    { nombre: 'Castilla y Leon', codigoProvince: '37' },
    { nombre: 'Castilla y Leon', codigoProvince: '05' },
    { nombre: 'Castilla y Leon', codigoProvince: '40' },
    { nombre: 'Castilla y Leon', codigoProvince: '47' },
    { nombre: 'Castilla y Leon', codigoProvince: '34' },
    { nombre: 'Castilla y Leon', codigoProvince: '42' },
    { nombre: 'Castilla y Leon', codigoProvince: '09' },
    { nombre: 'Comunidad Foral de Navarra', codigoProvince: '31' },
    { nombre: 'País Vasco/Euskadi', codigoProvince: '01' },
    { nombre: 'País Vasco/Euskadi', codigoProvince: '48' },
    { nombre: 'País Vasco/Euskadi', codigoProvince: '20' },
    { nombre: 'Asturias', codigoProvince: '39' },
    { nombre: 'Cantabria', codigoProvince: '33' },
    { nombre: 'Extremadura', codigoProvince: '06' },
    { nombre: 'Extremadura', codigoProvince: '10' },
    { nombre: 'Galicia', codigoProvince: '15' },
    { nombre: 'Galicia', codigoProvince: '27' },
    { nombre: 'Galicia', codigoProvince: '36' },
    { nombre: 'Galicia', codigoProvince: '32' },
    { nombre: 'Ceuta y Melilla', codigoProvince: '51' },
    { nombre: 'Ceuta y Melilla', codigoProvince: '52' },
    { nombre: 'Aragón', codigoProvince: '44' },
    { nombre: 'Aragón', codigoProvince: '50' },
    { nombre: 'Aragón', codigoProvince: '22' },
    { nombre: 'Islas Baleares', codigoProvince: '07' },
    { nombre: 'Islas Canarias', codigoProvince: '35' },
    { nombre: 'Islas Canarias', codigoProvince: '38' },
  ];

  provincesList: Province[] = [
    { codigo: '01', provincia: 'Alava' },
    { codigo: '02', provincia: 'Albacete' },
    { codigo: '03', provincia: 'Alicante' },
    { codigo: '04', provincia: 'Almeria' },
    { codigo: '05', provincia: 'Ávila' },
    { codigo: '06', provincia: 'Cáceres' },
    { codigo: '07', provincia: 'Baleares' },
    { codigo: '08', provincia: 'Barcelona' },
    { codigo: '09', provincia: 'Burgos' },
    { codigo: '10', provincia: 'Badajoz' },
    { codigo: '11', provincia: 'Cadiz' },
    { codigo: '12', provincia: 'Castellón' },
    { codigo: '13', provincia: 'Ciudad Real' },
    { codigo: '15', provincia: 'La Coruña' },
    { codigo: '16', provincia: 'Cuenca' },
    { codigo: '17', provincia: 'Gerona' },
    { codigo: '18', provincia: 'Granada' },
    { codigo: '19', provincia: 'Guadalajara' },
    { codigo: '20', provincia: 'Guipuzcua' },
    { codigo: '21', provincia: 'Huelva' },
    { codigo: '22', provincia: 'Huesca' },
    { codigo: '23', provincia: 'Jaen' },
    { codigo: '24', provincia: 'León' },
    { codigo: '25', provincia: 'Lerida' },
    { codigo: '26', provincia: 'La Rioja' },
    { codigo: '27', provincia: 'Lugo' },
    { codigo: '28', provincia: 'Madrid' },
    { codigo: '29', provincia: 'Malaga' },
    { codigo: '30', provincia: 'Murcia' },
    { codigo: '31', provincia: 'Navarra' },
    { codigo: '32', provincia: 'Orense' },
    { codigo: '33', provincia: 'Asturias' },
    { codigo: '34', provincia: 'Pálencia' },
    { codigo: '35', provincia: 'Las Palmas' },
    { codigo: '36', provincia: 'Pontevedra' },
    { codigo: '37', provincia: 'Salamanca' },
    { codigo: '38', provincia: 'Barcelona' },
    { codigo: '38', provincia: 'Santa Cruz de Tenerife' },
    { codigo: '39', provincia: 'Cantabría' },
    { codigo: '41', provincia: 'Sevilla' },
    { codigo: '42', provincia: 'Soria' },
    { codigo: '43', provincia: 'Tarragona' },
    { codigo: '44', provincia: 'Teruel' },
    { codigo: '45', provincia: 'Toledo' },
    { codigo: '46', provincia: 'Valencia' },
    { codigo: '47', provincia: 'Valladolid' },
    { codigo: '48', provincia: 'Vizcaya' },
    { codigo: '49', provincia: 'Zamora' },
    { codigo: '50', provincia: 'Zaragoza' },
    { codigo: '51', provincia: 'Ceuta' },
    { codigo: '52', provincia: 'Melilla' },
  ];

  option7List: Option7[] = [
    { codigo: '0', dia: 'día actual' },
    { codigo: '1', dia: 'd+1 (mañana)' },
    { codigo: '2', dia: 'd+2 (pasado mañana)' },
    { codigo: '3', dia: 'd+3 (dentro de 3 días)' },
    { codigo: '4', dia: 'd+4 (dentro de 4 días)' },
  ];

  selectedArea2: string = '0';
  selectedArea3: string = '0';
  selectedProvince: string = '03';
  selectedRegion: string = '03';
  seccionData2: SeccionData | undefined;
  htmlContent: string = '';
  datos: any = [];
  responseData: string | null = null;
  pathString: string = './assets/excel/todos.xlsx';
  municipiosList: { municipio: string; codigo: number }[] = [];
  beaches: any[] = [];
  selectedPlaya: string = '0301101';
  selectedProvincia: string = 'Alacant/Alicante';
  selectedMunicipio: string = 'lAlfàs del Pi';
  beachForecast: BeachForecast | null = null;
  selectedVioleta: string = '0';
  uvData: UvData[] = [];
  PrMunDi: excelCod[] = [];

  selectedMuni: string = '133';
  excelMunicipiosData: any[] = [];
  filteredData: any[] = [];
  municipioData: DatosFormateados[] = [];
  municipioData2: DatosFormateados2[] = [];
  municipioDataDate: string = '';
  DataMunicipiFormat: DatosFormateados[] = [];

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private location: Location,
    private appComponente: AppComponent
  ) { }

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.data;

    console.log("this.contentToChange; ", this.contentToChange);

    document.addEventListener('DOMContentLoaded', () => {
      const selectElement: HTMLSelectElement = document.getElementById(
        'provinces'
      ) as HTMLSelectElement;

      // Agregar evento para detectar cambios en el select
      selectElement.addEventListener('change', (event) => {
        console.log(
          'Provincia seleccionada:',
          (event.target as HTMLSelectElement).value
        );
        const selectedOption = (event.target as HTMLSelectElement).value;
        const selectedProvince = this.provincesList.find(
          (province) => province.provincia === selectedOption
        );
        console.log(
          'Provincia seleccionada:',
          (event.target as HTMLSelectElement).value
        );
        if (selectedProvince) {
          const selectedCode = selectedProvince.codigo;
          // Llamar a la función para buscar y montar los municipios
          // this.loadMunicipiosFromProvincia(selectedCode);
        }
      });
    });

    if (
      this.contentToChange === 'opcion1' ||
      this.contentToChange === 'opcion2' ||
      this.contentToChange === 'opcion3' ||
      this.contentToChange === 'opcion4' ||
      this.contentToChange === 'opcion5' ||
      this.contentToChange === 'opcion6' ||
      this.contentToChange === 'opcion7'
    ) {
      this.titleSection = 'Predicciones Especificas';
      switch (this.contentToChange) {
        case 'opcion1':
          this.SubtitleSection = 'Predicción Montaña. Pasado.';
          this.SectionOPC1 = true;
          break;
        case 'opcion2':
          this.SubtitleSection = 'Predicción Montaña. Actual.';
          this.SectionOPC2 = true;
          break;
        case 'opcion3':
          this.SubtitleSection = 'Información nivologica.';
          this.SectionOPC3 = true;
          break;
        case 'opcion4':
          this.SubtitleSection =
            'Predicción por municipios diaria. Tiempo actual.';
          this.SectionOPC4 = true;
          //aqui llamamos a la función de leer excel
          this.loadExcelData();
          break;
        case 'opcion5':
          this.SubtitleSection =
            'Predicción por municipios horaria. Tiempo actual.';
          this.SectionOPC5 = true;
          break;
        case 'opcion6':
          this.SectionOPC6 = true;
          this.SubtitleSection = 'Predicción para las playas. Tiempo actual.';
          this.readCSV();
          break;
        case 'opcion7':
          this.SectionOPC7 = true;
          this.SubtitleSection = 'Predicción de radiación ultravioleta (UVI).';
          break;
        default:
      }
    }
    console.log('Contenido recibido:', this.contentToChange);
  }




  callToApiOPC1(): void {
    const area = (document.getElementById('areaMontañosa') as HTMLSelectElement)
      .value;

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/montaña/pasada/area/${area}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<ResponseAPI1[]>(dataUrl).subscribe(
            (data: ResponseAPI1[]) => {
              if (data.length > 0) {
                this.apiData = data[0];
                this.ResponseAPI1 = true;
                this.seccionData = this.apiData.seccion[0];
                this.seccionData.parrafo;
                console.log("this.seccionData: ", this.seccionData);
                console.log("this.seccionData.parrafo: ", this.seccionData.parrafo);
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

  callToApiOPC2(): void {
    const area = (document.getElementById('areaMontañosa') as HTMLSelectElement)
      .value;
    const codigo = (document.getElementById('codigoDia') as HTMLSelectElement)
      .value;
    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/montaña/pasada/area/${area}/dia/${codigo}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;
          this.http.get<ResponseAPI2[]>(dataUrl).subscribe(
            (data: ResponseAPI2[]) => {
              if (data.length > 0) {
                this.ResponseAPI2 = true;
                this.apiData2 = data[0];
                this.seccionData2 = this.apiData2.seccion;
                this.datos = this.seccionData2;
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

  callToApiOPC3(): void {
    const area = (
      document.getElementById('areaMontañosa3') as HTMLSelectElement
    ).value;

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/nivologica/${area}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('response: ', response);
        if (response && response.datos) {
          const dataUrl = response.datos;
          this.http.get(dataUrl, { responseType: 'text' }).subscribe(
            (responseData: any) => {
              this.ResponseAPI3 = true;
              this.responseData = responseData;
            },
            (error) => {
              console.error(
                'Error al obtener el contenido de la URL de los datos de la API:',
                error.message
              );
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (error) => {
        console.error(
          'Error al obtener la URL de los datos de la API:',
          error.message
        );
      }
    );
  }

  callToApiOPC4(): void {
    console.log('this.selectedProvince:', this.selectedProvince);
    console.log('this.selectedMuni:', this.selectedMuni);
    const muni = this.selectedProvince + this.selectedMuni;
    console.log('muni:', muni);

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${muni}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;
          this.http.get<DatosFormateados[]>(dataUrl).subscribe(
            (response: DatosFormateados[]) => {
              if (response) {
                console.log(response);
                this.ResponseAPI4 = true;
                this.municipioData = response;
              } else {
                console.error('La respuesta de la API no contiene datos válidos.');
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

  callToApiOPC5(): void {
    console.log('this.selectedProvince:', this.selectedProvince);
    console.log('this.selectedMuni:', this.selectedMuni);
    const muni = this.selectedProvince + this.selectedMuni;
    console.log('muni:', muni);

    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${muni}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;
          this.http.get<DatosFormateados2[]>(dataUrl).subscribe(
            (response: DatosFormateados2[]) => {
              if (response) {
                console.log(response);
                this.ResponseAPI5 = true;
                this.municipioData2 = response;
              } else {
                console.error('La respuesta de la API no contiene datos válidos.');
              }
            },
            (error) => {
              console.error('Error al obtener los datos de la API:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
      }
    );
  }

  callToApiOPC6(): void {
    const playa = (document.getElementById('beachName') as HTMLSelectElement)
      .value;
    console.log('playa:', playa);

    const apiKey = environment.apiKey;

    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${playa}?api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('response', response);

        if (response && response.datos) {
          const dataUrl = response.datos;

          this.http.get<BeachForecast[]>(dataUrl).subscribe(
            (forecastResponse: BeachForecast[]) => {
              console.log('forecastResponse', forecastResponse);
              if (forecastResponse.length > 0) {
                this.ResponseAPI6 = true;
                this.beachForecast = forecastResponse[0];
              } else {
                console.error('Los datos de pronóstico están vacíos.');
              }
            },
            (forecastError) => {
              console.error(
                'Error al obtener los datos de pronóstico:',
                forecastError
              );
            }
          );
        } else {
          console.error('La respuesta de la API no contiene el campo "datos".');
        }
      },
      (apiError) => {
        console.error(
          'Error al obtener la URL de los datos de la API:',
          apiError
        );
      }
    );
  }

  callToApiOPC7(): void {
    const violeta = (document.getElementById('violeta') as HTMLSelectElement)
      .value;
    console.log('violeta:', violeta);
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/uvi/${violeta}?api_key=${apiKey}`;
    console.log(apiUrl);

    this.http.get(apiUrl).subscribe((response: any) => {
      console.log('response', response);
      if (response && response.datos) {
        const dataUrl = response.datos;
        console.log('dataUrl:', dataUrl);
        this.http
          .get(dataUrl, { responseType: 'text' })
          .subscribe((responseText: string) => {
            // Encontrar el índice donde comienzan los datos CSV
            const csvStartIndex = responseText.indexOf(
              '"Ciudad","Radiación UV"'
            );

            // Obtener la parte de la respuesta que contiene los datos CSV
            const csvData = responseText.substring(csvStartIndex);

            // Ahora puedes usar la librería PapaParse para analizar los datos CSV
            Papa.parse(csvData, {
              header: true,
              skipEmptyLines: true,
              complete: (result: { data: any[] }) => {
                // Aquí puedes procesar los datos como desees
                console.log(result.data);
                this.ResponseAPI7 = true;
                this.uvData = result.data;
                console.log('uvData: ', this.uvData);
                console.log('uvData[0].city: ', this.uvData[0].Ciudad);
                console.log(
                  'uvData[0].Radiation: ',
                  this.uvData[0]['Radiación UV']
                );
                console.log('uvData[1].city: ', this.uvData[1].Ciudad);
                console.log(
                  'uvData[1].Radiation: ',
                  this.uvData[1]['Radiación UV']
                );
                console.log('uvData[2].city: ', this.uvData[2].Ciudad);
                console.log(
                  'uvData[2].Radiation: ',
                  this.uvData[2]['Radiación UV']
                );
                console.log('uvData[3].city: ', this.uvData[3].Ciudad);
                console.log(
                  'uvData[3].Radiation: ',
                  this.uvData[3]['Radiación UV']
                );
              },
            });
          });
      }
    });
  }


  loadExcelData(): void {
    const excelFilePath = 'assets/excel/20codmun.xlsx';

    fetch(excelFilePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        const municipiosData = excelData.slice(1);

        this.excelMunicipiosData = municipiosData.map((municipio: any) => {
          return {
            CODAUTO:
              municipio[
              'Relación de municipios y códigos por comunidades autónomas y provincias a 1 de enero de 2020'
              ],
            CPRO: municipio['__EMPTY'],
            CODMUN: municipio['__EMPTY_1'],
            DC: municipio['__EMPTY_2'],
            NOMBRE: municipio['__EMPTY_3'],
          };
        });

        // Agrega console.log para verificar los valores antes del filtro
        console.log('Valores seleccionados para filtro:');
        console.log('selectedRegion:', this.selectedRegion);
        console.log('selectedProvince:', this.selectedProvince);

        this.filteredData = this.excelMunicipiosData.filter((municipio) => {
          this.selectedMuni = municipio.CODMUN;
          return municipio.CPRO === this.selectedProvince;
        });

        console.log('Datos transformados:', this.excelMunicipiosData);
        console.log('Datos filtrados:', this.filteredData);
      })
      .catch((error) => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }

  reformatearDate(datePass: string) {
    const fechaOriginal = new Date(datePass);
    const fechaFormateada = format(fechaOriginal, "dd MMMM 'de' yyyy 'a las' HH:mm:ss a");
    return fechaFormateada;
  }

  reformatearSecondDate(fechaString: string) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    return `Día ${dia}`;
  }
  reformatearDatos(datosOriginales: any): DatosFormateados {
    return {
      provincia: datosOriginales.provincia,
      nombre: datosOriginales.nombre,
      elaborado: datosOriginales.elaborado,
      prediccion: datosOriginales.prediccion,
      origen: datosOriginales.origen,
      id: datosOriginales.id,
    };
  }

  reformatearCadenaProbNieve(data: any) {
    const start = data.slice(0, 2);
    const end = data.slice(2);

    const periodoFormat = `${start}:00 - ${end}:00`;

    return periodoFormat;
  }

  onProvinceChange() {
    const selectedRegion = this.regionList.find(
      (region) => region.codigoProvince === this.selectedProvince
    );

    if (selectedRegion) {
      this.selectedRegion = selectedRegion.codigoProvince;
    }

    this.loadExcelData();
  }



  readCSV() {
    const csvFilePath = './assets/excel/Playas_codigos.csv';
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (result: { data: any[] }) => {
        this.beaches = result.data;
      },
    });
    console.log(this.beaches);
  }

  onPlayaSelected() {
    const selectedBeach = this.beaches.find(
      (beach) => beach.ID_PLAYA === this.selectedPlaya
    );
    if (selectedBeach) {
      this.selectedProvincia = selectedBeach.NOMBRE_PROVINCIA;
      this.selectedMunicipio = selectedBeach.NOMBRE_MUNICIPIO;
    }
  }

  formatDate(fecha: number, index: number): string {
    const days = ['Hoy', 'Mañana', 'Pasado Mañana'];
    const date = new Date(fecha * 1000);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${days[index]}`;
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
