console.log("Attualizado");
const { ipcMain, ipcRenderer } = require("electron");
console.log(ipcRenderer.sendSync("update-init"));
ipcRenderer.on("update-checking", (event, arg) => console.log(arg));
ipcRenderer.on("update-available", (event, arg) => console.log(arg));
ipcRenderer.on("update-not-available", (event, arg) => console.log(arg));
ipcRenderer.on("update-progress", (event, arg) => console.log(arg));
ipcRenderer.on("update-end-download", (event, arg) =>
  arg
    ? (document.getElementById("updateInstall").style.display = "block")
    : console.log(arg)
);

function atualizar() {
  console.log(ipcRenderer.sendSync("update-install"));
}
