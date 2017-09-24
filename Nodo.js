class Nodo {
  constructor(info) {
    this.info = info
    this.hijos = []
    this.finalPalabra = false;
  }

  esPadreDe(letra) {
    var i = 0,
      encontrado = false
    while (!encontrado && i < this.hijos.length) {
      if (this.hijos[i].info === letra) {
        encontrado = true
      }
      i++
    }
    return encontrado
  }

  agregarHijo(info) {
    var hijo = new Nodo(info);
    this.hijos.push(hijo);
  }

  buscarHijo(info) {
    return (this.hijos.find(hijo => hijo.info.toString() === info.toString()))
  }
};

export default Nodo;
