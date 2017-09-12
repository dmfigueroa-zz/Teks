class Nodo {
  constructor(info) {
    this.info = info;
    this.hijos = [];
    this.finalPalabra = false;
  }

  esPadreDe(info) {
    var enc = this.hijos.find(x => x == info);
    return (enc != undefined) ? true : false;
  }

  agregarHijo(info){
    var hijo = new Nodo(info);
    this.hijos.push(hijo);
  }

  buscarHijo(info){
    return this.hijos.find(x => x == info);
  }
};

export default Nodo;
