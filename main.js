'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to control shortcut in electron
const globalShortcut = electron.globalShortcut;

const Menu = require("menu");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
          minWidth:800,
          minHeight: 600,
          width: 1280,
          height: 720
    });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);


// Shortcuts
// app.on('ready', function() {
//   // Register a 'CommandOrControl+X' shortcut listener.
//   var ret = globalShortcut.register('CommandOrControl+F', function() {
//     mainWindow.webContents.send('global-shortcut', 'FullScreen');
//   });
//   if (!ret) {
//     console.log('registration failed');
//   }
// });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Unregister Shortcuts on quit
// app.on('will-quit', function() {
//   // Unregister a shortcut.
//   globalShortcut.unregister('CommandOrControl+F');
//
//   // Unregister all shortcuts.
//   globalShortcut.unregisterAll();
// });

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("ready", function () {
    // Create the Application's main menu
    var name = app.getName();
    var template = [
        {
          label: 'Edit',
          submenu: [
            {
              label: 'Undo',
              accelerator: 'CmdOrCtrl+Z',
              role: 'undo'
            },
            {
              label: 'Redo',
              accelerator: 'Shift+CmdOrCtrl+Z',
              role: 'redo'
            },
            {
              type: 'separator'
            },
            {
              label: 'Cut',
              accelerator: 'CmdOrCtrl+X',
              role: 'cut'
            },
            {
              label: 'Copy',
              accelerator: 'CmdOrCtrl+C',
              role: 'copy'
            },
            {
              label: 'Paste',
              accelerator: 'CmdOrCtrl+V',
              role: 'paste'
            },
          ]
      },
      {
        label: 'View',
        submenu:  (process.env.NODE_ENV === 'development') ? [
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.reload();
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: (function() {
              if (process.platform == 'darwin')
                return 'Alt+Command+I';
              else
                return 'Ctrl+Shift+I';
            })(),
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.toggleDevTools();
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: (function() {
              if (process.platform == 'darwin')
                return 'Ctrl+Command+F';
              else
                return 'F11';
            })(),
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }] : [{
              label: 'Toggle Full Screen',
              accelerator: (function() {
                if (process.platform == 'darwin')
                  return 'Ctrl+Command+F';
                else
                  return 'F11';
              })(),
              click: function(item, focusedWindow) {
                if (focusedWindow)
                  focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
              }
       }]
      },
      {
        label: 'Window',
        role: 'window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
          },
          {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
          },
        ]
      },
      {
        label: 'Help',
        role: 'help',
        submenu: [
          {
            label: 'Send Issues',
            click: function() { require('electron').shell.openExternal('https://github.com/MichelKansou/SlideDeck/issues') }
          },
        ]
      },
    ];

    if (process.platform == 'darwin') {
      template.unshift({
        label: name,
        submenu: [
          {
            label: 'About ' + name,
            role: 'about',
            selector: 'orderFrontStandardAboutPanel'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          },
        ]
      });
      // Window menu.
      template[3].submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      );
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});
