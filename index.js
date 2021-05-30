const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
var mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", function () {
  //autoUpdater.checkForUpdates();
});

ipcMain.on("update-init", (event) => {
  autoUpdater
    .checkForUpdates()
    .then(() => (event.returnValue = true))
    .catch(() => (event.returnValue = false));
});

autoUpdater.on("checking-for-update", () => {
  console.log("Verificando atualização!");
  mainWindow.webContents.send(
    "update-checking",
    "Procurando atualização, aguarde!"
  );
});
autoUpdater.on("update-available", (info) => {
  console.log("Atualização Encontrada!");
  mainWindow.webContents.send("update-available", "Atualização disponivel");
});
autoUpdater.on("update-not-available", (info) => {
  console.log("Atualização não encontrada!");
  mainWindow.webContents.send(
    "update-not-available",
    "Atualização não disponivel"
  );
});
autoUpdater.on("error", (err) => {
  console.log("Ocorreu um erro: ");
  console.log(err);
});
autoUpdater.on("download-progress", (progressObj) => {
  console.log("Atualização em download");
  mainWindow.webContents.send("update-progress", progressObj);
});
autoUpdater.on("update-downloaded", (info) => {
  console.log("Download Terminado!");
  mainWindow.webContents.send("update-end-download", true);
});
ipcMain.on("update-install", (event) => {
  autoUpdater.quitAndInstall();
});
