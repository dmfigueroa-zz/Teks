import Nodo from './Nodo'

class Arbol {
  constructor() {
    this.raiz = new Nodo('0');
  }

  ingresarPalabras(palabras) {
    for (var i = 0; i < palabras.length; i++) {
      var palabra = Array.from(palabras[i]);
      this.agregarPalabra(palabra, 0, this.raiz);
    }
  }

  agregarPalabra(palabra, i, nodo) {
    console.log(nodo);
    console.log(i);
    if (i < palabra.length) {
      console.log(!nodo.esPadreDe(palabra[i]));
      if (!nodo.esPadreDe(palabra[i])) {
        nodo.agregarHijo(palabra[i]);
        console.log(nodo.hijos);
      }
      this.agregarPalabra(palabra, i + 1, nodo.buscarHijo(palabra[i]));
    } else {
      if (!nodo.esPadreDe(palabra[i])) {
        nodo.agregarHijo(palabra[i]);
      }
      var nodoHijo = nodo.buscarHijo(palabra[i]);
      nodoHijo.finalPalabra = true;
    }
  }
}

export default Arbol;
