const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     authenticate: (username, password) => {
//         console.log(username);
//         ipcRenderer.send('authenticate', username, password)
//     },
//     onAuthResult: (callback) => ipcRenderer.on('auth-result', (event, result) => callback(result))
// });
// create electron apis for callback
contextBridge.exposeInMainWorld('electronAPI', {
    log: (message) => ipcRenderer.send('log-message', message),
    authenticate: (username, password) => ipcRenderer.send('authenticate', username, password),
    onAuthResult: (callback) => ipcRenderer.on('auth-result', (event, result) => callback(result)),
    calculate: (expression) => ipcRenderer.send('calculate', expression),
    onCalculationResult: (callback) => ipcRenderer.on('calculation-result', (event, result) => callback(result)),
    // onAuthResult: (callback) => ipcRenderer.on('calculation-result', (event, result) => callback(result)),

    // getImagePath: async () => await ipcRenderer.invoke('get-image-path')
});
// for images
contextBridge.exposeInMainWorld('electron', {
    getImagePath: async () => await ipcRenderer.invoke('get-image-path'),
});