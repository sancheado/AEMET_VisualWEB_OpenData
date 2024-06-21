import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { catchError, delay, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'module-satellite-information',
  templateUrl: './satellite-information.component.html',
  styleUrls: ['./satellite-information.component.css']
})
export class SatelliteInformationComponent {
  @Input() data: any;
  contentToChange: string = '';

  selectedTitle: string = '';
  selectedSubtitle: string = '';
  selectedContent: string = '';


  sectionOPC18: boolean = false;
  sectionOPCResponse18: boolean = false;
  sectionOPC19: boolean = false;
  sectionOPCResponse19: boolean = false;

  imgRoute: string = '';

  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.data;
    // this.contentToChange = this.sharedService.contentToChange;

    if (this.contentToChange === 'opcion18') {
      this.loading = true;
      this.sectionOPC18 = true;
      this.selectedTitle = ' Índice normalizado de vegetación. ';
      this.selectedSubtitle = 'Esta imagen se realiza con una combinación de los datos del canal visible y del infrarrojo cercano del satélite NOAA-19, que nos da una idea del desarrollo de la vegetación. Esto es así debido a que la vegetación absorbe fuertemente la radiación del canal visible, pero refleja fuertemente la del infrarrojo cercano. Esta imagen se renueva los jueves a última hora y contiene los datos acumulados de la última semana. ';
      this.selectedContent =
        'Esta imagen se realiza con una combinación de los datos del canal visible y del infrarrojo cercano del satélite NOAA-19, que nos da una idea del desarrollo de la vegetación. Esto es así debido a que la vegetación absorbe fuertemente la radiación del canal visible, pero refleja fuertemente la del infrarrojo cercano. Esta imagen se renueva los jueves a última hora y contiene los datos acumulados de la última semana. ';
      this.callToApiOPC18().pipe(takeUntil(this.destroy$)).subscribe(
        (data: any) => {
          this.imgRoute = data.datos;
          this.loading = false;
          this.sectionOPCResponse18 = true;
        },
        (error) => {
          console.error('Error al obtener los datos de la API:', error);
        }
      );
    }
    else if (this.contentToChange === 'opcion19') {
      this.loading = true;
      this.sectionOPC19 = true;
      this.selectedTitle = ' Temperatura del agua del mar. ';
      this.selectedSubtitle = 'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días. ';
      this.selectedContent =
        'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días. ';

      this.callToApiOPC19().pipe(takeUntil(this.destroy$)).subscribe(
        (data: any) => {
          this.imgRoute = data.datos;
          this.loading = false;
          this.sectionOPCResponse19 = true;
        },
        (error) => {
          console.error('Error al obtener los datos de la API:', error);
        }
      );
    }
  }

  callToApiOPC18(): Observable<any> {
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/satelites/producto/nvdi?api_key=${apiKey}`;

    return this.http.get(apiUrl).pipe(
      tap((response: any) => {
        console.log("response: ", response);
        if (response && response.datos) {
          const dataUrl = response.datos;
          return this.http.get(dataUrl);
        } else {
          throw new Error('La respuesta de la API no contiene el campo "datos".');
        }
      }),
      delay(5000),
      catchError((error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
        throw error;
      })
    );

  }

  callToApiOPC19(): Observable<any> {
    const apiKey = environment.apiKey;
    const apiUrl = `https://opendata.aemet.es/opendata/api/satelites/producto/sst?api_key=${apiKey}`;

    return this.http.get(apiUrl).pipe(
      tap((response: any) => {
        if (response && response.datos) {
          const dataUrl = response.datos;
          return this.http.get(dataUrl);
        } else {
          throw new Error('La respuesta de la API no contiene el campo "datos".');
        }
      }),
      delay(5000),
      catchError((error) => {
        console.error('Error al obtener la URL de los datos de la API:', error);
        throw error;
      })
    );
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
