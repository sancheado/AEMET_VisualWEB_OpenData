// Definición de la interfaz para los objetos en el arreglo 'apartado'
interface Apartado {
  cabecera: string;
  texto: string;
  nombre: string;
}

// Definición de la interfaz para los objetos en el arreglo 'lugar'
interface Lugar {
  minima: number;
  stminima: number;
  maxima: number;
  stmaxima: number;
  nombre: string;
  altitud: string;
}

// Interfaz para el objeto 'ResponseAPI2'
interface ResponseAPI2 {
  origen: {
    productor: string;
    web: string;
    tipo: string;
    language: string;
    copyright: string;
    notaLegal: string;
  };
  seccion: {
    prediccion: {
      apartado: Apartado[];
    };
    atmosferalibre: {
      apartado: Apartado[];
    };
    sensacion_termica: {
      lugar: Lugar[];
    };
  };
  id: string;
  nombre: string;
}

export default ResponseAPI2;
