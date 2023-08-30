import { Component } from '@angular/core';
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

interface UvData  {
  Ciudad: string;
  "Radiación UV": string;
}

@Component({
  selector: 'app-specific-predictions',
  templateUrl: './specific-predictions.component.html',
  styleUrls: ['./specific-predictions.component.css'],
})
export class SpecificPredictionsComponent {
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
  seccionData2: SeccionData | undefined;
  htmlContent: string = '';
  datos: any = [];
  responseData: string | null = null;
  pathString: string = './assets/excel/todos.xlsx';
  municipiosList: { municipio: string; codigo: number }[] = [];
  selectedMuni = '';
  beaches: any[] = [];
  selectedPlaya: string = '0301101';
  selectedProvincia: string = 'Alacant/Alicante';
  selectedMunicipio: string = 'lAlfàs del Pi';
  beachForecast: BeachForecast | null = null;
  selectedVioleta: string = '0';
  uvData: UvData[] = [];
  // uvData: { city: string; uvIndex: number | null }[] = [];

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private location: Location,
    private appComponente: AppComponent
  ) {}

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;
    // const workbook = this.loadExcelFile(this.pathString);
    // console.log('Contenido del archivo Excel:', workbook);
    //     const filePath = 'assets/excel/todos.xlsx';

    // // Cargar el archivo Excel
    // const workbook = XLSX.readFile(filePath);

    // // Obtener la primera hoja del archivo
    // const firstSheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[firstSheetName];

    // // Leer contenido de celdas
    // const cellValue = worksheet['A1'].v;
    // console.log('Valor de la celda A1:', cellValue);

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

  // loadExcelFile(filePath: string): Promise<ExcelJS.Workbook> {
  //   const relativePath = './assets/excel/todos.xlsx';
  //   const workbook = new ExcelJS.Workbook();
  //   console.log("workbook",workbook);
  //   return workbook.xlsx.readFile(relativePath)
  //     .then(() => workbook)
  //     .catch((error) => {
  //       console.error('Error al cargar el archivo Excel:', error.message);
  //       console.error('Error stack:', error.stack);
  //       return workbook; // En caso de error, retornamos el libro de trabajo vacío
  //     });
  // }

  // // Nueva función para cargar los municipios desde la hoja de trabajo
  // async loadMunicipiosFromProvincia(provinciaCodigo: string): Promise<void> {
  //   try {
  //     const workbook = await this.loadExcelFile(this.pathString);
  //     const sheetName = workbook.getWorksheet(1).name;
  //     const worksheet = workbook.getWorksheet(sheetName);

  //     const municipiosData: any[] = [];
  //     worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
  //       municipiosData.push(row.values);
  //     });

  //     const munisList: { municipio: string; codigo: number }[] = municipiosData
  //       .filter((item: any) => item[2] === provinciaCodigo)
  //       .map((item: any) => ({
  //         municipio: item[1],
  //         codigo: parseInt(item[0], 10),
  //       }));

  //     this.municipiosList = munisList;
  //     console.log("this.municipiosList: ", this.municipiosList);
  //   } catch (error) {
  //     console.error('Error al cargar los municipios:', error);
  //   }
  // }

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

  readCSV() {
    const csvFilePath = './assets/excel/Playas_codigos.csv';
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (result: { data: any[]; }) => {
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

  callToApiOPC7(): void {
    const violeta = (document.getElementById('violeta') as HTMLSelectElement).value;
    console.log('violeta:', violeta);
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/uvi/${violeta}?api_key=${apiKey}`;
    console.log(apiUrl);

    this.http.get(apiUrl).subscribe((response: any) => {
      console.log('response', response);
      if (response && response.datos) {
        const dataUrl = response.datos;
        console.log('dataUrl:', dataUrl);
        this.http.get(dataUrl, { responseType: 'text' }).subscribe((responseText: string) => {
          // Encontrar el índice donde comienzan los datos CSV
          const csvStartIndex = responseText.indexOf('"Ciudad","Radiación UV"');

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
              console.log("uvData: ", this.uvData);
              console.log("uvData[0].city: ", this.uvData[0].Ciudad);
              console.log("uvData[0].Radiation: ", this.uvData[0]["Radiación UV"]);
              console.log("uvData[1].city: ", this.uvData[1].Ciudad);
              console.log("uvData[1].Radiation: ", this.uvData[1]["Radiación UV"]);
              console.log("uvData[2].city: ", this.uvData[2].Ciudad);
              console.log("uvData[2].Radiation: ", this.uvData[2]["Radiación UV"]);
              console.log("uvData[3].city: ", this.uvData[3].Ciudad);
              console.log("uvData[3].Radiation: ", this.uvData[3]["Radiación UV"]);
            },
          });
        });
      }
    });
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
