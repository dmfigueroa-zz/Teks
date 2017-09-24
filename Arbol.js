import Nodo from './Nodo'

class Arbol {
  constructor() {
    this.raiz = new Nodo('α');
    this.sugerencias = []
  }

  ingresarPalabras(palabras) {
    var i = palabras.length
    while (i--) {
      var palabra = Array.from(palabras[i].toUpperCase());
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

  buscarSugerencias(palabra) {
    var nodo = this.raiz
    this.sugerencias = []
    var i = 0
    while (i < palabra.length && nodo) {
      nodo = nodo.buscarHijo(palabra[i])
      i++
    }
    if (nodo) {
      if (nodo.info === palabra[i - 1]) {
        this.solve(nodo, palabra.substring(0, i - 1))
      }
    }else{
      this.sugerencias = 'No hay sugerencias disponibles'
    }
    return this.sugerencias;
  }

  solve(nodo, palabra) {
    for (var i = 0; i < nodo.hijos.length; i++) {
      this.solve(nodo.hijos[i], palabra + nodo.info)
    }
    if (nodo.finalPalabra) {
      this.sugerencias.push(palabra + nodo.info)
    }
  }
}

export default Arbol;
