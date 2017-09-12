import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import ipcMain from 'electron';
import Arbol from './Arbol';

let mainWindow = null;
const arbol = new Arbol();

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

fs.readFile('./palabras.txt', 'utf-8', (error, data) => {
  if (error) throw error;
  arbol.ingresarPalabras(data.toString().split('\n'));
});
