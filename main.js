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

const menu = new Menu()
console.log(menu);

fs.readFile('./palabras.txt', 'utf-8', (error, data) => {
  if (error)
    throw error;
  var palabras = data.toString().split('\n');
  palabras.pop();
  arbol.ingresarPalabras(palabras);

  mainWindow = new BrowserWindow({width: 800, height: 600});
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
