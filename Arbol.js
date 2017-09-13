import Nodo from './Nodo'

class Arbol {
  constructor() {
    this.raiz = new Nodo('0');
  }

  ingresarPalabras(palabras) {
    for (var i = 0; i < palabras.length; i++) {
      var palabra = Array.from(palabras[i].toLowerCase());
      this.agregarPalabra(palabra, 0, this.raiz);
    }
  }

  agregarPalabra(palabra, i, nodo) {
    if (i < palabra.length - 1) {
      if (!nodo.esPadreDe(palabra[i])) {
        nodo.agregarHijo(palabra[i]);
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
