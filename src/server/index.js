const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain
const request = require('request');

let win;

app.once('ready', () => {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/../../index.html`);
  win.webContents.openDevTools();
});

ipc.on('quote-request', (event, data) => {
  request('http://finance.google.com/finance/info?q=aapl', (a, b, body) => {
    const d = JSON.parse(body.slice(3));
    event.sender.send('quote-response', d);
  });
});
