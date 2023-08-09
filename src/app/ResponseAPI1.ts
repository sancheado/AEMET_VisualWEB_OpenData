export interface ResponseAPI1 {
  id: string;
  nombre: string;
  origen: {
    copyright: string;
    language: string;
    notaLegal: string;
    productor: string;
    tipo: string;
    web: string;
  };
  seccion: SeccionItem[];
}


// Defino otra interfaz SeccionItem para representar el elemento de la sección que contiene el array de parrafo
export interface SeccionItem {
  nombre: string;
  apartado: string;
  lugar: string;
  parrafo: ParrafoItem[];
}

// Defino otra interfaz ParrafoItem para representar los elementos del array parrafo
export interface ParrafoItem {
  numero: string;
  texto: string;
}
