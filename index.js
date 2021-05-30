const { app, BrowserWindow } = require('electron')
const path = require('path')
const {autoUpdater} = require('electron-updater')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', function(){
  autoUpdater.checkForUpdates();

 console.log(appUpdater.checkForUpdates());

})

autoUpdater.on('checking-for-update', () => {
  console.log("Verificando atualização!")
})
autoUpdater.on('update-available', (info) => {
  console.log("Atualização Encontrada!")
  console.log(info);
})
autoUpdater.on('update-not-available', (info) => {
  console.log("Atualização não encontrada!")
  console.log(info);
})
autoUpdater.on('error', (err) => {
  console.log("Ocorreu um erro: ")
  console.log(err);
})
autoUpdater.on('download-progress', (progressObj) => {
  console.log("Atualização em download")
  console.log(progressObj);
})
autoUpdater.on('update-downloaded', (info) => {
  console.log("Download Terminado!")
  console.log(info);
  //autoUpdater.quitAndInstall();
})