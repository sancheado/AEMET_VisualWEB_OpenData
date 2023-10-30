import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  contentToChange: string = '';

  selectedTitle: string = '';
  selectedSubtitle: string = '';
  selectedContent: string = '';
  

  sectionOPC22: boolean = false;
  sectionOPCResponse22: boolean = false;
  sectionOPC23: boolean = false;
  sectionOPCResponse23: boolean = false;

  imgRoute: string = '';

  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private appComponente: AppComponent,
    private sharedService: SharedService,
    private location: Location,
    private http: HttpClient,
  ) {}
  
  ngOnInit(): void {
    this.appComponente.changeStyle = true;
    this.contentToChange = this.sharedService.contentToChange;

    console.log("this.contentToChange: ", this.contentToChange);
    
    if (this.contentToChange === 'opcion22') {
      this.loading = true;
      this.sectionOPC22 = true;
      this.selectedTitle = ' Mapas de análisis. Última pasada. ';
      this.selectedSubtitle = 'Estos mapas muestran la configuración de la presión en superficie usando isobaras (lineas de igual presión), áreas de alta (A, a) y baja (B, b) presión y los frentes en Europa y el Atlántico Norte.El mapa de análisis presenta el estado de la atmósfera a la hora correspondiente y los fenómenos más relevantes observados en España. Periodicidad de actualización: cada 12 horas (00, 12). ';
      this.selectedContent =
        'Estos mapas muestran la configuración de la presión en superficie usando isobaras (lineas de igual presión), áreas de alta (A, a) y baja (B, b) presión y los frentes en Europa y el Atlántico Norte.El mapa de análisis presenta el estado de la atmósfera a la hora correspondiente y los fenómenos más relevantes observados en España. Periodicidad de actualización: cada 12 horas (00, 12). ';
        // this.callToApiOPC22().pipe(takeUntil(this.destroy$)).subscribe(
        //   (data: any) => {
        //     this.imgRoute = data.datos;          
        //     this.loading = false;
        //     this.sectionOPCResponse22 = true;
        //   },
        //   (error) => {
        //     console.error('Error al obtener los datos de la API:', error);
        //   }
        // );
    }
    else if(this.contentToChange === 'opcion23'){
      this.loading = true;
      this.sectionOPC23 = true;
      this.selectedTitle = ' Temperatura del agua del mar. ';
      this.selectedSubtitle = 'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días. ';
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
}
