const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load production dashboard or fallback to local dev
  const targetUrl = process.env.SAQYN_DESKTOP_URL || 'https://saqynrabt.com/dashboard';
  mainWindow.loadURL(targetUrl);

  // Apply strict CSP header listener on responses
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://clerk.saqynrabt.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://api.saqynrabt.com https://clerk.saqynrabt.com;"
        ],
      },
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open SAQYN RABT', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('SAQYN RABT Client');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createWindow();
  try {
    createTray();
  } catch (e) {
    console.log('Tray creation skipped, missing asset icon.png');
  }
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
