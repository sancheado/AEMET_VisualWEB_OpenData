import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import {
  ModulosEnum, Options, opcionesGrupo1, opcionesGrupo2, opcionesGrupo3, opcionesGrupo4, opcionesGrupo5,
  opcionesGrupo6, opcionesGrupo7, opcionesGrupo8, opcionesGrupo9, opcionesGrupo10, opcionesGrupo11,
  opcionesGrupo12, opcionesGrupo13, opcionesGrupo14, opcionesGrupo15
} from './app-constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  @ViewChild('headerSection') headerSection!: ElementRef;
  @ViewChild('lblSelectorPag') lblSelectorPag!: ElementRef;
  @ViewChild('sectionBody') sectionBody!: ElementRef;

  title = 'AEMET VisualWEB OpenData';

  opcionesGrupo1 = opcionesGrupo1;
  opcionesGrupo2 = opcionesGrupo2;
  opcionesGrupo3 = opcionesGrupo3;
  opcionesGrupo4 = opcionesGrupo4;
  opcionesGrupo5 = opcionesGrupo5;
  opcionesGrupo6 = opcionesGrupo6;
  opcionesGrupo7 = opcionesGrupo7;
  opcionesGrupo8 = opcionesGrupo8;
  opcionesGrupo9 = opcionesGrupo9;
  opcionesGrupo10 = opcionesGrupo10;
  opcionesGrupo11 = opcionesGrupo11;
  opcionesGrupo12 = opcionesGrupo12;
  opcionesGrupo13 = opcionesGrupo13;
  opcionesGrupo14 = opcionesGrupo14;
  opcionesGrupo15 = opcionesGrupo15;






  modulosEnum = ModulosEnum;
  modulos: { key: string, value: string }[];

  opt1 = true;
  specificPredictions = false;
  opt2 = false;
  observationConvetional = false;
  opt3 = false;
  climaticValues = false;
  opt4 = false;
  satelitteInformation = false;
  opt5 = false;
  mapsCharts = false;
  opt6 = false;
  opt7 = false;
  climatologicProduct = false;
  opt8 = false;
  opt9 = false;
  opt10 = false;
  opt11 = false;
  opt12 = false;
  opt13 = false;
  opt14 = false;
  opt15 = false;


  options: Options[] = [];
  selectedOption: Options = this.opcionesGrupo1[0];
  selectedSection = 'Predicciones Especificas';
  selectedOption2: string = 'opcion1';
  changeStyle: boolean = false;

  // Variables for pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private router: Router, private sharedService: SharedService,) {
    this.modulos = Object.keys(this.modulosEnum)
      .filter(key => isNaN(Number(key))) // Filtrar las claves numéricas
      .map(key => ({ key, value: this.modulosEnum[key as keyof typeof ModulosEnum] }));
  }

  modulosKeys() {
    return Object.keys(this.modulosEnum);
  }

  onSectionChange() {
    console.log(this.selectedSection);
    this.resetOptions();
    switch (this.selectedSection) {
      case ModulosEnum.PrediccionesEspecificas:
        this.opt1 = true;
        break;
      case ModulosEnum.ObservacionConvencional:
        this.opt2 = true;
        break;
      case ModulosEnum.ValoresClimatologicos:
        this.opt3 = true;
        break;
      case ModulosEnum.InformacionSatelite:
        this.opt4 = true;
        break;
      case ModulosEnum.MapasYGraficos:
        this.opt5 = true;
        break;
      case ModulosEnum.Maestro:
        this.opt6 = true;
        break;
      case ModulosEnum.ProductosClimatologicos:
        this.opt7 = true;
        break;
      case ModulosEnum.PrediccionMaritima:
        this.opt8 = true;
        break;
      case ModulosEnum.RedesEspeciales:
        this.opt9 = true;
        break;
      case ModulosEnum.RedRayos:
        this.opt10 = true;
        break;
      case ModulosEnum.IndicesIncendios:
        this.opt11 = true;
        break;
      case ModulosEnum.PrediccionesNormalizadasTexto:
        this.opt12 = true;
        break;
      case ModulosEnum.RedRadares:
        this.opt13 = true;
        break;
      case ModulosEnum.Avisos:
        this.opt14 = true;
        break;
      case ModulosEnum.Antartida:
        this.opt15 = true;
        break;
    }
  }

  resetOptions(): void {
    this.opt1 = false;
    this.opt2 = false;
    this.opt3 = false;
    this.opt4 = false;
    this.opt5 = false;
    this.opt6 = false;
    this.opt7 = false;
    this.opt8 = false;
    this.opt9 = false;
    this.opt10 = false;
    this.opt11 = false;
    this.opt12 = false;
    this.opt13 = false;
    this.opt14 = false;
    this.opt15 = false;
    this.specificPredictions = false;
    this.observationConvetional = false;
    this.climatologicProduct = false;
  }

  onOptionChange(): void {
    this.sharedService.contentToChange = this.selectedOption.value;
  }

  nextStep(opcSeleccionada: string) {
    if (['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5', 'opcion6', 'opcion7'].includes(opcSeleccionada)) {
      this.specificPredictions = true;
      this.opt1 = false;
    } else if (['opcion8', 'opcion9', 'opcion10'].includes(opcSeleccionada)) {
      this.observationConvetional = true;
      this.opt2 = false;
    } else if (['opcion11', 'opcion12', 'opcion13', 'opcion14', 'opcion15', 'opcion16', 'opcion17'].includes(opcSeleccionada)) {
      this.climaticValues = true;
      this.opt3 = false;
    } else if (['opcion18', 'opcion19'].includes(opcSeleccionada)) {
      this.satelitteInformation = true;
      this.opt4 = false;
    } else if (['opcion20', 'opcion21'].includes(opcSeleccionada)) {
      this.mapsCharts = true;
      this.opt5 = false;
    } else if (['opcion26', 'opcion27', 'opcion26'].includes(opcSeleccionada)) {
      this.climatologicProduct = true;
      this.opt7 = false;
    }
    this.selectedOption2 = opcSeleccionada;
    console.log("nextStep: ", this.selectedOption2);
  }

  // Pagination functions
  get paginatedOptions(): Options[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.opcionesGrupo12.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.opcionesGrupo12.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goBack(opc: string) {
    this.resetOptions();
    switch (opc) {
      case 'opcion1':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion2':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion3':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion4':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion5':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion6':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion7':
        this.opt1 = true;
        this.specificPredictions = false;
        break;
      case 'opcion8':
        this.opt2 = true;
        this.observationConvetional = false;
        break;
      case 'opcion9':
        this.opt2 = true;
        this.observationConvetional = false;
        break;
      case 'opcion10':
        this.opt2 = true;
        this.observationConvetional = false;
        break;
      case 'opcion11':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion12':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion13':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion14':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion15':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion16':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion17':
        this.opt3 = true;
        this.climatologicProduct = false;
        break;
      case 'opcion19':
        this.opt4 = true;
        this.satelitteInformation = false;
        break;
      case 'opcion20':
        this.opt5 = true;
        this.mapsCharts = false;
        break;
      case 'opcion21':
        this.opt5 = true;
        this.mapsCharts = false;
        break;
      default:
        this.opt1 = true;
        this.specificPredictions = false;
        break;
    }

  }
}