import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import * as XLSX from 'xlsx';

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

  selectedDate: string = '';
  selectedDate2: string = '';

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

  onProvinceChange() {
    const selectedRegion = this.regionList.find(
      (region) => region.codigoProvince === this.selectedProvince
    );

    if (selectedRegion) {
      this.selectedRegion = selectedRegion.codigoProvince;
    }

    this.loadExcelData();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}UTC`;
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }
}
