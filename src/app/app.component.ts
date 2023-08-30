import { Component, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

interface Option {
  value: string;
  label: string;
  explication: string;
  contentToChange: string;
  option: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'AEMET VisualWEB OpenData';

  options: Option[] = [];

  opcionesGrupo1: any[] = [{
    value: 'opcion1',
    label: 'Opción 1',
    explication:
      'Breve resumen con lo más significativo de las condiciones meteorológicas registradas en la zona de montaña que se pasa como parámetro (area) en las últimas 24-36 horas.',
    contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}',
    option: 'Predicción Montaña. Pasado.',
  },
  {
    value: 'opcion2',
    label: 'Opción 2',
    explication:
      'Predicción meteorológica para la zona montañosa que se pasa como parámetro (area) con validez para el día (día). Periodicidad de actualización: continuamente.',
    contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
    option: 'Predicción Montaña. Actual.',
  },
  {
    value: 'opcion3',
    label: 'Opción 3',
    explication:
      'Información nivológica para la zona montañosa que se pasa como parámetro (area).',
    contentToChange: '/api/prediccion/especifica/nivologica/{area}',
    option:'Información nivologica.',
  },
  {
    value: 'opcion4',
    label: 'Opción 4',
    explication:
      'Predicción para el municipio que se pasa como parámetro (municipio). Periodicidad de actualización: continuamente.',
    contentToChange: '/api/prediccion/especifica/municipio/diaria/{municipio}',
    option:'Predicción por municipios diaria. Tiempo actual.',
  },
  {
    value: 'opcion5',
    label: 'Opción 5',
    explication:
      'Predicción horaria para el municipio que se pasa como parámetro (municipio). Presenta la información de hora en hora hasta 48 horas.',
    contentToChange: '/api/prediccion/especifica/municipio/horaria/{municipio}',
    option:'Predicción por municipios horaria. Tiempo actual.',
  },
  {
    value: 'opcion6',
    label: 'Opción 6',
    explication:
      'La predicción diaria de la playa que se pasa como parámetro. Establece el estado de nubosidad para unas horas determinadas, las 11 y las 17 hora oficial. Se analiza también si se espera precipitación en el entorno de esas horas, entre las 08 y las 14 horas y entre las 14 y 20 horas.',
    contentToChange: '/api/prediccion/especifica/playa/{playa}',
    option:'Predicción para las playas. Tiempo actual.',
  },
  {
    value: 'opcion7',
    label: 'Opción 7',
    explication:
      'Predicción de Índice de radiación UV máximo en condiciones de cielo despejado para el día seleccionado.',
    contentToChange: '/api/prediccion/especifica/uvi/{dia}',
    option:'Predicción de radiación ultravioleta (UVI).',

  }];
  opcionesGrupo2: any[] = [
    {
      value: 'opcion8',
      label: 'Opción 8',
      explication:
        'Datos de observación horarios de las últimas 24 horas todas las estaciones meteorológicas de las que se han recibido datos en ese período. Frecuencia de actualización: continuamente.',
      contentToChange: '/api/observacion/convencional/todas',
      option:'Datos de observación. Tiempo actual.',
    },

    {
      value: 'opcion9',
      label: 'Opción 9',
      explication:
        'Datos de observación horarios de las últimas 24 horas de la estación meterológica que se pasa como parámetro (idema). Frecuencia de actualización: continuamente.',
      contentToChange: '/api/observacion/convencional/datos/estacion/{idema}',
      option:'Datos de observación. Tiempo actual.',
    },
    {
      value: 'opcion10',
      label: 'Opción 10',
      explication:
        'Últimos mensajes de observación. Para los SYNOP y TEMP devuelve los mensajes de las últimas 24 horas y para los CLIMAT de los 40 últimos dias. Se pasa como parámetro el tipo de mensaje que se desea (tipomensaje). El resultado de la petición es un fichero en formato tar.gz, que contiene los boletines en formato json y bufr.',
      contentToChange: '/api/observacion/convencional/mensajes/tipomensaje/{tipomensaje}',
      option:'Mensajes de observación. Último elaborado.',
    },
  ]

  opcionesGrupo3: any[] = [
    {
      value: 'opcion11',
      label: 'Opción 11',
      explication:
        'Valores climatológicos para el rango de fechas y la estación seleccionada. Periodicidad: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Climatologías diarías.',
    },
    {
      value: 'opcion12',
      label: 'Opción 12',
      explication:
        'Valores climatológicos de todas las estaciones para el rango de fechas seleccionado. Periodicidad: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Climatologías diarías.',
    },
    {
      value: 'opcion13',
      label: 'Opción 13',
      explication:
        'Características de la estación climatológica pasada por parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Estaciones por indicativo.',
    },
    {
      value: 'opcion14',
      label: 'Opción 14',
      explication:
        'Inventario con las características de todas las estaciones climatológicas. Periodicidad: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Inventario de estaciones (valores climatológicos).',
    },
    {
      value: 'opcion15',
      label: 'Opción 15',
      explication:
        'Valores medios mensuales y anuales de los datos climatológicos para la estación y el periodo de años pasados por parámetro. Periodicidad de actualización: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Climatologías mensuales anuales.',
    },
    {
      value: 'opcion16',
      label: 'Opción 16',
      explication:
        'Valores climatológicos normales (periodo 1981-2010) para la estación pasada por parámetro. Periodicidad: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Climatologías normales (1981-2010).',
    },
    {
      value: 'opcion17',
      label: 'Opción 17',
      explication:
        'Valores extremos para la estación y la variable (precipitación, temperatura y viento) pasadas por parámetro. Periodicidad: 1 vez al día.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Valores extremos.',
    },
  ]

  opcionesGrupo4: any[] = [
    {
      value: 'opcion18',
      label: 'Opción 18',
      explication:
        'Esta imagen se realiza con una combinación de los datos del canal visible y del infrarrojo cercano del satélite NOAA-19, que nos da una idea del desarrollo de la vegetación. Esto es así debido a que la vegetación absorbe fuertemente la radiación del canal visible, pero refleja fuertemente la del infrarrojo cercano. Esta imagen se renueva los jueves a última hora y contiene los datos acumulados de la última semana.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Índice normalizado de vegetación.',
    },
    {
      value: 'opcion19',
      label: 'Opción 19',
      explication:
        'Imagen obtenida con una combinación de los datos de los canales infrarrojos del satélite NOAA-19, que nos da la temperatura de la superficie del mar. Esta imagen se renueva todos los días a última hora y contiene los datos acumulados de los últimos siete días.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Temperatura del agua del mar.',
    },
  ]
  opcionesGrupo5: any[] = [
    {
      value: 'opcion20',
      label: 'Opción 20',
      explication:
        'Estos mapas muestran la configuración de la presión en superficie usando isobaras (lineas de igual presión), áreas de alta (A, a) y baja (B, b) presión y los frentes en Europa y el Atlántico Norte.El mapa de análisis presenta el estado de la atmósfera a la hora correspondiente y los fenómenos más relevantes observados en España. Periodicidad de actualización: cada 12 horas (00, 12).',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Mapas de análisis. Última pasada.',
    },
    {
      value: 'opcion21',
      label: 'Opción 21',
      explication:
        'Mapas significativos de ámbito nacional o CCAA, para una fecha dada y ese mismo día (D+0), al día siguiente (D+1) o a los dos días (D+2), en el periodo horario de (00_12) ó (12-24). Hasta el 22/01/2020.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Mapas significativos. Tiempo actual.',
    },
  ]
  opcionesGrupo6: any[] = [
    {
      value: 'opcion22',
      label: 'Opción 22',
      explication:
        'Retorna información específica del municipio de España que se le pasa como parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'getMunicipio.',
    },
    {
      value: 'opcion23',
      label: 'Opción 23',
      explication:
        'Retorna todos los municipios de España. Este servicio es útil para obtener información para utilizar otros elementos de AEMET OpenData, como por ejemplo, la predicción de municipios para 7 días o por horas ya que nos retorna el id del municipio que necesitamos.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'getMunicipios.',
    },
  ]
  opcionesGrupo7: any[] = [
    {
      value: 'opcion24',
      label: 'Opción 24',
      explication:
        'Se obtiene, para la decema y el año pasados por parámetro, el Boletín Hídrico Nacional que se elabora cada diez días. Se presenta información resumida de forma distribuida para todo el territorio nacional de diferentes variables, en las que se incluye informaciones de la precipitación y la evapotranspiración potencial acumuladas desde el 1 de septiembre.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Balance hídrico nacional (documento).',
    },
    {
      value: 'opcion25',
      label: 'Opción 25',
      explication:
        'Resumen climatológico nacional, para el año y mes pasado por parámetro, sobre el estado del clima y la evolución de las principales variables climáticas, en especial temperatura y precipitación, a nivel mensual, estacional y anual.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Resumen mensual climatológico nacional (documento).',
    },
    {
      value: 'opcion26',
      label: 'Opción 26',
      explication:
        'Capas SHAPE de las distintas estaciones climatológicas de AEMET: automáticas, completas, pluviométricas y termométricas.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Capas SHAPE de estaciones climatológicas de AEMET.',
    },
  ]

  opcionesGrupo8: any[] = [
    {
      value: 'opcion27',
      label: 'Opción 27',
      explication:
        'Predicción para un periodo de 24 horas de las condiciones meteorológicas para el área marítima pasada por parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción maritima de alta mar.',
    },
    {
      value: 'opcion28',
      label: 'Opción 28',
      explication:
        'Predicción para un periodo de 24 horas de las condiciones meteorológicas para la zona costera pasada por parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción marítima costera.',
    },
  ]

  opcionesGrupo9: any[] = [
    {
      value: 'opcion29',
      label: 'Opción 29',
      explication:
        'Ficheros diarios con datos diezminutales de la estación de la red de contaminación de fondo EMEP/VAG/CAMP pasada por parámetro, de temperatura, presión, humedad, viento (dirección y velocidad), radiación global, precipitación y 4 componentes químicos: O3,SO2,NO,NO2 y PM10. Los datos se encuentran en formato FINN (propio del Ministerio de Medio Ambiente). Periodicidad: cada hora.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Datos de contaminación de fondo. Tiempo actual.',
    },
    {
      value: 'opcion30',
      label: 'Opción 30',
      explication:
        'Dato medio diario de contenido total de ozono. Cada 24 h (actualmente, en fines de semana, festivos y vacaciones no se genera por la falta de personal en el Centro Radiométrico Nacional).',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Contenido total de ozono. Tiempo actual.',
    },
    {
      value: 'opcion31',
      label: 'Opción 31',
      explication:
        'Perfil Vertical de Ozono de la estación pasada por parámetro. Periodicidad: cada 7 días.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:' Perfiles verticales de ozono. Tiempo actual.',
    },
    {
      value: 'opcion32',
      label: 'Opción 32',
      explication:
        'Datos horarios (HORA SOLAR VERDADERA) acumulados de radiación global, directa, difusa e infrarroja, y datos semihorarios (HORA SOLAR VERDADERA) acumulados de radiación ultravioleta eritemática.Datos diarios acumulados de radiación global, directa, difusa, ultravioleta eritemática e infrarroja. Periodicidad: Cada 24h (actualmente en fines de semana, festivos y vacaciones, no se genera por la ausencia de personal en el Centro Radiométrico Nacional).',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Datos de radiación global, directa o difusa. Tiempo actual.',
    },
  ]

  opcionesGrupo10: any[] = [
    {
      value: 'opcion33',
      label: 'Opción 33',
      explication:
        'Imagen de las descargas caídas en el territorio nacional durante un período de 12 horas.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Mapa con los rayos registrados en periodo standard. Último elaborado.',
    },
  ]
  opcionesGrupo11: any[] = [
    {
      value: 'opcion34',
      label: 'Opción 34',
      explication:
        'Último mapa elaborado de niveles de riesgo estimado meteorológico de incendios forestales para el área pasada por parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Mapa de niveles de riesgo estimado meteorológico de incedios forestales.',
    },
    {
      value: 'opcion35',
      label: 'Opción 35',
      explication:
        'Mapa elaborado de niveles de riesgo estimado meteorológico de incendios forestales para el día y el área pasados por parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Mapa de niveles de riesgo previsto meteorológico de incedios forestales.',
    },
  ]
  opcionesGrupo12: any[] = [
    {
      value: 'opcion36',
      label: 'Opción 36',
      explication:
        'Predicción para la CCAA que se pasa como parámetro con validez para mismo día que la fecha de petición. En el caso de que en la fecha de petición este producto todavía no se hubiera elaborado, se retornará el último elaborado. Actualización continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA hoy. Tiempo actual.',
    },
    {
      value: 'opcion37',
      label: 'Opción 37',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro (ccaa) con validez para el día de fecha de elaboración que se pasa como parámetro (fecha). Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA hoy. Archivo.',
    },
    {
      value: 'opcion38',
      label: 'Opción 38',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro para el día siguiente a la fecha de la petición. En el caso de el producto no se hubiera elaborado todavía en la fecha de petición se retornará el último producto elaborado. Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA mañana. Tiempo actual.',
    },
    {
      value: 'opcion39',
      label: 'Opción 39',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro (ccaa) con validez para el día siguiente a la fecha de elaboración que se pasa como parámetro (fecha). Periodicidad de actualización. continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA mañana. Archivo.',
    },
    {
      value: 'opcion40',
      label: 'Opción 40',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro (ccaa) y con validez para el medio plazo a partir de la fecha de petición. En el caso de que en el fecha de la petición no se hubiera generado aún el producto, se retornará el última elaborado. Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA medio plazo. Tiempo actual.',
    },
    {
      value: 'opcion41',
      label: 'Opción 41',
      explication:
        'Predicción de mediio plazo para la comunidad autónoma que se pasa como parámetro (ccaa) a partir de la fecha de elaboración que se pasa como parámetro (fecha). Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA medio plazo. Archivo.',
    },
    {
      value: 'opcion42',
      label: 'Opción 42',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro (ccaa) y validez para el medio plazo a partir de la fecha de la petición. En el caso de que en la fecha de la petición dicho producto aún no se hubiera generado retornará el último de este tipo que se hubiera generado. Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA pasado mañana. Tiempo actual.',
    },
    {
      value: 'opcion43',
      label: 'Opción 43',
      explication:
        'Predicción para la comunidad autónoma que se pasa como parámetro (ccaa) y validez para pasado mañana a partir de la fecha de elaboración que se pasa como parámetro (fecha). Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción CCAA pasado mañana. Archivo.',
    },
    {
      value: 'opcion44',
      label: 'Opción 44',
      explication:
        'Predicción nacional para el día actual a la fecha de elaboración en formato texto. Actualización diaria. Hay días en los que este producto no se realiza. En ese caso se devuelve la predicción nacional última que se elaboró.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional hoy. Última elaborada.',
    },
    {
      value: 'opcion45',
      label: 'Opción 45',
      explication:
        'Predicción nacional para el día correspondiente a la fecha que se pasa como parámetro en en formato texto. Actualización diaria. Hay días en los que este producto no se realiza. En ese caso se devuelve un 404 producto no existente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional hoy. Archivo.',
    },
    {
      value: 'opcion46',
      label: 'Opción 46',
      explication:
        'Predicción nacional para el día siguiente a la fecha de elaboración. En este caso la fecha de elaboración es el día actual. Actualización diaria. En el caso de que en el día actual todavía no se haya elaborado se devolverá el último producto de predicción nacional para mañana elaborado.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional mañana. Tiempo actual.',
    },
    {
      value: 'opcion47',
      label: 'Opción 47',
      explication:
        'Predicción nacional para el día siguiente a la fecha de elaboración. En este caso la fecha de elaboración es la fecha que se pasa como parámetro. Actualización diaria.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional mañana. Archivo.',
    },
    {
      value: 'opcion48',
      label: 'Opción 48',
      explication:
        'Predicción nacional para medio plazo siguiente a la fecha de elaboración. En este caso la fecha de elaboración es el día actual. Actualización diaria. En el caso de que en el día actual todavía no se haya elaborado se devolverá el último producto de predicción nacional para medio plazo elaborado.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional pasado mañana. Archivo.',
    },
    {
      value: 'opcion49',
      label: 'Opción 49',
      explication:
        'Predicción nacional para el medio plazo siguiente a la fecha de elaboración. En este caso, la fecha de elaboración es la fecha que se pasa como parámetro. Actualización diaria.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional medio plazo. Tiempo actual.',
    },
    {
      value: 'opcion50',
      label: 'Opción 50',
      explication:
        'Predicción nacional para pasado mañana siguiente a la fecha de elaboración. En este caso la fecha de elaboración es el día actual. Actualización diaria. En el caso de que en el día actual todavía no se haya elaborado se devolverá el último producto de predicción nacional para pasado mañana elaborado.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional medio plazo. Archivo.',
    },
    {
      value: 'opcion51',
      label: 'Opción 51',
      explication:
        'Predicción nacional para pasado mañana siguiente a la fecha de elaboración. En este caso, la fecha de elaboración es la fecha que se pasa como parámetro. Actualización diaria.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional pasado mañana. Tiempo actual.',
    },
    {
      value: 'opcion52',
      label: 'Opción 52',
      explication:
        'Predicción nacional para tendencia siguiente a la fecha de elaboración. En este caso la fecha de elaboración es el día actual. Actualización diaria. En el caso de que en el día actual todavía no se haya elaborado se devolverá el último producto de predicción nacional para tendencia elaborado.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional pasado mañana. Archivo.',
    },
    {
      value: 'opcion53',
      label: 'Opción 53',
      explication:
        'Predicción nacional para tendencia siguiente a la fecha de elaboración. En este caso, la fecha de elaboración es la fecha que se pasa como parámetro. Actualización diaria.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción nacional tendencia. Tiempo actual.',
    },
    {
      value: 'opcion54',
      label: 'Opción 54',
      explication:
        'Predicción del día actual para la provincia o isla que se pasa como parámetro. En el caso de que este producto no se haya elaborado todavía en el día actual, se retorna el último elaborado. Actualización continua y fija a las 14:00 Hora Oficial Peninsular.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción provincial e insular hoy. Tiempo actual.',
    },
    {
      value: 'opcion55',
      label: 'Opción 55',
      explication:
        'Predicción del día siguiente a la fecha que se pasa como parámetro para la provincia o isla que se pasa como parámetro. Actualización continua y fija a las 14:00 Hora Oficial Peninsular del día que se pasa como parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción provincial e insular hoy. Archivo.',
    },
    {
      value: 'opcion56',
      label: 'Opción 56',
      explication:
        'Predicción del día siguiente para la provincia o isla que se pasa como parámetro. En el caso de que este producto no se haya elaborado todavía en el día actual, se retorna el último elaborado. Actualización continua y fija a las 14:00 Hora Oficial Peninsular.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción provincial e insular mañana. Tiempo actual.',
    },
    {
      value: 'opcion57',
      label: 'Opción 57',
      explication:
        'Predicción del día siguiente a la fecha que se pasa como parámetro para la provincia o isla que se pasa como parámetro. Actualización continua y fija a las 14:00 Hora Oficial Peninsular del día que se pasa como parámetro.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Predicción provincial e insular mañana. Archivo.',
    },
  ]
  opcionesGrupo13: any[] = [
    {
      value: 'opcion58',
      label: 'Opción 58',
      explication:
        'Imagen composición nacional radares. Tiempo actual estándar. Periodicidad: 30 minutos.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Imagen composición nacional radares. Tiempo actual estándar.',
    },
    {
      value: 'opcion59',
      label: 'Opción 59',
      explication:
        'Imagen del radar regional de la región pasada por parámetro. Tiempo actual estándar. Periodicidad: 10 minutos.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Imagen gráfica radar regional. Tiempo actual estándar.',
    },
  ]
  opcionesGrupo14: any[] = [
    {
      value: 'opcion60',
      label: 'Opción 60',
      explication:
        'Predicción meteorológica para la zona montañosa que se pasa como parámetro (area) con validez para el día (día). Periodicidad de actualización: continuamente.',
      contentToChange: '/api/prediccion/especifica/montaña/pasada/area/{area}/dia/{dia}',
      option:'Avisos de Fenómenos Meteorológicos Adversos. Último.',
    },
    {
      value: 'opcion61',
      label: 'Opción 61',
      explication:
        'Avisos de Fenómenos Meteorológicos adversos para el rango de fechas seleccionado (datos desde 18/06/2018).',
      contentToChange: '/api/avisos_cap/archivo/fechaini/{fechaIniStr}/fechafin/{fechaFinStr}',
      option:'Avisos de Fenómenos Meteorológicos Adversos. Archivo.',
    },
  ]
  opcionesGrupo15: any[] = [
    {
      value: 'opcion62',
      label: 'Opción 62',
      explication:
        'Datos de observación de las campañas Antárticas en las que participa AEMET. Contiene observaciones diezminutales históricas de las estaciones meteorológicas y radiométricas de las bases de Juan Carlos I y Gabriel de Castilla. Frecuencia de actualización: Anual.',
      contentToChange: '/api/antartida/datos/fechaini/{fechaIniStr}/fechafin/{fechaFinStr}/estacion/{identificacion}',
      option:'Datos Antártida.',
    },
  ]

  selectedOption: Option = this.opcionesGrupo1[0];
  selectedOption2: string = 'opcion1';
  changeStyle: boolean = false;

  constructor(private router: Router, private sharedService: SharedService,private elementRef: ElementRef) {}

  onOptionChange(): void {
    this.sharedService.contentToChange = this.selectedOption.value;
  }

  onContinueClick(): void {
    const selectedOptionValue = this.selectedOption.value;
    if (
      ['opcion1', 'opcion2', 'opcion3', 'opcion4', 'opcion5', 'opcion6', 'opcion7'].includes(
        selectedOptionValue
      )
    ) {
      if(this.sharedService.contentToChange === null || this.sharedService.contentToChange === ''){
        this.sharedService.contentToChange = 'opcion1';
      }
      this.router.navigateByUrl('/specific-predictions');
    } else if(['opcion8', 'opcion9', 'opcion10'].includes(
      selectedOptionValue
    )){
      this.router.navigateByUrl('/observation-conventional');
    }else {
      console.log('Opción inválida');
    }
  }
}
