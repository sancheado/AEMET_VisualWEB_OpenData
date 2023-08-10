import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../WeatherData';

interface selectedOption {
  title: string;
  subtitle: string;
  content: string;
}
interface estacionIDEMA {
  codigoInterno: string;
  Ubicacion: string;
}

@Component({
  selector: 'app-observation-conventional',
  templateUrl: './observation-conventional.component.html',
  styleUrls: ['./observation-conventional.component.css'],
})
export class ObservationConventionalComponent {
  contentToChange: string = '';
  selectedTitle: string = '';
  selectedSubtitle: string = '';
  selectedContent: string = '';
  sectionOPC8: boolean = false;
  sectionOPC9: boolean = false;
  sectionOPC10: boolean = false;

  sectionOPCResponse8: boolean = false;
  sectionOPCResponse9: boolean = false;
  sectionOPCResponse10: boolean = false;

  weatherData: WeatherData[] = [];
  selectedIDEMA: string = '0016A';

  constructor(
    private appComponente: AppComponent,
    private location: Location,
    private sharedService: SharedService,
    private http: HttpClient
  ) {}

  // Opciones para el select
  UbicacionList: estacionIDEMA[] = [
    { codigoInterno: '0016A', Ubicacion: 'REUS/AEROPUERTO' },
    { codigoInterno: '0034X', Ubicacion: 'VALLS' },
    { codigoInterno: '0042Y', Ubicacion: 'TARRAGONA FAC. GEOGRAFIA' },
    { codigoInterno: '0061X', Ubicacion: 'PONTONS' },
    { codigoInterno: '0066X', Ubicacion: 'VILAFRANCA DEL PENEDÈS' },
    { codigoInterno: '0073X', Ubicacion: 'SITGES-VALLCARCA' },
    { codigoInterno: '0076', Ubicacion: 'BARCELONA/AEROPUERTO' },
    { codigoInterno: '0092X', Ubicacion: 'BERGA INSTITUTO' },
    { codigoInterno: '0106X', Ubicacion: 'BALSARENY' },
    { codigoInterno: '0114X', Ubicacion: 'PRATS DE LLUÇANÈS' },
    { codigoInterno: '0120X', Ubicacion: 'MOIÀ' },
    { codigoInterno: '0149X', Ubicacion: 'MANRESA' },
    { codigoInterno: '0158X', Ubicacion: 'MONTSERRAT' },
    { codigoInterno: '0171X', Ubicacion: 'IGUALADA' },
    { codigoInterno: '0194D', Ubicacion: 'CORBERA PIC D?AGULLES' },
    { codigoInterno: '0201D', Ubicacion: 'BARCELONA CMT' },
    { codigoInterno: '0201X', Ubicacion: 'BARCELONA DRASSANES' },
    { codigoInterno: '0222X', Ubicacion: 'CALDES DE MONTBUI' },
    { codigoInterno: '0244X', Ubicacion: 'VILASSAR DE DALT' },
    { codigoInterno: '0252D', Ubicacion: 'ARENYS DE MAR' },
    { codigoInterno: '0260X', Ubicacion: 'FONTMARTINA' },
    { codigoInterno: '0281Y', Ubicacion: 'BLANES JARDIN BOTANICO' },
    { codigoInterno: '0284X', Ubicacion: 'CASTELL PLATJA D?ARO' },
    { codigoInterno: '0312X', Ubicacion: 'SANT PAU DE SEGURIES' },
    { codigoInterno: '0320I', Ubicacion: 'PLANOLES' },
    { codigoInterno: '0324A', Ubicacion: 'RIPOLL' },
    { codigoInterno: '0360X', Ubicacion: 'LES PLANES D?HOSTOLES' },
    { codigoInterno: '0363X', Ubicacion: 'SANT HILARI' },
    { codigoInterno: '0367', Ubicacion: 'GIRONA/COSTA BRAVA' },
    { codigoInterno: '0370E', Ubicacion: 'GIRONA-PARC MIGDIA' },
    { codigoInterno: '0372C', Ubicacion: 'PORQUERES' },
    { codigoInterno: '0385X', Ubicacion: 'L?ESTARTIT' },
    { codigoInterno: '0394X', Ubicacion: 'VALL DE BIANYA' },
    { codigoInterno: '0411X', Ubicacion: 'CASTELLO D?EMPURIES' },
    { codigoInterno: '0413A', Ubicacion: 'MAÇANET DE CABRENYS' },
    { codigoInterno: '0421X', Ubicacion: 'ESPOLLA LES ALBERES' },
    { codigoInterno: '0433D', Ubicacion: 'EVC_CABO DE CREUS' },
    { codigoInterno: '1002Y', Ubicacion: 'BAZTÁN IRURITA' },
    { codigoInterno: '1010X', Ubicacion: 'BERA' },
    { codigoInterno: '1012P', Ubicacion: 'IRUN' },
    { codigoInterno: '1014A', Ubicacion: 'DONOSTIA/SAN SEBASTIÁN AEROPUERTO' },
    { codigoInterno: '1021X', Ubicacion: 'ERRENTERIA AÑARBE' },
    { codigoInterno: '1025A', Ubicacion: 'SEGURA' },
    { codigoInterno: '1025X', Ubicacion: 'BEASAIN ARRIARAN' },
    { codigoInterno: '1026X', Ubicacion: 'ORDIZIA' },
    { codigoInterno: '1033X', Ubicacion: 'ARESO' },
    { codigoInterno: '1037X', Ubicacion: 'LEGAZPI' },
    { codigoInterno: '1037Y', Ubicacion: 'ZUMARRAGA' },
    { codigoInterno: '1038X', Ubicacion: 'AZPEITIA' },
    { codigoInterno: '1041A', Ubicacion: 'ZUMAIA' },
    { codigoInterno: '1044X', Ubicacion: 'ARAMAIO ETXAGUEN' },
    { codigoInterno: '1048X', Ubicacion: 'ARETXABALETA' },
    { codigoInterno: '1049N', Ubicacion: 'ELGETA' },
    { codigoInterno: '1050J', Ubicacion: 'ELGOIBAR' },
    { codigoInterno: '1052A', Ubicacion: 'MUTRIKU' },
    { codigoInterno: '1056K', Ubicacion: 'FORUA' },
    { codigoInterno: '1057B', Ubicacion: 'MATXITXAKO' },
    { codigoInterno: '1059X', Ubicacion: 'PUNTA GALEA' },
    { codigoInterno: '1060X', Ubicacion: 'AMURRIO' },
    { codigoInterno: '1064L', Ubicacion: 'OROZKO IBARRA' },
    { codigoInterno: '1069Y', Ubicacion: 'ABADIÑO URKIOLA' },
    { codigoInterno: '1074C', Ubicacion: 'AMOREBIETA-ETXANO' },
    { codigoInterno: '1078C', Ubicacion: 'BALMASEDA' },
    { codigoInterno: '1078I', Ubicacion: 'GÜEÑES' },
    { codigoInterno: '1082', Ubicacion: 'BILBAO AEROPUERTO' },
    { codigoInterno: '1083B', Ubicacion: 'SOPUERTA' },
    { codigoInterno: '1083L', Ubicacion: 'CASTRO URDIALES-EDAR' },
    { codigoInterno: '1089U', Ubicacion: 'RAMALES DE LA VICTORIA-ETAP' },
    { codigoInterno: '1096X', Ubicacion: 'TRETO' },
    { codigoInterno: '1103X', Ubicacion: 'SAN ROQUE DE RIOMERA-CARACOL' },
    { codigoInterno: '1109X', Ubicacion: 'SANTANDER AEROPUERTO' },
    { codigoInterno: '1111X', Ubicacion: 'SANTANDER CMT' },
    { codigoInterno: '1124E', Ubicacion: 'VILLACARRIEDO - SANTIBAÑEZ' },
    { codigoInterno: '1135C', Ubicacion: 'BÁRCENA MAYOR-TORIZ' },
    { codigoInterno: '1152C', Ubicacion: 'SAN FELICES DE BUELNA-TARRIBA' },



  ];

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;
    if (this.contentToChange === 'opcion8') {
      this.sectionOPC8 = true;
      this.selectedTitle = 'Datos de observación. ';
      this.selectedSubtitle = 'Tiempo actual. ';
      this.selectedContent =
        'Datos de observación horarios de las últimas 24 horas todas las estaciones meteorológicas de las que se han recibido datos en ese período. Frecuencia de actualización: continuamente.';
    } else if (this.contentToChange === 'opcion9') {
      this.sectionOPC9 = true;
      this.selectedTitle = 'Datos de observación. ';
      this.selectedSubtitle = 'Tiempo actual. ';
      this.selectedContent =
        'Datos de observación horarios de las últimas 24 horas de la estación meterológica que se pasa como parámetro (idema). Frecuencia de actualización: continuamente.';

    } else if (this.contentToChange === 'opcion10') {
      this.sectionOPC10 = true;
    } else {
      this.goBack();
    }
  }

  callToApis(opc: number) {
    const apiKey = environment.apiKey;
    switch (opc) {
      case 1:
        const apiUrl1 = `https://opendata.aemet.es/opendata/api/observacion/convencional/todas?api_key=${apiKey}`;
        this.http.get(apiUrl1).subscribe((data:any) => {
          if (data && data.datos) {
            const dataUrl = data.datos;
            console.log("dataURL: ", dataUrl);
            this.http.get<WeatherData[]>(dataUrl).subscribe((response: any[]) => {
              if (response && Array.isArray(response)) {
                this.weatherData = response as WeatherData[];
                this.sectionOPCResponse8 = true;

              }
            });
          }
        });
        break;

      case 2: // Llamada a la segunda API
        const apiUrl2 = `https://api.example.com/api2?api_key=${apiKey}`;
        this.http.get(apiUrl2).subscribe((data) => {
          // Maneja la respuesta de la API 2 aquí
        });
        break;

      case 3: // Llamada a la tercera API, y así sucesivamente
        const apiUrl3 = `https://api.example.com/api3?api_key=${apiKey}`;
        this.http.get(apiUrl3).subscribe((data) => {
          // Maneja la respuesta de la API 3 aquí
        });
        break;

      // Agrega más casos según las opciones que necesites
      default:
        break;
    }
  }

  formatDate(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
