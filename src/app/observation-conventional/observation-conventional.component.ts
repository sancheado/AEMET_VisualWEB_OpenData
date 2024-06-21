import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../WeatherData';
import { ObservationData } from '../ObservationData';

interface selectedOption {
  title: string;
  subtitle: string;
  content: string;
}
interface estacionIDEMA {
  codigoInterno: string;
  Ubicacion: string;
}

interface tipoMensaje {
  codigo: string;
  tipo: string;
}

@Component({
  selector: 'app-observation-conventional',
  templateUrl: './observation-conventional.component.html',
  styleUrls: ['./observation-conventional.component.css'],
})
export class ObservationConventionalComponent implements OnInit {
  @Input() data: any;


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
  selectedIDEMA: string = '1719';
  processedDataArray: any[] | undefined;
  observationData: ObservationData[] = [];

  selectedTipo: string = 'climat';

  constructor(
    private appComponente: AppComponent,
    private location: Location,
    private sharedService: SharedService,
    private http: HttpClient
  ) { }

  UbicacionList: estacionIDEMA[] = [
    { codigoInterno: '1719', Ubicacion: 'A CAÑIZA' },
    { codigoInterno: '1387', Ubicacion: 'A CORUÑA' },
    { codigoInterno: '1387E', Ubicacion: 'A CORUÑA/ALVEDRO' },
    { codigoInterno: '1468X', Ubicacion: 'A ESTRADA' },
    { codigoInterno: '1489A', Ubicacion: 'A LAMA' },
    { codigoInterno: '1069Y', Ubicacion: 'ABADIÑO  URKIOLA' },
    { codigoInterno: '7250C', Ubicacion: 'ABANILLA' },
    { codigoInterno: '4210Y', Ubicacion: 'ABENOJAR (AUTOMATICA)' },
    { codigoInterno: '4070Y', Ubicacion: 'ABIA DE OBISPALIA' },
    { codigoInterno: '6302A', Ubicacion: 'ABLA' },
    { codigoInterno: 'C419X', Ubicacion: 'ADEJE-CALDERA B' },
    { codigoInterno: '8381X', Ubicacion: 'ADEMUZ' },
    { codigoInterno: 'C668V', Ubicacion: 'AGAETE - SUERTE ALTA' },
    { codigoInterno: 'C619X', Ubicacion: 'AGAETE-CASCO' },
    { codigoInterno: '2978X', Ubicacion: 'AGUAS DE CABREIROA' },
    { codigoInterno: '5624X', Ubicacion: 'AGUILAR (LAGUNA ZOÑAR AUTOMATICA)' },
    { codigoInterno: '2243A', Ubicacion: 'AGUILAR DE CAMPOO' },
    { codigoInterno: '7002Y', Ubicacion: 'ÁGUILAS' },
    { codigoInterno: 'C648C', Ubicacion: 'AGÜIMES-EL MILANO' },
    { codigoInterno: 'C317B', Ubicacion: 'AGULO-JUEGO BOLAS' },
    { codigoInterno: '9073X', Ubicacion: 'AGURAIN/SALVATIERRA  OPAKUA' },
    {
      codigoInterno: '9808X',
      Ubicacion: 'AÍNSA-SOBRARBE  LA SERRETA-DEPÓSITO',
    },
    { codigoInterno: '4560Y', Ubicacion: 'ALAJAR  CABEZO MOLINOS' },
    { codigoInterno: '8178D', Ubicacion: 'ALBACETE OBS.' },
    { codigoInterno: '8175', Ubicacion: 'ALBACETE/LOS LLANOS' },
    { codigoInterno: '8354X', Ubicacion: 'ALBARRACÍN' },
    { codigoInterno: '4089A', Ubicacion: 'ALBERCA DE ZANCARA' },
    { codigoInterno: '6364X', Ubicacion: 'ALBOX' },
    { codigoInterno: '4464X', Ubicacion: 'ALBURQUERQUE' },
    { codigoInterno: '3170Y', Ubicacion: 'ALCALA DE HENARES-ENCÍN' },
    { codigoInterno: '2966D', Ubicacion: 'ALCAÑICES-VIVINERA' },
    { codigoInterno: '9573X', Ubicacion: 'ALCAÑIZ' },
    { codigoInterno: '4064Y', Ubicacion: 'ALCAZAR DE SAN JUAN' },
    { codigoInterno: '4051Y', Ubicacion: 'ALCÁZAR DEL REY' },
    { codigoInterno: '4489X', Ubicacion: 'ALCONCHEL (AUTOMATICA)' },
    {
      codigoInterno: '4195E',
      Ubicacion: 'ALCORNOQUERA  PARQUE NACIONAL CABAÑEROS',
    },
    { codigoInterno: '8059C', Ubicacion: 'ALCOY' },
    { codigoInterno: '4411C', Ubicacion: 'ALCUESCAR' },
    { codigoInterno: '2140A', Ubicacion: 'ALDEANUEVA DE SERREZUELA-EL CERRO' },
    { codigoInterno: '9293X', Ubicacion: 'ALFARO  LA PLANA - DEPÓSITO' },
    { codigoInterno: '6201X', Ubicacion: 'ALGARROBO (LA MAYORA - AUTOMATICA)' },
    { codigoInterno: '7227X', Ubicacion: 'ALHAMA (COMARZA - AUT.)' },
    { codigoInterno: '9354X', Ubicacion: 'ALHAMA DE ARAGÓN  DEPÓSITO' },
    { codigoInterno: '8025', Ubicacion: 'ALICANTE' },
    { codigoInterno: '8019', Ubicacion: 'ALICANTE-ELCHE/AEROPUERTO' },
    { codigoInterno: '3562X', Ubicacion: 'ALISEDA  LA UMBRÍA' },
    { codigoInterno: '1706A', Ubicacion: 'ALLARIZ-RIMELO' },
    {
      codigoInterno: '5733X',
      Ubicacion: 'ALMADEN PLATA (LAS NAVAS AUTOMATICA)',
    },
    { codigoInterno: '4116I', Ubicacion: 'ALMAGRO/FAMET' },
    { codigoInterno: '8198Y', Ubicacion: 'ALMANSA' },
    { codigoInterno: '9352A', Ubicacion: 'ALMAZUL' },
    { codigoInterno: '4436Y', Ubicacion: 'ALMENDRALEJO' },
    { codigoInterno: '6325O', Ubicacion: 'ALMERÍA/AEROPUERTO' },
    { codigoInterno: '5858X', Ubicacion: 'ALMONTE  DOÑANA ' },
    { codigoInterno: '9491X', Ubicacion: 'ALMUDÉVAR' },
    { codigoInterno: '6127X', Ubicacion: 'ÁLORA  LAS PELONAS' },
    { codigoInterno: '4589X', Ubicacion: 'ALOSNO  THARSIS-MINAS ' },
    { codigoInterno: '6045X', Ubicacion: 'ALPANDEIRE' },
    { codigoInterno: '3268C', Ubicacion: 'ALPEDRETE' },
    { codigoInterno: '1740', Ubicacion: 'ALTAMIRA' },
    { codigoInterno: '9001S', Ubicacion: 'Alto Campoo' },
    { codigoInterno: '3266A', Ubicacion: 'ALTO DE LOS LEONES' },
    { codigoInterno: '1186P', Ubicacion: 'AMIEVA  PANIZALES' },
    { codigoInterno: '1074C', Ubicacion: 'AMOREBIETA-ETXANO' },
    { codigoInterno: '1060X', Ubicacion: 'AMURRIO' },
    { codigoInterno: 'C449F', Ubicacion: 'ANAGA-COL. REP. ARGENTINA' },
    { codigoInterno: '9550C', Ubicacion: 'ANDORRA  HORCALLANA' },
    { codigoInterno: 'B103B', Ubicacion: 'ANDRATX - SANT ELM' },
    { codigoInterno: '5298X', Ubicacion: 'ANDÚJAR' },
    { codigoInterno: '9136X', Ubicacion: 'ANGUIANO  VALVANERA ' },
    { codigoInterno: '6100B', Ubicacion: 'ANTEQUERA' },
    { codigoInterno: '6106X', Ubicacion: 'ANTEQUERA-BOBADILLA' },
    { codigoInterno: 'C248E', Ubicacion: 'ANTIGUA-EL CARBÓN' },
    { codigoInterno: '9208E', Ubicacion: 'ARAGÜÉS DEL PUERTO  DEPÓSITO' },
    { codigoInterno: '1044X', Ubicacion: 'ARAMAIO  ETXAGUEN' },
    { codigoInterno: '2117D', Ubicacion: 'ARANDA DE DUERO' },
    { codigoInterno: '9263X', Ubicacion: 'ARANGUREN  ILUNDAIN' },
    { codigoInterno: '3100B', Ubicacion: 'ARANJUEZ' },
    { codigoInterno: '7158X', Ubicacion: 'ARCHENA' },
    { codigoInterno: '9344C', Ubicacion: 'ARCOS DE JALÓN-COEX' },
    { codigoInterno: '8472A', Ubicacion: 'ARENOS-PANTANO' },
    { codigoInterno: '0252D', Ubicacion: 'ARENYS DE MAR' },
    { codigoInterno: '1033X', Ubicacion: 'ARESO ' },
    { codigoInterno: '1048X', Ubicacion: 'ARETXABALETA' },
    { codigoInterno: '2456B', Ubicacion: 'AREVALO' },
    { codigoInterno: '3182Y', Ubicacion: 'ARGANDA DEL REY' },
    { codigoInterno: 'C428T', Ubicacion: 'ARICO-DEPURADORA LA DEGOLLADA' },
    { codigoInterno: '4527X', Ubicacion: 'AROCHE (MASERA - AUTOMATICA)' },
    { codigoInterno: '5181D', Ubicacion: 'ARROYO DEL OJANCO' },
    { codigoInterno: 'B526X', Ubicacion: 'ARTÀ-MOLI D?EN LEU ' },
    { codigoInterno: '9650X', Ubicacion: 'ARTESA DE SEGRE' },
    { codigoInterno: '9990X', Ubicacion: 'ARTIES' },
    { codigoInterno: 'C669B', Ubicacion: 'ARUCAS-BAÑADEROS' },
    { codigoInterno: 'C316I', Ubicacion: 'ARURE CEMENTERIO' },
    { codigoInterno: '1363X', Ubicacion: 'AS PONTES A AEROSA' },
    { codigoInterno: '2734D', Ubicacion: 'ASTORGA-DEPÓSITO AGUA' },
    { codigoInterno: '9195C', Ubicacion: 'ASTÚN - LA RACA' },
    { codigoInterno: '1212E', Ubicacion: 'ASTURIAS/AVILÉS' },
    { codigoInterno: '8492X', Ubicacion: 'ATZENETA DEL MAESTRAT' },
    { codigoInterno: '2444', Ubicacion: 'ÁVILA' },
    { codigoInterno: '4549Y', Ubicacion: 'AYAMONTE  ISLA CANELA' },
    { codigoInterno: '1038X', Ubicacion: 'AZPEITIA' },
    { codigoInterno: '5473X', Ubicacion: 'AZUAGA (AUTOMATICA)' },
    { codigoInterno: '4478X', Ubicacion: 'BADAJOZ CMT' },
    { codigoInterno: '4452', Ubicacion: 'BADAJOZ/TALAVERA LA REAL' },
    { codigoInterno: '5164B', Ubicacion: 'BAEZA' },
    { codigoInterno: '5281X', Ubicacion: 'BAILÉN' },
    { codigoInterno: '9211F', Ubicacion: 'BAILO PUYALTO' },
    { codigoInterno: '9911X', Ubicacion: 'BALLOBAR  DEPÓSITO' },
    { codigoInterno: '1078C', Ubicacion: 'BALMASEDA' },
    { codigoInterno: '0106X', Ubicacion: 'BALSARENY' },
    { codigoInterno: 'B087X', Ubicacion: 'BANYALBUFAR ' },
    { codigoInterno: '2926B', Ubicacion: 'BAÑOBAREZ' },
    { codigoInterno: '2873X', Ubicacion: 'BARBADILLO' },
    { codigoInterno: '9866C', Ubicacion: 'BARBASTRO' },
    { codigoInterno: '5996B', Ubicacion: 'BARBATE  DEPURADORA' },
    { codigoInterno: '0201X', Ubicacion: 'BARCELONA  DRASSANES' },
    { codigoInterno: '0201D', Ubicacion: 'BARCELONA CMT' },
    { codigoInterno: '0076', Ubicacion: 'BARCELONA/AEROPUERTO' },
    { codigoInterno: '1135C', Ubicacion: 'BÁRCENA MAYOR-TORIZ' },
    { codigoInterno: '2828Y', Ubicacion: 'BARCO DE AVILA' },
    { codigoInterno: '9294E', Ubicacion: 'BARDENAS REALES  BASE AÉREA' },
    { codigoInterno: '1199X', Ubicacion: 'BARGAÉU PILOÑA' },
    { codigoInterno: '2017Y', Ubicacion: 'BARRIOMARTIN-EL ROBLEDO' },
    { codigoInterno: '9744B', Ubicacion: 'BARRUERA' },
    { codigoInterno: '8072Y', Ubicacion: 'BARX' },
    { codigoInterno: '5047E', Ubicacion: 'BAZA  CRUZ ROJA' },
    { codigoInterno: '1002Y', Ubicacion: 'BAZTÁN  IRURITA' },
    { codigoInterno: '1696O', Ubicacion: 'BEARIZ' },
    { codigoInterno: '1025X', Ubicacion: 'BEASAIN  ARRIARAN' },
    { codigoInterno: '1521X', Ubicacion: 'BECERREA-PENAMAIOR' },
    { codigoInterno: '9998X', Ubicacion: 'BELLO' },
    { codigoInterno: '4095Y', Ubicacion: 'BELMONTE' },
    { codigoInterno: '9111', Ubicacion: 'BELORADO' },
    { codigoInterno: '9756X', Ubicacion: 'BENABARRE' },
    {
      codigoInterno: '6069X',
      Ubicacion: 'BENAHAVIS (LA ZAGALETA - AUTOMATICA)',
    },
    { codigoInterno: '5598X', Ubicacion: 'BENAMEJÍ-ALCACHOFARES ALTOS' },
    { codigoInterno: '9838B', Ubicacion: 'BENASQUE' },
    { codigoInterno: '2755X', Ubicacion: 'BENAVENTE' },
    { codigoInterno: '8036Y', Ubicacion: 'BENIDORM (PARC LES FOIETES)' },
    { codigoInterno: '7080X', Ubicacion: 'BENIZAR' },
    { codigoInterno: '1387D', Ubicacion: 'BENS-A CORUÑA' },
    { codigoInterno: '1010X', Ubicacion: 'BERA' },
    { codigoInterno: '0092X', Ubicacion: 'BERGA  INSTITUTO' },
    { codigoInterno: '3040Y', Ubicacion: 'BETETA' },
    { codigoInterno: '8270X', Ubicacion: 'BICORP' },
    { codigoInterno: '9784P', Ubicacion: 'BIELSA' },
    { codigoInterno: '9453X', Ubicacion: 'BIESCAS  EMBALSE DE BÚBAL' },
    { codigoInterno: '1082', Ubicacion: 'BILBAO AEROPUERTO' },
    { codigoInterno: 'B662X', Ubicacion: 'BINISSALEM-SA VINYOTA' },
    { codigoInterno: '0281Y', Ubicacion: 'BLANES JARDIN BOTANICO' },
    { codigoInterno: '2914C', Ubicacion: 'BOADILLA FUENTE SAN ESTEBAN' },
    { codigoInterno: '1442U', Ubicacion: 'BOIRO' },
    { codigoInterno: '9994X', Ubicacion: 'BOSSOST-CENTRAL' },
    { codigoInterno: '3209Y', Ubicacion: 'BRIHUEGA' },
    { codigoInterno: '9031C', Ubicacion: 'BRIVIESCA' },
    { codigoInterno: '3565X', Ubicacion: 'BROZAS (AUTOMATICA)' },
    { codigoInterno: '3110C', Ubicacion: 'BUITRAGO' },
    { codigoInterno: '7127X', Ubicacion: 'BULLAS' },
    { codigoInterno: '1347T', Ubicacion: 'BURELA' },
    { codigoInterno: '2092', Ubicacion: 'BURGO DE OSMA-POZUELOS' },
    { codigoInterno: '2331', Ubicacion: 'BURGOS/VILLAFRÍA' },
    { codigoInterno: '2742R', Ubicacion: 'BUSTILLO DEL PÁRAMO-LAS MATILLAS' },
    { codigoInterno: '9961X', Ubicacion: 'CABACÉS' },
    { codigoInterno: '9689X', Ubicacion: 'CABDELLA-CENTRAL' },
    { codigoInterno: '1283U', Ubicacion: 'CABO BUSTO' },
    { codigoInterno: '6329X', Ubicacion: 'CABO DE GATA  FARO' },
    { codigoInterno: '1210X', Ubicacion: 'CABO PEÑAS' },
    { codigoInterno: '1393', Ubicacion: 'CABO VILAN' },
    { codigoInterno: 'B398A', Ubicacion: 'CABRERA  PARQUE NACIONAL' },
    { codigoInterno: '3469A', Ubicacion: 'CÁCERES' },
    { codigoInterno: '5973', Ubicacion: 'CÁDIZ  OBSERVATORIO' },
    { codigoInterno: '5769X', Ubicacion: 'CALA' },
    { codigoInterno: '9381I', Ubicacion: 'CALAMOCHA' },
    { codigoInterno: '9569A', Ubicacion: 'CALANDA' },
    { codigoInterno: '7121A', Ubicacion: 'CALASPARRA' },
    { codigoInterno: '9394X', Ubicacion: 'CALATAYUD  DEPÓSITO' },
    { codigoInterno: '0222X', Ubicacion: 'CALDES DE MONTBUI' },
    { codigoInterno: '5103F', Ubicacion: 'CAMARATE  PARQUE NACIONAL' },
    { codigoInterno: '9178X', Ubicacion: 'CAMPEZO/KANPEZU' },
    {
      codigoInterno: '2362C',
      Ubicacion: 'CAMPORREDONDO DE ALBA  CUEVA DORADA',
    },
    { codigoInterno: 'B362X', Ubicacion: 'CAMPOS-CAN SION ' },
    { codigoInterno: 'B373X', Ubicacion: 'CAMPOS-SALINES  LEVANT' },
    { codigoInterno: '1279X', Ubicacion: 'CAMUÑO' },
    { codigoInterno: 'C438N', Ubicacion: 'CANDELARIA-DEPOSITO CUEVECITAS' },
    { codigoInterno: '3422D', Ubicacion: 'CANDELEDA (AUTOMATICA)' },
    { codigoInterno: '9198X', Ubicacion: 'CANFRANC' },
    { codigoInterno: '7067Y', Ubicacion: 'CAÑADAS DEL NERPIO' },
    { codigoInterno: 'C406G', Ubicacion: 'CAÑADAS PARADOR' },
    { codigoInterno: '4339X', Ubicacion: 'CAÑAMERO  EL PINAR' },
    { codigoInterno: '3475X', Ubicacion: 'CAÑAVERAL' },
    { codigoInterno: '9590D', Ubicacion: 'CAP DE REC' },
    { codigoInterno: '9988B', Ubicacion: 'CAP DE VAQUEIRA' },
    { codigoInterno: 'B569X', Ubicacion: 'CAPDEPERA-FARO' },
    { codigoInterno: '9855E', Ubicacion: 'CAPELLA  LAGUARRES' },
    { codigoInterno: '7195X', Ubicacion: 'CARAVACA (LOS ROYOS- AUT.)' },
    { codigoInterno: '7119B', Ubicacion: 'CARAVACA FUENTES DEL MARQUÉS' },
    { codigoInterno: '1390X', Ubicacion: 'CARBALLO' },
    { codigoInterno: '6332Y', Ubicacion: 'CARBONERAS - FARO MESA ROLDÁN' },
    { codigoInterno: '8300X', Ubicacion: 'CARCAIXENT' },
    { codigoInterno: '5346X', Ubicacion: 'CARDEÑA (SANTA ELENA - AUTOMATICA)' },
    { codigoInterno: '5702X', Ubicacion: 'CARMONA  VILLEGAS' },
    { codigoInterno: '1179B', Ubicacion: 'CARREÑA DE CABRALES' },
    { codigoInterno: '5835X', Ubicacion: 'CARRION DE LOS CESPEDES' },
    { codigoInterno: '2374X', Ubicacion: 'CARRIÓN DE LOS CONDES' },
    { codigoInterno: '7012C', Ubicacion: 'CARTAGENA' },
    { codigoInterno: '7012D', Ubicacion: 'CARTAGENA - TENTEGORRA' },
    { codigoInterno: '7019X', Ubicacion: 'CARTAGENA/SALINAS CABO PALOS' },
    { codigoInterno: '4554X', Ubicacion: 'CARTAYA   PEMARES ' },
    { codigoInterno: '1476R', Ubicacion: 'CASAS DO PORTO' },
    { codigoInterno: '9245X', Ubicacion: 'CÁSEDA  DEPÓSITO' },
    { codigoInterno: '9574B', Ubicacion: 'CASPE  PLANA DEL PILÓN' },
    { codigoInterno: '9336D', Ubicacion: 'CASTEJÓN DE VALDEJASA  DEPÓSITO' },
    { codigoInterno: '6272X', Ubicacion: 'CASTELL DEL FERRO' },
    { codigoInterno: '0284X', Ubicacion: 'CASTELL PLATJA D?ARO' },
    { codigoInterno: '9563X', Ubicacion: 'CASTELLFORT' },
    { codigoInterno: '0411X', Ubicacion: 'CASTELLO D?EMPURIES' },
    { codigoInterno: '8500A', Ubicacion: 'CASTELLÓN-ALMASSORA' },
    { codigoInterno: '9561X', Ubicacion: 'CASTELLOTE  DEPÓSITO' },
    { codigoInterno: '3362Y', Ubicacion: 'CASTILLO BAYUELA' },
    { codigoInterno: '1083L', Ubicacion: 'CASTRO URDIALES-EDAR' },
    { codigoInterno: '1331A', Ubicacion: 'CASTROPOL' },
    { codigoInterno: '4325Y', Ubicacion: 'CASTUERA' },
    { codigoInterno: '5704B', Ubicacion: 'CAZALLA DE LA SIERRA' },
    { codigoInterno: '5038Y', Ubicacion: 'CAZORLA (AUTOMATICA)' },
    { codigoInterno: '3337U', Ubicacion: 'CEBREROS' },
    { codigoInterno: '8458X', Ubicacion: 'CEDRILLAS  ANTENAS' },
    { codigoInterno: '9145Y', Ubicacion: 'CENICERO ' },
    { codigoInterno: '9839V', Ubicacion: 'CERLER  COGULLA' },
    { codigoInterno: '1297E', Ubicacion: 'CERVANTES-BAZAL' },
    { codigoInterno: '2235U', Ubicacion: 'CERVERA DE PISUERGA' },
    { codigoInterno: '5000C', Ubicacion: 'CEUTA' },
    { codigoInterno: '1639X', Ubicacion: 'CHANDREXA DE QUEIXA' },
    { codigoInterno: '5406X', Ubicacion: 'CHARILLA' },
    { codigoInterno: '8395X', Ubicacion: 'CHELVA' },
    { codigoInterno: '8177A', Ubicacion: 'CHINCHILLA/CENAD' },
    { codigoInterno: '5906X', Ubicacion: 'CHIPIONA  ECA' },
    { codigoInterno: '7145D', Ubicacion: 'CIEZA  PARQUE DE BOMBEROS' },
    { codigoInterno: '4121', Ubicacion: 'CIUDAD REAL' },
    { codigoInterno: 'B870C', Ubicacion: 'CIUTADELLA-CALA GALDANA' },
    { codigoInterno: 'B860X', Ubicacion: 'CIUTADELLA-SON QUIM ' },
    { codigoInterno: '6143X', Ubicacion: 'COIN (AUTOMATICA)' },
    { codigoInterno: '9638D', Ubicacion: 'COLL DE NARGÓ' },
    { codigoInterno: '3191E', Ubicacion: 'COLMENAR VIEJO/FAMET' },
    { codigoInterno: 'B603X', Ubicacion: 'COLÒNIA SANT PERE-CAN MENGOL' },
    { codigoInterno: '1203D', Ubicacion: 'COLUNGA' },
    { codigoInterno: '0194D', Ubicacion: 'CORBERA  PIC D?AGULLES ' },
    { codigoInterno: '5394X', Ubicacion: 'CORDOBA  EMBALSE DE GUADANUÑO' },
    { codigoInterno: '5429X', Ubicacion: 'CÓRDOBA  PRAGDENA' },
    { codigoInterno: '5402', Ubicacion: 'CÓRDOBA/AEROPUERTO' },
    { codigoInterno: '2565', Ubicacion: 'CORESES' },
    { codigoInterno: '3526X', Ubicacion: 'CORIA' },
    {
      codigoInterno: '1167J',
      Ubicacion: 'CORISCAO  PARQUE NACIONAL PICOS DE EUROPA',
    },
    { codigoInterno: '6040X', Ubicacion: 'CORTES DE LA FRONTERA' },
    { codigoInterno: '2106B', Ubicacion: 'CORUÑA DEL CONDE' },
    { codigoInterno: '9016X', Ubicacion: 'CUBILLO DE EBRO' },
    { codigoInterno: '2192C', Ubicacion: 'CUELLAR' },
    { codigoInterno: '8096', Ubicacion: 'CUENCA' },
    { codigoInterno: '1226X', Ubicacion: 'CUEVAS DE FELECHOSA' },
    { codigoInterno: '9390', Ubicacion: 'DAROCA ' },
    { codigoInterno: '1302F', Ubicacion: 'DEGAÑA  COTO CORTÉS' },
    { codigoInterno: '5107D', Ubicacion: 'DÓLAR' },
    { codigoInterno: '4358X', Ubicacion: 'DON BENITO' },
    { codigoInterno: '1014A', Ubicacion: 'DONOSTIA/SAN SEBASTIÁN AEROPUERTO' },
    { codigoInterno: '5427X', Ubicacion: 'DOÑA MENCIA' },
    { codigoInterno: '5641X', Ubicacion: 'ECIJA' },
    { codigoInterno: 'B957', Ubicacion: 'EIVISSA' },
    { codigoInterno: '9321X', Ubicacion: 'EJEA DE LOS CABALLEROS' },
    { codigoInterno: '5860E', Ubicacion: 'EL ARENOSILLO' },
    { codigoInterno: '2945A', Ubicacion: 'EL BODÓN-BASE AEREA' },
    { codigoInterno: '5941X', Ubicacion: 'EL BOSQUE  SAN JOSÉ' },
    { codigoInterno: '4608X', Ubicacion: 'EL CAMPILLO  EL ZUMAJO ' },
    { codigoInterno: '4584X', Ubicacion: 'EL CERRO DE ANDEVALO' },
    {
      codigoInterno: '6291B',
      Ubicacion: 'EL EJIDO (AYUNTAMIENTO - AUTOMATICA)',
    },
    { codigoInterno: '3126Y', Ubicacion: 'EL GOLOSO (AUTOMÁTICA)' },
    {
      codigoInterno: '4541X',
      Ubicacion: 'EL GRANADO (BOCACHANZA - AUTOMÁTICA)',
    },
    { codigoInterno: 'C929I', Ubicacion: 'EL HIERRO/AEROPUERTO' },
    {
      codigoInterno: '2918Y',
      Ubicacion: 'EL MAILLO (BASE AVIONES - AUTOMATICA)',
    },
    { codigoInterno: 'C126A', Ubicacion: 'EL PASO-C.F.' },
    { codigoInterno: '3104Y', Ubicacion: 'EL PAULAR- RASCAFRÍA (AUTOMÁTICA)' },
    { codigoInterno: '2766E', Ubicacion: 'EL PUENTE (CASA FORESTAL)' },
    { codigoInterno: '4193Y', Ubicacion: 'EL ROBLEDO' },
    { codigoInterno: '9775X', Ubicacion: 'EL SOLERÀS' },
    { codigoInterno: '8018X', Ubicacion: 'ELCHE/ALTABIX' },
    { codigoInterno: '1049N', Ubicacion: 'ELGETA' },
    { codigoInterno: '1050J', Ubicacion: 'ELGOIBAR' },
    {
      codigoInterno: '7066Y',
      Ubicacion: 'EMBALSE DE LA FUENSANTA (AUTOMÁTICA)',
    },
    { codigoInterno: '9188', Ubicacion: 'ENCISO  DEPÓSITO' },
    { codigoInterno: '1021X', Ubicacion: 'ERRENTERIA  AÑARBE' },
    { codigoInterno: 'B158X', Ubicacion: 'ES CAPDELLÀ- SON VIC NOU ' },
    { codigoInterno: 'B684A', Ubicacion: 'ESCORCA-SON TORRELLA' },
    { codigoInterno: '1486E', Ubicacion: 'ESCUELA NAVAL DE MARÍN' },
    { codigoInterno: '5459X', Ubicacion: 'ESPIEL-C.TÉRMICA' },
    { codigoInterno: '0421X', Ubicacion: 'ESPOLLA  LES ALBERES' },
    { codigoInterno: '1351', Ubicacion: 'ESTACA DE BARES' },
    { codigoInterno: '6058I', Ubicacion: 'ESTEPONA' },
    { codigoInterno: '9257X', Ubicacion: 'ESTERIBAR  EMBALSE DE EUGI' },
    { codigoInterno: '9657X', Ubicacion: 'ESTERRI D?ANEU' },
    { codigoInterno: '4492F', Ubicacion: 'EVC_BARCARROTA' },
    { codigoInterno: '0433D', Ubicacion: 'EVC_CABO DE CREUS' },
    { codigoInterno: '3158D', Ubicacion: 'EVC_CAMPISABALOS' },
    { codigoInterno: 'B800X', Ubicacion: 'EVC_MAÓ' },
    { codigoInterno: '1437P', Ubicacion: 'EVC_NOIA' },
    { codigoInterno: '1535I', Ubicacion: 'EVC_O SAVIÑAO' },
    { codigoInterno: '2882D', Ubicacion: 'EVC_PEÑAUSENDE' },
    { codigoInterno: '5515D', Ubicacion: 'EVC_VÍZNAR' },
    { codigoInterno: '8203O', Ubicacion: 'EVC_ZARRA' },
    { codigoInterno: '1354C', Ubicacion: 'FERROL-LA GRAÑA' },
    { codigoInterno: '1400', Ubicacion: 'FISTERRA' },
    { codigoInterno: '1658', Ubicacion: 'FOLGOSO DO COUREL' },
    { codigoInterno: '9436X', Ubicacion: 'FONFRÍA' },
    { codigoInterno: '8005X', Ubicacion: 'FONTANARS - CASA DELS CUPS' },
    { codigoInterno: '0260X', Ubicacion: 'FONTMARTINA' },
    { codigoInterno: 'B986', Ubicacion: 'FORMENTERA' },
    { codigoInterno: '9445L', Ubicacion: 'FORMIGAL  SARRIOS' },
    { codigoInterno: '1056K', Ubicacion: 'FORUA' },
    { codigoInterno: '9924X', Ubicacion: 'FRAGA' },
    { codigoInterno: '8520X', Ubicacion: 'FREDES' },
    { codigoInterno: '4520X', Ubicacion: 'FREGENAL DE LA SIERRA' },
    { codigoInterno: '2885K', Ubicacion: 'FRESNO DE SAYAGO' },
    { codigoInterno: '5341C', Ubicacion: 'FUENCALIENTE' },
    { codigoInterno: 'C129V', Ubicacion: 'FUENCALIENTE-SALINAS' },
    { codigoInterno: '6084X', Ubicacion: 'FUENGIROLA' },
    { codigoInterno: '7023X', Ubicacion: 'FUENTE ALAMO' },
    { codigoInterno: '4501X', Ubicacion: 'FUENTE DE CANTOS' },
    { codigoInterno: '6375X', Ubicacion: 'FUENTE DE PIEDRA ' },
    { codigoInterno: '1167B', Ubicacion: 'FUENTE DÉ-TELEFÉRICO' },
    { codigoInterno: '2517A', Ubicacion: 'FUENTE EL SOL' },
    { codigoInterno: '5470', Ubicacion: 'FUENTE PALMERA-LOS ARROYONES' },
    { codigoInterno: '5656', Ubicacion: 'FUENTES DE ANDALUCIA  EL TRAVIESO' },
    { codigoInterno: '2555B', Ubicacion: 'FUENTESAUCO' },
    { codigoInterno: 'C249I', Ubicacion: 'FUERTEVENTURA/AEROPUERTO' },
    { codigoInterno: '3436D', Ubicacion: 'GARGANTA LA OLLA' },
    { codigoInterno: '6340X', Ubicacion: 'GARRUCHA  PUERTO' },
    { codigoInterno: '6050X', Ubicacion: 'GAUCÍN' },
    { codigoInterno: '1208H', Ubicacion: 'GIJÓN  MUSEL' },
    { codigoInterno: '1207U', Ubicacion: 'GIJÓN-CAMPUS' },
    { codigoInterno: '0370E', Ubicacion: 'GIRONA-PARC MIGDIA' },
    { codigoInterno: '0367', Ubicacion: 'GIRONA/COSTA BRAVA' },
    { codigoInterno: '2453E', Ubicacion: 'GOTARRENDURA (AUTOMATICA)' },
    { codigoInterno: '5515X', Ubicacion: 'GRANADA-CARTUJA' },
    { codigoInterno: '5530E', Ubicacion: 'GRANADA/AEROPUERTO' },
    { codigoInterno: '5911A', Ubicacion: 'GRAZALEMA' },
    { codigoInterno: '3168D', Ubicacion: 'GUADALAJARA' },
    { codigoInterno: '5726X', Ubicacion: 'GUADALCANAL  CRISTO' },
    { codigoInterno: '4245X', Ubicacion: 'GUADALUPE (AUTOMATICA)' },
    { codigoInterno: '1078I', Ubicacion: 'GÜEÑES' },
    { codigoInterno: '3503', Ubicacion: 'GUIJO DE GRANADILLA' },
    { codigoInterno: 'C038N', Ubicacion: 'HARÍA-CEMENTERIO' },
    { codigoInterno: '9121X', Ubicacion: 'HARO ' },
    { codigoInterno: '7096B', Ubicacion: 'HELLÍN' },
    { codigoInterno: 'C328W', Ubicacion: 'HERMIGUA-DEPÓSITO AYUNTAMIENTO' },
    { codigoInterno: '4244X', Ubicacion: 'HERRERA DEL DUQUE' },
    { codigoInterno: '3504X', Ubicacion: 'HERVAS' },
    { codigoInterno: '9546B', Ubicacion: 'HÍJAR  DEPÓSITO' },
    { codigoInterno: '4267X', Ubicacion: 'HINOJOSA DEL DUQUE' },
    { codigoInterno: '9946X', Ubicacion: 'HORTA DE SANT JOAN' },
    { codigoInterno: '3536X', Ubicacion: 'HOYOS' },
    { codigoInterno: '4642E', Ubicacion: 'HUELVA  RONDA ESTE' },
    { codigoInterno: '6367B', Ubicacion: 'HUERCAL OVERA' },
    { codigoInterno: '9901X', Ubicacion: 'HUESCA' },
    { codigoInterno: '9898', Ubicacion: 'HUESCA  AEROPUERTO' },
    { codigoInterno: 'B954', Ubicacion: 'IBIZA/ES CODOLÁ' },
    { codigoInterno: '0171X', Ubicacion: 'IGUALADA' },
    { codigoInterno: '1012P', Ubicacion: 'IRUN' },
    { codigoInterno: '9274X', Ubicacion: 'IRURTZUN' },
    { codigoInterno: '9218A', Ubicacion: 'ISABA/IZABA' },
    { codigoInterno: 'C430E', Ubicacion: 'IZAÑA' },
    { codigoInterno: '8376', Ubicacion: 'JABALOYAS  DEPÓSITO' },
    { codigoInterno: '9201X', Ubicacion: 'JACA' },
    { codigoInterno: '5270B', Ubicacion: 'JAÉN' },
    { codigoInterno: '8193E', Ubicacion: 'JALANCE' },
    { codigoInterno: '3455X', Ubicacion: 'JARAICEJO' },
    { codigoInterno: '8050X', Ubicacion: 'JÁVEA  AYUNTAMIENTO' },
    { codigoInterno: '5960', Ubicacion: 'JEREZ DE LA FRONTERA/AEROPUERTO' },
    { codigoInterno: '4511C', Ubicacion: 'JEREZ DE LOS CABALLEROS' },
    { codigoInterno: '6042I', Ubicacion: 'JIMENA DE LA FRONTERA-EL DORADO' },
    { codigoInterno: '9632X', Ubicacion: 'JOSA-TUIXEN' },
    { codigoInterno: '7138B', Ubicacion: 'JUMILLA  EL ALBAL' },
    { codigoInterno: '0385X', Ubicacion: 'L?ESTARTIT' },
    { codigoInterno: 'C619Y', Ubicacion: 'LA ALDEA DE SAN NICOLAS' },
    { codigoInterno: '9427X', Ubicacion: 'LA ALMUNIA DE DOÑA GODINA' },
    { codigoInterno: '2491C', Ubicacion: 'LA COVATILLA  ESTACIÓN DE ESQUÍ' },
    { codigoInterno: '9585', Ubicacion: 'LA MOLINA' },
    { codigoInterno: 'C258K', Ubicacion: 'LA OLIVA (CARRETERA DEL COTILLO)' },
    { codigoInterno: 'C259X', Ubicacion: 'LA OLIVA-PUERTO DE CORRALEJO' },
    { codigoInterno: 'C139E', Ubicacion: 'LA PALMA/AEROPUERTO' },
    { codigoInterno: '2150H', Ubicacion: 'LA PINILLA  ESTACIÓN DE ESQUÍ' },
    { codigoInterno: '9772X', Ubicacion: 'LA POBLA DE CERVOLES' },
    { codigoInterno: '5654X', Ubicacion: 'LA PUEBLA DE LOS INFANTES' },
    { codigoInterno: '5625X', Ubicacion: 'LA RAMBLA   PRIVILEGIO' },
    { codigoInterno: '2059B', Ubicacion: 'LA RIBA DE ESCALOTE' },
    { codigoInterno: '9619', Ubicacion: 'LA SEO D?URGELL' },
    { codigoInterno: '9122I', Ubicacion: 'LABASTIDA' },
    { codigoInterno: '2737E', Ubicacion: 'LAGUNAS DE SOMOZA' },
    { codigoInterno: '9060X', Ubicacion: 'LALASTRA' },
    { codigoInterno: '9908X', Ubicacion: 'LANAJA  DEPÓSITO' },
    { codigoInterno: '6258X', Ubicacion: 'LANJARÓN' },
    { codigoInterno: 'C029O', Ubicacion: 'LANZAROTE/AEROPUERTO' },
    { codigoInterno: '9280B', Ubicacion: 'LARRAGA' },
    {
      codigoInterno: '5891X',
      Ubicacion: 'LAS CABEZAS DE SAN JUAN (MAJOLETO AUTOMATICA)',
    },
    { codigoInterno: '8191Y', Ubicacion: 'LAS ERAS' },
    { codigoInterno: 'C446G', Ubicacion: 'LAS MERCEDES-LLANO LOS LOROS' },
    {
      codigoInterno: 'C659M',
      Ubicacion: 'LAS PALMAS DE GC. PLAZA  DE LA FERIA',
    },
    { codigoInterno: 'C649I', Ubicacion: 'LAS PALMAS DE GRAN CANARIA/GANDO' },
    { codigoInterno: 'C659H', Ubicacion: 'LAS PALMAS G.C. SAN CRISTÓBAL' },
    { codigoInterno: 'C658X', Ubicacion: 'LAS PALMAS G.C.-TAFIRA/ZURBARÁN' },
    { codigoInterno: '6307C', Ubicacion: 'LAÚJAR  PARQUE NACIONAL' },
    { codigoInterno: '6307X', Ubicacion: 'LAUJAR DE ANDARAX' },
    { codigoInterno: '9495Y', Ubicacion: 'LECIÑENA' },
    { codigoInterno: '1037X', Ubicacion: 'LEGAZPI' },
    { codigoInterno: '2661', Ubicacion: 'LEÓN/VIRGEN DEL CAMINO' },
    { codigoInterno: '0360X', Ubicacion: 'LES PLANES D?HOSTOLES' },
    { codigoInterno: '9145X', Ubicacion: 'LEZA' },
    { codigoInterno: '2096B', Ubicacion: 'LICERAS-CAÑADA DEHESA' },
    { codigoInterno: '5279X', Ubicacion: 'LINARES (VOR - AUTOMATICA)' },
    { codigoInterno: '1183X', Ubicacion: 'LLANES' },
    { codigoInterno: 'C468X', Ubicacion: 'LLANOS DE MESA ' },
    { codigoInterno: '9771C', Ubicacion: 'LLEIDA' },
    { codigoInterno: '4386B', Ubicacion: 'LLERENA' },
    { codigoInterno: '9707', Ubicacion: 'LLIMIANA' },
    { codigoInterno: '8409X', Ubicacion: 'LLIRIA' },
    { codigoInterno: '9726E', Ubicacion: 'LLORAC' },
    { codigoInterno: 'B013X', Ubicacion: 'LLUC' },
    { codigoInterno: 'B334X', Ubicacion: 'LLUCMAJOR II' },
    { codigoInterno: 'B301', Ubicacion: 'LLUCMAJOR-RADAR' },
    { codigoInterno: '9170', Ubicacion: 'LOGROÑO  AEROPUERTO' },
    { codigoInterno: '5582A', Ubicacion: 'LOJA' },
    { codigoInterno: 'C419L', Ubicacion: 'Lomo del Balo' },
    { codigoInterno: '5612X', Ubicacion: 'LORA DE ESTEPA (AUTOMATICA)' },
    { codigoInterno: '7209', Ubicacion: 'LORCA' },
    { codigoInterno: '9171K', Ubicacion: 'LOS ARCOS' },
    { codigoInterno: '2044B', Ubicacion: 'LUBIA-CEDER' },
    { codigoInterno: '1518A', Ubicacion: 'LUGO-COL.FINGOI' },
    { codigoInterno: '1505', Ubicacion: 'LUGO/ROZAS' },
    { codigoInterno: '0413A', Ubicacion: 'MAÇANET DE CABRENYS' },
    { codigoInterno: '3194U', Ubicacion: 'MADRID  C. UNIVERSITARIA' },
    { codigoInterno: '3129A', Ubicacion: 'MADRID BARAJAS RS.' },
    { codigoInterno: '3195', Ubicacion: 'MADRID RETIRO' },
    { codigoInterno: '3129', Ubicacion: 'MADRID/BARAJAS' },
    { codigoInterno: '4067', Ubicacion: 'MADRIDEJOS' },
    { codigoInterno: '3423I', Ubicacion: 'MADRIGAL DE LA VERA' },
    { codigoInterno: '6172X', Ubicacion: 'MÁLAGA' },
    { codigoInterno: '6156X', Ubicacion: 'MÁLAGA CMT' },
    { codigoInterno: '6172O', Ubicacion: 'MÁLAGA PUERTO' },
    { codigoInterno: '6155A', Ubicacion: 'MÁLAGA/AEROPUERTO' },
    { codigoInterno: 'B614E', Ubicacion: 'MANACOR-POLIESPORTIU' },
    { codigoInterno: '3140Y', Ubicacion: 'MANDAYONA' },
    { codigoInterno: '6057X', Ubicacion: 'MANILVA' },
    { codigoInterno: '0149X', Ubicacion: 'MANRESA' },
    { codigoInterno: '6083X', Ubicacion: 'MARBELLA  CABOPINO' },
    {
      codigoInterno: '6076X',
      Ubicacion: 'MARBELLA (PUERTO BANUS - AUTOMATICA)',
    },
    { codigoInterno: '9590', Ubicacion: 'MARTINET' },
    { codigoInterno: 'C689E', Ubicacion: 'MASPALOMAS' },
    { codigoInterno: '9947X', Ubicacion: 'MASSALUCA' },
    { codigoInterno: '1057B', Ubicacion: 'MATXITXAKO' },
    { codigoInterno: '1406X', Ubicacion: 'MAZARICOS-A PICOTA' },
    { codigoInterno: '7007Y', Ubicacion: 'MAZARRÓN/LAS TORRES' },
    { codigoInterno: '9051', Ubicacion: 'MEDINA DE POMAR' },
    { codigoInterno: '2604B', Ubicacion: 'MEDINA DE RIOSECO' },
    {
      codigoInterno: '5983X',
      Ubicacion: 'MEDINA SIDONIA (EL HUNDIDO - AUTOMATICA)',
    },
    { codigoInterno: '6000A', Ubicacion: 'MELILLA' },
    { codigoInterno: 'B893', Ubicacion: 'MENORCA/AEROPUERTO' },
    { codigoInterno: 'B825B', Ubicacion: 'MERCADAL' },
    { codigoInterno: '4410X', Ubicacion: 'MÉRIDA' },
    { codigoInterno: '2969U', Ubicacion: 'MESÓN EROSA' },
    { codigoInterno: '1234P', Ubicacion: 'MIERES-BAÍÑA' },
    { codigoInterno: '2482B', Ubicacion: 'MIGUELAÑEZ' },
    { codigoInterno: '4300Y', Ubicacion: 'MINAS DE ALMADÉN' },
    { codigoInterno: '2701D', Ubicacion: 'MIÑERA DE LUNA-EMBALSE' },
    { codigoInterno: '8245Y', Ubicacion: 'MIRA' },
    {
      codigoInterno: '1167G',
      Ubicacion: 'MIRADOR DEL CABLE  PARQUE NACIONAL PICOS DE EUROPA',
    },
    { codigoInterno: '8058Y', Ubicacion: 'MIRAMAR' },
    { codigoInterno: '9069C', Ubicacion: 'MIRANDA DE EBRO' },
    { codigoInterno: 'C629Q', Ubicacion: 'MOGAN (PUERTO RICO)' },
    { codigoInterno: '0120X', Ubicacion: 'MOIÀ' },
    { codigoInterno: '3013', Ubicacion: 'MOLINA DE ARAGÓN' },
    { codigoInterno: '7237E', Ubicacion: 'MOLINA DE SEGURA (LOS VALIENTES)' },
    { codigoInterno: '9729X', Ubicacion: 'MOLLERUSSA' },
    { codigoInterno: '1344X', Ubicacion: 'MONDOÑEDO' },
    { codigoInterno: '4499X', Ubicacion: 'MONESTERIO (AUTOMATICA)' },
    { codigoInterno: '1679A', Ubicacion: 'MONFORTE DE LEMOS' },
    { codigoInterno: '9262P', Ubicacion: 'MONREAL/ELO  DEPÓSITO' },
    { codigoInterno: '9531Y', Ubicacion: 'MONTALBÁN' },
    { codigoInterno: '9301X', Ubicacion: 'MONTEAGUDO' },
    { codigoInterno: '3512X', Ubicacion: 'MONTEHERMOSO' },
    { codigoInterno: '1446X', Ubicacion: 'MONTERROSO' },
    { codigoInterno: '2302N', Ubicacion: 'MONTERRUBIO DE LA DEMANDA' },
    { codigoInterno: '5361X', Ubicacion: 'MONTORO VEGA ARMIJO' },
    { codigoInterno: '0158X', Ubicacion: 'MONTSERRAT' },
    { codigoInterno: '3254Y', Ubicacion: 'MORA DE TOLEDO (AUTOMÁTICA)' },
    { codigoInterno: '2536D', Ubicacion: 'MORALES DEL TORO-DEPOSITO' },
    { codigoInterno: '9562X', Ubicacion: 'MORELLA - PASEO ALAMEDA' },
    { codigoInterno: '2048A', Ubicacion: 'MORON DE ALMAZAN ' },
    { codigoInterno: '5796', Ubicacion: 'MORÓN DE LA FRONTERA' },
    { codigoInterno: '8486X', Ubicacion: 'MOSQUERUELA  DEPÓSITO' },
    { codigoInterno: '8155Y', Ubicacion: 'MOTILLA DEL PALANCAR' },
    { codigoInterno: '6268Y', Ubicacion: 'MOTRIL PUERTO NAÚTICO' },
    { codigoInterno: '1738U', Ubicacion: 'MUIÑOS-PRADO' },
    { codigoInterno: '7172X', Ubicacion: 'MULA (P. BOMBEROS - AUT.)' },
    { codigoInterno: '4096Y', Ubicacion: 'MUNERA  SAN BARTOLOMÉ (AUTOMÁTICA)' },
    { codigoInterno: '9513X', Ubicacion: 'MUNIESA' },
    { codigoInterno: '2430Y', Ubicacion: 'MUÑOTELLO' },
    { codigoInterno: '7178I', Ubicacion: 'MURCIA' },
    { codigoInterno: '7031X', Ubicacion: 'MURCIA/SAN JAVIER' },
    { codigoInterno: 'B605X', Ubicacion: 'MURO-S?ALBUFERA ' },
    { codigoInterno: '1052A', Ubicacion: 'MUTRIKU' },
    { codigoInterno: '6335O', Ubicacion: 'NACIMIENTO  PARQUE NACIONAL' },
    { codigoInterno: '9141V', Ubicacion: 'NÁJERA' },
    { codigoInterno: '2462', Ubicacion: 'NAVACERRADA PUERTO' },
    { codigoInterno: '3305Y', Ubicacion: 'NAVAHERMOSA' },
    { codigoInterno: '3434X', Ubicacion: 'NAVALMORAL DE LA MATA' },
    { codigoInterno: '3386A', Ubicacion: 'NAVALVILLAR DE IBOR' },
    { codigoInterno: '4340', Ubicacion: 'NAVALVILLAR DE PELA' },
    { codigoInterno: '9238X', Ubicacion: 'NAVASCUÉS/NABASKOZE' },
    { codigoInterno: '2930Y', Ubicacion: 'NAVASFRIAS' },
    {
      codigoInterno: '6213X',
      Ubicacion: 'NERJA (CUEVAS DE NERJA - AUTOMATICA)',
    },
    { codigoInterno: '9001D', Ubicacion: 'NESTARES' },
    { codigoInterno: '1435C', Ubicacion: 'NOIA' },
    { codigoInterno: '8013X', Ubicacion: 'NOVELDA' },
    { codigoInterno: '3494U', Ubicacion: 'NUÑOMORAL' },
    { codigoInterno: '1583X', Ubicacion: 'O BARCO DE VALDEORRAS' },
    { codigoInterno: '1700X', Ubicacion: 'O CARBALLIÑO' },
    { codigoInterno: '1521I', Ubicacion: 'O PARAMO' },
    { codigoInterno: '1730E', Ubicacion: 'O ROSAL' },
    { codigoInterno: '3099Y', Ubicacion: 'OCAÑA' },
    { codigoInterno: '9252X', Ubicacion: 'OLITE/ERRIBERRI' },
    { codigoInterno: '4486X', Ubicacion: 'OLIVENZA' },
    { codigoInterno: '2503B', Ubicacion: 'OLMEDO  DEPÓSITO AGUA' },
    { codigoInterno: '2296A', Ubicacion: 'OLVEGA-CAMINO VEGAFRÍA' },
    { codigoInterno: '5919X', Ubicacion: 'OLVERA-COOP.AGRÍCOLA' },
    { codigoInterno: '1327A', Ubicacion: 'ONETA' },
    { codigoInterno: '8283X', Ubicacion: 'ONTINYENT' },
    { codigoInterno: '1026X', Ubicacion: 'ORDIZIA' },
    { codigoInterno: '7244X', Ubicacion: 'ORIHUELA DESAMPARADOS' },
    { codigoInterno: '3427Y', Ubicacion: 'OROPESA DEHESÓN DEL  ENCINAR' },
    { codigoInterno: '9228J', Ubicacion: 'OROZ-BETELU/OROTZ-BETELU  DEPÓSITO' },
    { codigoInterno: '1064L', Ubicacion: 'OROZKO  IBARRA' },
    { codigoInterno: '9724X', Ubicacion: 'OS DE BALAGUER' },
    { codigoInterno: '4093Y', Ubicacion: 'OSA DE LA VEGA (AUTOMÁTICA)' },
    { codigoInterno: '4007Y', Ubicacion: 'OSSA DE MONTIEL' },
    { codigoInterno: '5998X', Ubicacion: 'OSUNA  SEA' },
    { codigoInterno: '1690A', Ubicacion: 'OURENSE' },
    { codigoInterno: '1341B', Ubicacion: 'OURIA DE TARAMUNDI' },
    { codigoInterno: '1249X', Ubicacion: 'OVIEDO' },
    { codigoInterno: '1473A', Ubicacion: 'PADRÓN' },
    { codigoInterno: 'C229J', Ubicacion: 'PÁJARA-PUERTO MORRO JABLE' },
    { codigoInterno: '1221D', Ubicacion: 'PAJARES - VALGRANDE' },
    { codigoInterno: '2298', Ubicacion: 'PALACIOS DE LA SIERRA' },
    { codigoInterno: '2400E', Ubicacion: 'PALENCIA-AUTILLA PINO' },
    { codigoInterno: '2401X', Ubicacion: 'PALENCIA-GRANJA VIÑALTA' },
    { codigoInterno: 'B278', Ubicacion: 'PALMA DE MALLORCA/SON SANT JOAN' },
    { codigoInterno: 'B228D', Ubicacion: 'PALMA DIC DE L?OEST' },
    { codigoInterno: 'B228', Ubicacion: 'PALMA-PORTOPÍ' },
    { codigoInterno: 'B236C', Ubicacion: 'PALMA-UNIVERSITAT' },
    { codigoInterno: '9263D', Ubicacion: 'PAMPLONA  AEROPUERTO' },
    { codigoInterno: '3103', Ubicacion: 'PANTANO EL VADO' },
    { codigoInterno: '9451F', Ubicacion: 'PANTICOSA  PETROSOS' },
    { codigoInterno: '3085Y', Ubicacion: 'PASTRANA' },
    { codigoInterno: '2863C', Ubicacion: 'PEDRAZA DE ALBA-VALLELARGO' },
    { codigoInterno: '2290Y', Ubicacion: 'PEDROSA DEL PRÍNCIPE' },
    { codigoInterno: '2847X', Ubicacion: 'PEDROSILLO DE LOS AIRES-CASTILLEJO' },
    { codigoInterno: '8057C', Ubicacion: 'PEGO' },
    { codigoInterno: '2166Y', Ubicacion: 'PEÑAFIEL(FABRICA DE QUESOS)' },
    { codigoInterno: '4260', Ubicacion: 'PERALEDA DEL ZAUCEJO' },
    { codigoInterno: 'B640X', Ubicacion: 'PETRA' },
    { codigoInterno: 'C916Q', Ubicacion: 'PINAR-DEPÓSITO' },
    { codigoInterno: '7247X', Ubicacion: 'PINOSO' },
    { codigoInterno: '3516X', Ubicacion: 'PIORNAL (AUTOMATICA)' },
    { codigoInterno: '0320I', Ubicacion: 'PLANOLES' },
    { codigoInterno: '3519X', Ubicacion: 'PLASENCIA' },
    { codigoInterno: '1631E', Ubicacion: 'POBRA DE TRIVES SAN MAMEDE' },
    { codigoInterno: '1276F', Ubicacion: 'POLA DE SOMIEDO-DEPURADORA' },
    { codigoInterno: '9019B', Ubicacion: 'POLIENTES-CASYC' },
    { codigoInterno: '8325X', Ubicacion: 'POLINYA' },
    { codigoInterno: 'B760X', Ubicacion: 'POLLENÇA-POLIESPORTIU' },
    { codigoInterno: '1549', Ubicacion: 'PONFERRADA' },
    { codigoInterno: '1723X', Ubicacion: 'PONTEAREAS-CANEDO' },
    { codigoInterno: '1484C', Ubicacion: 'PONTEVEDRA' },
    { codigoInterno: '0061X', Ubicacion: 'PONTONS' },
    { codigoInterno: '0372C', Ubicacion: 'PORQUERES' },
    { codigoInterno: 'B341X', Ubicacion: 'PORRERES-SA MESQUIDA' },
    { codigoInterno: '9677', Ubicacion: 'PORT AINE  L?ORRI' },
    { codigoInterno: 'B780X', Ubicacion: 'PORT POLLENÇA-AERODROM ' },
    { codigoInterno: 'B434X', Ubicacion: 'PORTO COLOM' },
    { codigoInterno: '3194Y', Ubicacion: 'POZUELO DE ALARCON (AUTOMÁTICA)' },
    { codigoInterno: '2789H', Ubicacion: 'POZUELO DE TABARA' },
    { codigoInterno: '0114X', Ubicacion: 'PRATS DE LLUÇANÈS' },
    { codigoInterno: '5412X', Ubicacion: 'PRIEGO DE CÓRDOBA  SAN FELIX' },
    { codigoInterno: '4220X', Ubicacion: 'PUEBLA DE DON RODRIGO' },
    { codigoInterno: '4468X', Ubicacion: 'PUEBLA DE OBANDO (AUTOMATICA)' },
    { codigoInterno: 'C459Z', Ubicacion: 'PUERTO DE LA CRUZ' },
    { codigoInterno: '1542', Ubicacion: 'PUERTO DE LEITARIEGOS' },
    { codigoInterno: 'C629X', Ubicacion: 'PUERTO DE MOGÁN' },
    { codigoInterno: '2630X', Ubicacion: 'PUERTO DE SAN ISIDRO' },
    { codigoInterno: '4236Y', Ubicacion: 'PUERTO DEL REY' },
    { codigoInterno: '3319D', Ubicacion: 'PUERTO EL PICO' },
    { codigoInterno: '7211B', Ubicacion: 'PUERTO LUMBRERAS' },
    { codigoInterno: '5304Y', Ubicacion: 'PUERTOLLANO' },
    { codigoInterno: '1059X', Ubicacion: 'PUNTA GALEA ' },
    { codigoInterno: 'C117A', Ubicacion: 'PUNTAGORDA' },
    { codigoInterno: '4061X', Ubicacion: 'QUINTANAR DE LA ORDEN' },
    { codigoInterno: '9510X', Ubicacion: 'QUINTO' },
    { codigoInterno: '2182C', Ubicacion: 'RADES' },
    { codigoInterno: '6312E', Ubicacion: 'RÁGOL  PARQUE NACIONAL' },
    { codigoInterno: '1089U', Ubicacion: 'RAMALES DE LA VICTORIA-ETAP' },
    { codigoInterno: '9975X', Ubicacion: 'RASQUERA' },
    { codigoInterno: '4362X', Ubicacion: 'RETAMAL DE LLERENA ' },
    { codigoInterno: '0016A', Ubicacion: 'REUS/AEROPUERTO' },
    { codigoInterno: '2624C', Ubicacion: 'RIAÑO-ERMITA QUINTANILLA' },
    { codigoInterno: '1701X', Ubicacion: 'RIBADAVIA' },
    { codigoInterno: '1342X', Ubicacion: 'RIBADEO  VILAFRAMIL' },
    { codigoInterno: '6175X', Ubicacion: 'RINCON DE LA VICTORIA (AUTOMATICA)' },
    { codigoInterno: '0324A', Ubicacion: 'RIPOLL' },
    { codigoInterno: '2512Y', Ubicacion: 'RIVILLA DE BARAJAS' },
    { codigoInterno: '3338', Ubicacion: 'ROBLEDO DE CHAVELA' },
    { codigoInterno: '5612B', Ubicacion: 'RODA DE ANDALUCÍA' },
    { codigoInterno: '7261X', Ubicacion: 'ROJALES  EL MOLINO' },
    { codigoInterno: '9228T', Ubicacion: 'RONCESVALLES/ORREAGA' },
    { codigoInterno: '6032X', Ubicacion: 'RONDA  IES' },
    { codigoInterno: '1223P', Ubicacion: 'RONZÓN' },
    { codigoInterno: 'C101A', Ubicacion: 'ROQUE DE LOS MUCHACHOS' },
    { codigoInterno: '6293X', Ubicacion: 'ROQUETAS DE MAR-FARO SABINAR' },
    { codigoInterno: '5910X', Ubicacion: 'ROTA BASE NAVAL' },
    { codigoInterno: '3330Y', Ubicacion: 'ROZAS DE PUERTO REAL' },
    { codigoInterno: '2507Y', Ubicacion: 'RUEDA (AUTOMATICA)' },
    { codigoInterno: 'B691Y', Ubicacion: 'SA POBLA-SA CANOVA' },
    { codigoInterno: 'C939T', Ubicacion: 'SABINOSA-BALNEARIO' },
    { codigoInterno: '9460X', Ubicacion: 'SABIÑÁNIGO' },
    { codigoInterno: '2946X', Ubicacion: 'SAELICES EL CHICO' },
    {
      codigoInterno: '8446Y',
      Ubicacion: 'SAGUNTO (MONTIVER PONTAZGO - SEMIAUTOMATICA)',
    },
    { codigoInterno: '2626Y', Ubicacion: 'SAHECHORES-HELIPUERTO' },
    { codigoInterno: '2870', Ubicacion: 'SALAMANCA OBS.' },
    { codigoInterno: '2867', Ubicacion: 'SALAMANCA/MATACAN' },
    { codigoInterno: '6267X', Ubicacion: 'SALOBREÑA' },
    { codigoInterno: '8210Y', Ubicacion: 'SALVACAÑETE' },
    { codigoInterno: 'C925F', Ubicacion: 'SAN ANDRÉS-DEPÓSITO CABILDO' },
    { codigoInterno: '1309C', Ubicacion: 'SAN ANTOLIN DE IBIAS-LINARES' },
    {
      codigoInterno: 'C623I',
      Ubicacion: 'SAN BARTOLOME TIRAJANA (CUEVAS DEL PINAR)',
    },
    {
      codigoInterno: 'C639U',
      Ubicacion: 'SAN BARTOLOME TIRAJANA (EL MATORRAL)',
    },
    {
      codigoInterno: 'C639M',
      Ubicacion: 'SAN BARTOLOME TIRAJANA-C.INSULAR TURISMO',
    },
    {
      codigoInterno: 'C635B',
      Ubicacion: 'SAN BARTOLOME TIRAJANA-H.LAS TIRAJANAS',
    },
    {
      codigoInterno: 'C625O',
      Ubicacion: 'SAN BARTOLOME TIRAJANA-LOMO PEDRO ALFONSO',
    },
    { codigoInterno: '4090Y', Ubicacion: 'SAN CLEMENTE' },
    { codigoInterno: '1152C', Ubicacion: 'SAN FELICES DE BUELNA-TARRIBA' },
    { codigoInterno: '5972X', Ubicacion: 'SAN FERNANDO' },
    { codigoInterno: '5950X', Ubicacion: 'SAN JOSE DEL VALLE-PT GUADALCACÍN' },
    { codigoInterno: 'C611E', Ubicacion: 'SAN MATEO (CORRAL DE LOS JUNCOS)' },
    { codigoInterno: 'C628B', Ubicacion: 'SAN NICOLAS T.-TASARTE/COPARLITA' },
    { codigoInterno: '9287A', Ubicacion: 'SAN PEDRO MANRIQUE' },
    { codigoInterno: '2471Y', Ubicacion: 'SAN RAFAEL' },
    { codigoInterno: '6056X', Ubicacion: 'SAN ROQUE  SOTOGRANDE' },
    { codigoInterno: '1103X', Ubicacion: 'SAN ROQUE DE RIOMERA-CARACOL' },
    { codigoInterno: 'C329Z', Ubicacion: 'SAN SEBASTIÁN DE LA GOMERA' },
    { codigoInterno: '3125Y', Ubicacion: 'SAN SEBASTIAN DE LOS REYES' },
    { codigoInterno: '1159', Ubicacion: 'SAN VICENTE  FARO' },
    { codigoInterno: 'B925', Ubicacion: 'SANT ANTONI DE PORTMANY' },
    { codigoInterno: '0363X', Ubicacion: 'SANT HILARI' },
    { codigoInterno: 'B908X', Ubicacion: 'SANT JOAN DE LABRITJA ' },
    { codigoInterno: '0312X', Ubicacion: 'SANT PAU DE SEGURIES' },
    { codigoInterno: 'C449C', Ubicacion: 'SANTA CRUZ DE TENERIFE ' },
    { codigoInterno: '5246', Ubicacion: 'SANTA ELENA' },
    { codigoInterno: '9374X', Ubicacion: 'SANTA EULALIA  DEL CAMPO' },
    { codigoInterno: '9012E', Ubicacion: 'SANTA GADEA DE ALFOZ' },
    { codigoInterno: 'B656A', Ubicacion: 'SANTA MARÍA' },
    { codigoInterno: '1109X', Ubicacion: 'SANTANDER AEROPUERTO' },
    { codigoInterno: '1111X', Ubicacion: 'SANTANDER CMT' },
    { codigoInterno: 'B410B', Ubicacion: 'SANTANYÍ' },
    { codigoInterno: '1475X', Ubicacion: 'SANTIAGO DE COMPOSTELA' },
    { codigoInterno: '1428', Ubicacion: 'SANTIAGO DE COMPOSTELA/LABACOLLA' },
    { codigoInterno: '2777K', Ubicacion: 'SANTIBAÑEZ DE VIDRIALES' },
    { codigoInterno: '2172Y', Ubicacion: 'SARDÓN DE DUERO' },
    { codigoInterno: '9894Y', Ubicacion: 'SARIÑENA  DEPÓSITO' },
    { codigoInterno: 'C148F', Ubicacion: 'SAUCES-S.ANDRÉS-BALSA ADEYAHAME' },
    { codigoInterno: '7072Y', Ubicacion: 'SEGE' },
    { codigoInterno: '8439X', Ubicacion: 'SEGORBE  MASIA HOYA' },
    { codigoInterno: '2465', Ubicacion: 'SEGOVIA' },
    { codigoInterno: '1025A', Ubicacion: 'SEGURA' },
    { codigoInterno: '9843A', Ubicacion: 'SEIRA' },
    { codigoInterno: '3448X', Ubicacion: 'SERRADILLA (AUTOMATICA)' },
    { codigoInterno: '5783', Ubicacion: 'SEVILLA/SAN PABLO' },
    { codigoInterno: 'B248', Ubicacion: 'SIERRA DE ALFABIA' },
    { codigoInterno: '5516D', Ubicacion: 'SIERRA NEVADA' },
    { codigoInterno: '3130C', Ubicacion: 'SIGÜENZA' },
    { codigoInterno: '1466A', Ubicacion: 'SILLEDA' },
    { codigoInterno: 'B644B', Ubicacion: 'SINEU-POLIESPORTIU' },
    { codigoInterno: '0073X', Ubicacion: 'SITGES-VALLCARCA' },
    { codigoInterno: '1410X', Ubicacion: 'SOBRADO DOS MONXES' },
    { codigoInterno: 'B051A', Ubicacion: 'Sóller' },
    { codigoInterno: '3111D', Ubicacion: 'SOMOSIERRA' },
    { codigoInterno: 'B275E', Ubicacion: 'SON BONET  AEROPUERTO' },
    { codigoInterno: 'B496X', Ubicacion: 'SON SERVERA-CAN PEP MONJO' },
    { codigoInterno: '9751', Ubicacion: 'SOPEIRA' },
    { codigoInterno: '1083B', Ubicacion: 'SOPUERTA' },
    { codigoInterno: '2030', Ubicacion: 'SORIA' },
    { codigoInterno: '9244X', Ubicacion: 'SOS DEL REY CATÓLICO' },
    { codigoInterno: '3391', Ubicacion: 'SOTILLO DE LA ADRADA' },
    { codigoInterno: '1178Y', Ubicacion: 'SOTO DE VALDEÓN (AUTOMATICA)' },
    {
      codigoInterno: '1178R',
      Ubicacion: 'SOTRES  PARQUE NACIONAL PICOS DE EUROPA',
    },
    { codigoInterno: '1272B', Ubicacion: 'SOUTU  LA BARCA' },
    { codigoInterno: '5790Y', Ubicacion: 'TABLADA' },
    { codigoInterno: 'C919K', Ubicacion: 'TACORÓN-LAPILLAS-TORTUGA' },
    { codigoInterno: 'C458A', Ubicacion: 'TACORONTE-A S.E.A.' },
    { codigoInterno: '9698U', Ubicacion: 'TALARN' },
    { codigoInterno: '3365A', Ubicacion: 'TALAVERA DE LA REINA' },
    { codigoInterno: '1174I', Ubicacion: 'TAMA' },
    { codigoInterno: '9918Y', Ubicacion: 'TAMARITE DE LITERA  LA MELUSA' },
    { codigoInterno: '3094B', Ubicacion: 'TARANCON' },
    { codigoInterno: '9299X', Ubicacion: 'TARAZONA' },
    { codigoInterno: '6001', Ubicacion: 'TARIFA' },
    { codigoInterno: '0042Y', Ubicacion: 'TARRAGONA  FAC. GEOGRAFIA' },
    { codigoInterno: 'C129Z', Ubicacion: 'TAZACORTE' },
    { codigoInterno: 'C839X', Ubicacion: 'TEGUISE LA GRACIOSA-HELIPUERTO' },
    { codigoInterno: 'C614H', Ubicacion: 'TEJEDA CASCO' },
    { codigoInterno: 'C612F', Ubicacion: 'TEJEDA-CRUZ DE TEJEDA' },
    { codigoInterno: 'C648N', Ubicacion: 'TELDE-CENTRO FORESTAL DORAMAS' },
    { codigoInterno: 'C649R', Ubicacion: 'TELDE-MELENARA' },
    { codigoInterno: '3245Y', Ubicacion: 'TEMBLEQUE' },
    { codigoInterno: 'C439J', Ubicacion: 'TENERIFE-GÜIMAR' },
    { codigoInterno: 'C447A', Ubicacion: 'TENERIFE/LOS RODEOS' },
    { codigoInterno: 'C429I', Ubicacion: 'TENERIFE/SUR' },
    { codigoInterno: 'C656V', Ubicacion: 'TEROR-OSORIO' },
    { codigoInterno: '8368U', Ubicacion: 'TERUEL' },
    { codigoInterno: 'C018J', Ubicacion: 'TIAS-LAS VEGAS' },
    { codigoInterno: '3229Y', Ubicacion: 'TIELMES' },
    { codigoInterno: 'C117Z', Ubicacion: 'TIJARAFE-MIRADOR TIME' },
    { codigoInterno: 'C048W', Ubicacion: 'TINAJO-LOS DOLORES' },
    { codigoInterno: '7103Y', Ubicacion: 'TOBARRA' },
    { codigoInterno: '3260B', Ubicacion: 'TOLEDO' },
    { codigoInterno: '5788X', Ubicacion: 'Tomares  Zaudín' },
    { codigoInterno: '4103X', Ubicacion: 'TOMELLOSO' },
    { codigoInterno: '5060X', Ubicacion: 'TOPARES' },
    { codigoInterno: '9647X', Ubicacion: 'TORÀ' },
    { codigoInterno: '9718X', Ubicacion: 'TORDERA - GRANYANELLA' },
    { codigoInterno: '9814X', Ubicacion: 'TORLA-ORDESA  DEPÓSITO' },
    { codigoInterno: '9814I', Ubicacion: 'TORLA-ORDESA  EL CEBOLLAR' },
    { codigoInterno: '9812M', Ubicacion: 'TORLA-ORDESA  PARQUE NACIONAL' },
    { codigoInterno: '3514B', Ubicacion: 'TORNAVACAS' },
    { codigoInterno: '7026X', Ubicacion: 'TORRE PACHECO (C.C.A. AUT.)' },
    {
      codigoInterno: '8503Y',
      Ubicacion: 'TORREBLANCA AYUNTAMIENTO (C.AGRARIA LOCAL)',
    },
    { codigoInterno: '3531X', Ubicacion: 'TORRECILLA DE LOS ANGELES' },
    { codigoInterno: '1154H', Ubicacion: 'TORRELAVEGA-SIERRAPANDO' },
    { codigoInterno: '6088X', Ubicacion: 'TORREMOLINOS' },
    { codigoInterno: '5165X', Ubicacion: 'TORRES' },
    { codigoInterno: '6205X', Ubicacion: 'TORROX FARO' },
    { codigoInterno: '9981A', Ubicacion: 'TORTOSA' },
    { codigoInterno: '7218Y', Ubicacion: 'TOTANA' },
    { codigoInterno: '1176A', Ubicacion: 'TRESVISO' },
    { codigoInterno: '1096X', Ubicacion: 'TRETO' },
    { codigoInterno: '3463Y', Ubicacion: 'TRUJILLO' },
    { codigoInterno: '9302Y', Ubicacion: 'TUDELA  ' },
    { codigoInterno: 'C239N', Ubicacion: 'TUINEJE-PUERTO GRAN TARAJAL' },
    { codigoInterno: '8337X', Ubicacion: 'TURIS' },
    { codigoInterno: '2084Y', Ubicacion: 'UCERO' },
    { codigoInterno: '8309X', Ubicacion: 'UTIEL  LA CUBERA' },
    { codigoInterno: '9995Y', Ubicacion: 'VALCARLOS/LUZAIDE' },
    { codigoInterno: '3343Y', Ubicacion: 'VALDEMORILLO' },
    { codigoInterno: '4147X', Ubicacion: 'VALDEPEÑAS' },
    { codigoInterno: '9935X', Ubicacion: 'VALDERROBRES ' },
    { codigoInterno: '9115X', Ubicacion: 'VALDEZCARAY' },
    { codigoInterno: '3576X', Ubicacion: 'VALENCIA DE ALCÁNTARA' },
    { codigoInterno: '2664B', Ubicacion: 'VALENCIA DE DON JUAN' },
    { codigoInterno: '8416Y', Ubicacion: 'VALENCIA DT' },
    { codigoInterno: '8416X', Ubicacion: 'VALENCIA UPV' },
    { codigoInterno: '8414A', Ubicacion: 'VALENCIA/AEROPUERTO' },
    { codigoInterno: '0394X', Ubicacion: 'VALL DE BIANYA' },
    { codigoInterno: '2422', Ubicacion: 'VALLADOLID' },
    { codigoInterno: '9207', Ubicacion: 'VALLE DE HECHO  HECHO-DEPÓSITO' },
    { codigoInterno: 'C314Z', Ubicacion: 'VALLEHERMOSO-ALTO IGUALERO' },
    { codigoInterno: 'C319W', Ubicacion: 'VALLEHERMOSO-DAMA' },
    { codigoInterno: 'C665T', Ubicacion: 'VALLESECO' },
    { codigoInterno: '0034X', Ubicacion: 'VALLS' },
    { codigoInterno: '9501X', Ubicacion: 'VALMADRID' },
    { codigoInterno: '6281X', Ubicacion: 'VÁLOR' },
    { codigoInterno: '4263X', Ubicacion: 'VALSEQUILLO' },
    { codigoInterno: 'C928I', Ubicacion: 'VALVERDE' },
    {
      codigoInterno: '4575X',
      Ubicacion: 'VALVERDE CAMINO (CH.GUADIANA AUTOMATICA)',
    },
    { codigoInterno: '3547X', Ubicacion: 'VALVERDE DE FRESNO' },
    { codigoInterno: '5995B', Ubicacion: 'VEJER DE LA FRONTERA' },
    { codigoInterno: '6199X', Ubicacion: 'VELEZ MALAGA (AUTOMATICA)' },
    { codigoInterno: 'C457I', Ubicacion: 'VICTORIA-DEPÓSITO MARRERO' },
    { codigoInterno: '1496X', Ubicacion: 'VIGO-O CASTRO' },
    { codigoInterno: '1495', Ubicacion: 'VIGO/PEINADOR' },
    { codigoInterno: '0066X', Ubicacion: 'VILAFRANCA DEL PENEDÈS' },
    { codigoInterno: '1477V', Ubicacion: 'VILAGARCIA DE AROUSA' },
    { codigoInterno: '0244X', Ubicacion: 'VILASSAR DE DALT' },
    { codigoInterno: '1541B', Ubicacion: 'VILLABLINO' },
    { codigoInterno: '1124E', Ubicacion: 'VILLACARRIEDO - SANTIBAÑEZ' },
    { codigoInterno: '2804F', Ubicacion: 'VILLADEPERA' },
    { codigoInterno: '2285B', Ubicacion: 'VILLADIEGO (DEPÓSITO DE AGUA)' },
    { codigoInterno: '2276B', Ubicacion: 'VILLAELES DE VALDAVIA' },
    { codigoInterno: '2611D', Ubicacion: 'VILLAFÁFILA' },
    { codigoInterno: '8489X', Ubicacion: 'VILLAFRANCA' },
    { codigoInterno: '4395X', Ubicacion: 'VILLAFRANCA DE LOS BARROS' },
    { codigoInterno: '2593D', Ubicacion: 'VILLALÓN DE CAMPOS' },
    { codigoInterno: '2311Y', Ubicacion: 'VILLAMAYOR DE LOS MONTES' },
    { codigoInterno: '2728B', Ubicacion: 'VILLAMECA' },
    { codigoInterno: '4138Y', Ubicacion: 'VILLANUEVA DE LOS INFANTES' },
    { codigoInterno: '5210X', Ubicacion: 'VILLANUEVA DEL ARZOBISPO' },
    { codigoInterno: '4497X', Ubicacion: 'VILLANUEVA DEL FRESNO' },
    { codigoInterno: '2568D', Ubicacion: 'VILLAPUN' },
    { codigoInterno: '1561I', Ubicacion: 'VILLAR DE OTERO (LOS TROBOS)' },
    { codigoInterno: '2775X', Ubicacion: 'VILLARDECIERVOS' },
    { codigoInterno: '4075Y', Ubicacion: 'VILLARES DEL SAZ' },
    { codigoInterno: '2891A', Ubicacion: 'VILLARINO DE LOS AIRES' },
    { codigoInterno: '4622X', Ubicacion: 'VILLARRASA  PLANTA DE RECICLAJE' },
    { codigoInterno: '4091Y', Ubicacion: 'VILLARROBLEDO' },
    { codigoInterno: '5192', Ubicacion: 'VILLARRODRIGO' },
    { codigoInterno: '8008Y', Ubicacion: 'VILLENA' },
    { codigoInterno: '1399', Ubicacion: 'VIMIANZO-CASTRELO' },
    { codigoInterno: '2005Y', Ubicacion: 'VINUESA' },
    { codigoInterno: '4148', Ubicacion: 'VISO DEL MARQUÉS' },
    { codigoInterno: '2916A', Ubicacion: 'VITIGUDINO' },
    { codigoInterno: '9091R', Ubicacion: 'VITORIA-GASTEIZ AEROPUERTO' },
    { codigoInterno: '8293X', Ubicacion: 'XÁTIVA' },
    { codigoInterno: '1735X', Ubicacion: 'XINZO DE LIMIA' },
    { codigoInterno: 'C019V', Ubicacion: 'YAIZA-PLAYA BLANCA' },
    { codigoInterno: '7275C', Ubicacion: 'YECLA' },
    { codigoInterno: '4427X', Ubicacion: 'ZAFRA (AUTOMATICA)' },
    { codigoInterno: '2614', Ubicacion: 'ZAMORA' },
    { codigoInterno: '3021Y', Ubicacion: 'ZAOREJAS' },
    { codigoInterno: '9434', Ubicacion: 'ZARAGOZA  AEROPUERTO' },
    { codigoInterno: '9434P', Ubicacion: 'ZARAGOZA  VALDESPARTERA' },
    { codigoInterno: '3540X', Ubicacion: 'ZARZA LA MAYOR' },
    { codigoInterno: '7203A', Ubicacion: 'ZARZILLA DE RAMOS' },
    { codigoInterno: '4347X', Ubicacion: 'ZORITA' },
    { codigoInterno: '1041A', Ubicacion: 'ZUMAIA' },
    { codigoInterno: '1037Y', Ubicacion: 'ZUMARRAGA' },
  ];

  tipoMensajeList: tipoMensaje[] = [
    { codigo: "climat", tipo: 'climat' },
    { codigo: "synop", tipo: 'synop' },
    { codigo: "temp", tipo: 'temp' }
  ];

  ngOnInit(): void {
    this.appComponente.changeStyle = true;

    this.contentToChange = this.data;
    console.log("this.data: ", this.data);
    // this.contentToChange = this.sharedService.contentToChange;
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
      this.selectedTitle = 'Mensajes de observación. ';
      this.selectedSubtitle = 'Último elaborado. ';
      this.selectedContent =
        'Últimos mensajes de observación. Para los SYNOP y TEMP devuelve los mensajes de las últimas 24 horas y para los CLIMAT de los 40 últimos dias. Se pasa como parámetro el tipo de mensaje que se desea (tipomensaje). El resultado de la petición es un fichero en formato tar.gz, que contiene los boletines en formato json y bufr.';

    } else {
      this.goBack();
    }
  }

  callToApis(opc: number) {
    const apiKey = environment.apiKey;
    switch (opc) {
      case 1:
        const apiUrl1 = `https://opendata.aemet.es/opendata/api/observacion/convencional/todas?api_key=${apiKey}`;
        this.http.get(apiUrl1).subscribe((data: any) => {
          if (data && data.datos) {
            const dataUrl = data.datos;
            console.log('dataURL: ', dataUrl);
            this.http
              .get<WeatherData[]>(dataUrl)
              .subscribe((response: any[]) => {
                if (response && Array.isArray(response)) {
                  this.sectionOPCResponse8 = true;

                  this.weatherData = response as WeatherData[];
                  this.weatherData.sort((a, b) => {
                    if (a.alt !== b.alt) {
                      return b.alt - a.alt; // Ordena por altura más alta
                    } else {
                      return b.ta - a.ta; // Si la altura es igual, ordena por temperatura más alta
                    }
                  });
                }
              });
          }
        });
        break;

      case 2: // Llamada a la segunda API
        const selectedSelect = (
          document.getElementById('idemaStations') as HTMLSelectElement
        ).value;

        console.log("selectedSelect:", selectedSelect);
        const apiUrl2 = `https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/${selectedSelect}?api_key=${apiKey}`;
        this.http.get(apiUrl2).subscribe((data: any) => {
          if (data && data.datos) {
            console.log("datos: ", data.datos);
            const dataUrl = data.datos; // Esta es la matriz de datos que obtuviste
            this.sectionOPCResponse9 = true;
            this.http
              .get<ObservationData[]>(dataUrl)
              .subscribe((response: any[]) => {
                console.log("response: ", response);
                this.observationData = response as ObservationData[];
              });

            // this.processAndDisplayData(dataArray);
          }
        });
        break;

      case 3: // Llamada a la tercera API, y así sucesivamente
        const selectedSelect3 = (
          document.getElementById('tipoMensa') as HTMLSelectElement
        ).value;

        console.log("selectedSelect:", selectedSelect3);
        const apiUrl3 = `https://opendata.aemet.es/opendata/api/observacion/convencional/mensajes/tipomensaje/${selectedSelect3}?api_key=${apiKey}`;
        this.http.get(apiUrl3).subscribe((data: any) => {
          console.log("datos: ", data);
          if (data && data.datos) {
            console.log("datos: ", data.datos);
            const dataUrl3 = data.datos;
            this.sectionOPCResponse10 = true;
            window.open(dataUrl3, '_blank');
          }
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
      hour12: false,
    });
  }

  goBack(): void {
    this.appComponente.changeStyle = false;
    this.location.back();
  }

  generateDataFormat(): string {
    const formattedData = this.weatherData
      .map((data) => {
        return `{ codigoInterno: '${data.idema}', Ubicacion: '${data.ubi}' }`;
      })
      .join(',\n');

    return formattedData;
  }

  downloadTxtFile() {
    const dataToSave = this.generateDataFormat();
    const blob = new Blob([dataToSave], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'datos.txt';
    link.click();
  }

  sortDataByName(data: any[]) {
    return data.slice().sort((a, b) => {
      const nameA = a.ubi.toLowerCase();
      const nameB = b.ubi.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  processAndDisplayData(dataArray: any[]) {
    // Puedes hacer cualquier transformación adicional aquí si es necesario

    // Asigna los datos procesados a una propiedad en tu componente
    this.processedDataArray = dataArray as ObservationData[];
  }
}
