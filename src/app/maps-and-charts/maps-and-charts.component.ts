import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, delay, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

interface dayCode {
  code: string;
  day: string;
}

interface ambito {
  code: string;
  ambito: string;
}

@Component({
  selector: 'app-maps-and-charts',
  templateUrl: './maps-and-charts.component.html',
  styleUrls: ['./maps-and-charts.component.css'],
})
export class MapsAndChartsComponent {
  contentToChange: string = '';

  selectedTitle: string = '';
  selectedSubtitle: string = '';
  selectedContent: string = '';

  sectionOPC20: boolean = false;
  sectionOPCResponse20: boolean = false;
  sectionOPC21: boolean = false;
  sectionOPCResponse21: boolean = false;

  imgRoute: string = '';

  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  selectedDate: Date = new Date();
  selectedDateFormat: string = '';

  diaCodigo: dayCode[] = [
    { code: 'a', day: 'D+0 (00-12)' },
    { code: 'b', day: 'D+0 (12-24)' },
    { code: 'v', day: 'D+1 (00-12)' },
    { code: 'd', day: 'D+1 (12-24)' },
    { code: 'e', day: 'D+2 (00-12)' },
    { code: 'f', day: 'D+2 (12-24)' },
  ];

  ambit: ambito[] = [
    { code: 'esp', ambito: 'España' },
    { code: 'and', ambito: 'Andalucía' },
    { code: 'arn', ambito: 'Aragón' },
    { code: 'ast', ambito: 'Asturias' },
    { code: 'bal', ambito: 'Ballears, Illes' },
    { code: 'coo', ambito: 'Canarias' },
    { code: 'can', ambito: 'Cantabria' },
    { code: 'cle', ambito: 'Castilla y Leon' },
    { code: 'clm', ambito: 'Castilla - La Mancha' },
    { code: 'cat', ambito: 'Cataluña' },
    { code: 'val', ambito: 'Comunitat Valenciana' },
    { code: 'ext', ambito: 'Extremadura' },
    { code: 'gal', ambito: 'Galicia' },
    { code: 'mad', ambito: 'Madrid, Comunidad de' },
    { code: 'mur', ambito: 'Murcia, Región de' },
    { code: 'nav', ambito: 'Navarra, Comunidad Foral de' },
    { code: 'pva', ambito: 'País Vasco' },
    { code: 'rio', ambito: 'Rioja, La' },
  ];

  ambiiiito: string = 'esp';
  diiia: string = 'a';

  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;

    console.log('this.contentToChange: ', this.contentToChange);

    if (this.contentToChange === 'opcion20') {
      this.loading = true;
      this.sectionOPC20 = true;
      this.selectedTitle = ' Mapas de análisis. Última pasada. ';
      this.selectedSubtitle =
        'Estos mapas muestran la configuración de la presión en superficie usando isobaras (lineas de igual presión), áreas de alta (A, a) y baja (B, b) presión y los frentes en Europa y el Atlántico Norte.El mapa de análisis presenta el estado de la atmósfera a la hora correspondiente y los fenómenos más relevantes observados en España. Periodicidad de actualización: cada 12 horas (00, 12). ';
      this.selectedContent =
        'Estos mapas muestran la configuración de la presión en superficie usando isobaras (lineas de igual presión), áreas de alta (A, a) y baja (B, b) presión y los frentes en Europa y el Atlántico Norte.El mapa de análisis presenta el estado de la atmósfera a la hora correspondiente y los fenómenos más relevantes observados en España. Periodicidad de actualización: cada 12 horas (00, 12). ';
      this.callToApiOPC20()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.imgRoute = data.datos;
            this.loading = false;
            this.sectionOPCResponse20 = true;
          },
          (error) => {
            console.error('Error al obtener los datos de la API:', error);
          }
        );
    } else if (this.contentToChange === 'opcion21') {
      this.loading = true;
      this.sectionOPC21 = true;
      this.selectedTitle = ' Temperatura del agua del mar. ';
      this.selectedSubtitle =
        'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días. ';
      this.selectedContent =
        'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días. ';

      // this.callToApiOPC21().pipe(takeUntil(this.destroy$)).subscribe(
      //   (data: any) => {
      //     this.imgRoute = data.datos;
      //     this.loading = false;
      //     this.sectionOPCResponse21 = true;
      //   },
      //   (error) => {
      //     console.error('Error al obtener los datos de la API:', error);
      //   }
      // );
    }
  }

  callToApiOPC20(): Observable<any> {
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/mapasygraficos/analisis?api_key=${apiKey}`;

    return this.http.get(apiUrl).pipe(
      tap((response: any) => {
        console.log('response: ', response);
        if (response && response.datos) {
          const dataUrl = response.datos;
          return this.http.get(dataUrl);
        } else {
          throw new Error(
            'La respuesta de la API no contiene el campo "datos".'
          );
        }
      }),
      delay(5000),
      catchError((error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
        throw error;
      })
    );
  }

  callToApiOPC21(): void  {
    const apiKey = environment.apiKey;
    this.selectedDate = new Date(this.selectedDate);
    console.log('selectedDate1: ', this.selectedDate);
    
    if (this.selectedDate instanceof Date) {
      const year = this.selectedDate.getFullYear();
      const month = this.selectedDate.getMonth() + 1;
      const day = this.selectedDate.getDate();
      
      const monthFormatted = month < 10 ? `0${month}` : month.toString();
      const dayFormatted = day < 10 ? `0${day}` : day.toString();
      const dateString = `${year}-${monthFormatted}-${dayFormatted}`;
      console.log('dateString: ', dateString);
      console.log('ambiiiito: ', this.ambiiiito);
      console.log('diiia: ', this.diiia);
      
      const apiUrl = `https://opendata.aemet.es/opendata/api/mapasygraficos/mapassignificativos/fecha/${dateString}/${this.ambiiiito}/${this.diiia}?api_key=${apiKey}`;
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

    } else {
      console.error('selectedDate no es una instancia de Date', this.selectedDate);
    }


  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
