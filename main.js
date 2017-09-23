import {app, BrowserWindow, ipcMain} from 'electron';
import electron from 'electron'
import fs from 'fs';
import Arbol from './Arbol';
const Menu = electron.Menu
const MenuItem = electron.MenuItem

let mainWindow = null;
const arbol = new Arbol();

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

fs.readFile('./palabras.txt', 'utf-8', (error, data) => {
  if (error)
    throw error;
  var palabras = data.toString().split('\n');
  palabras.pop();
  arbol.ingresarPalabras(palabras);

  mainWindow = new BrowserWindow({width: 800, height: 600, 'node-integration': false});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('ready', () => {});

ipcMain.on('buscarSugerencias', (event, palabra) => {
  event.sender.send('sugerencias', arbol.buscarSugerencias(palabra))
})

ipcMain.on('obtenerArbol', (event, arg) => {
  event.sender.send('arbolRecibido', arbol)
})

ipcMain.on('agregarPalabraDicionario', (event, arg) => {
  arbol.agregarPalabra(Array.from(arg.toUpperCase()), 0, arbol.raiz)
  fs.readFile('./palabras.txt', 'utf-8', (error, data) => {
    var palabras = data.toString() + arg + '\n'
    console.log(palabras);
    fs.writeFile('./palabras.txt', palabras, function(err) {
      if (err) {
        return console.log(err);
      } else {
        console.log('Guardado');
      }
    })
  })
})
