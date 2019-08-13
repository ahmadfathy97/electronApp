const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;
let mainWindow,
    addWindow;

app.on('ready', ()=>{
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname + '/main.html'),
      protocol: 'file',
      slashes: true
  }));
  const mainMenu = new Menu.buildFromTemplate(menuBar);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on('closed', ()=>{
    app.quit();
  });
});

function addFunction(){
  addWindow = new BrowserWindow({
    width: 400,
    height: 250
  });
  const newSubMenuBar = new Menu.buildFromTemplate(subMenuBar);
  addWindow.setMenu(newSubMenuBar);
  addWindow.loadURL(url.format({
      pathname: path.join(__dirname + '/addItem.html'),
      protocol: 'file',
      slashes: true
  }));
}

const menuBar = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Add Item',
        accelerator: 'ctrl+shift+A',
        click(){
          addFunction();
        }
      },
      {
        label: 'Clear Item'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'command+Q' : 'ctrl+Q',
        click(){
          app.quit();
        }
      },
    ]
  }
];
const subMenuBar = [];
