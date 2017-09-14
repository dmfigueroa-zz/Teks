import Nodo from './Nodo'

class Arbol {
  constructor() {
    this.raiz = new Nodo('α');
  }

  ingresarPalabras(palabras) {
    for (var i = 0; i < palabras.length; i++) {
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
    var sugerencias = []
    var i = 0
    while (i < palabra.length && nodo.buscarHijo(palabra[i].toUpperCase())) {
      nodo = nodo.buscarHijo(palabra[i].toUpperCase())
      i++
    }
    if (nodo.info === palabra[i - 2]) {
      this.solve(this.raiz)
    }
    return sugerencias;
  }

  solve(n) {
    var pila = []
    pila.push(n)
    while (pila.length === 0) {
      var n = pila.pop()
      if (n.esHoja()) {
        if (n.finalPalabra) {
          console.log(pila);
          console.log(n.info);
          return true
        }
      } else {
        for (var i = 0; i < n.hijos.length; i++) {
          pila.push(n.hijos[i])
        }
      }
      return false
    }
  }
}

export default Arbol;
