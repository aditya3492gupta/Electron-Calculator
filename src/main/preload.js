const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     authenticate: (username, password) => {
//         console.log(username);
//         ipcRenderer.send('authenticate', username, password)
//     },
//     onAuthResult: (callback) => ipcRenderer.on('auth-result', (event, result) => callback(result))
// });
contextBridge.exposeInMainWorld('electronAPI', {
    authenticate: (username, password) => ipcRenderer.send('authenticate', username, password),
    onAuthResult: (callback) => ipcRenderer.on('auth-result', (event, result) => callback(result)),
    calculate: (expression) => ipcRenderer.send('calculate', expression),
    onCalculationResult: (callback) => ipcRenderer.on('calculation-result', (event, result) => callback(result)),
    // getImagePath: async () => await ipcRenderer.invoke('get-image-path')
});

contextBridge.exposeInMainWorld('electron', {
    getImagePath: async () => await ipcRenderer.invoke('get-image-path'),
});