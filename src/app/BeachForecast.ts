export interface BeachForecast {
  origen: {
    productor: string;
    web: string;
    language: string;
    copyright: string;
    notaLegal: string;
  };
  elaborado: string;
  nombre: string;
  localidad: number;
  prediccion: {
    dia: {
      estadoCielo: {
        value: string;
        f1: number;
        descripcion1: string;
        f2: number;
        descripcion2: string;
      };
      viento: {
        value: string;
        f1: number;
        descripcion1: string;
        f2: number;
        descripcion2: string;
      };
      oleaje: {
        value: string;
        f1: number;
        descripcion1: string;
        f2: number;
        descripcion2: string;
      };
      tMaxima: {
        value: string;
        valor1: number;
      };
      sTermica: {
        value: string;
        valor1: number;
        descripcion1: string;
      };
      tAgua: {
        value: string;
        valor1: number;
      };
      uvMax: {
        value: string;
        valor1: number;
      };
      fecha: number;
      tmaxima: {
        value: string;
        valor1: number;
      };
      stermica: {
        value: string;
        valor1: number;
        descripcion1: string;
      };
      tagua: {
        value: string;
        valor1: number;
      };
    }[];
  };
  id: number;
}
