const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
// const { Console } = require('console');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // Make sure this path is correct
            nodeIntegration: false,  // Must be false for contextBridge to work
            contextIsolation: true,  // Must be true for contextBridge to work
        }

    });
    console.log('preload path is', path.join(__dirname, 'preload.js'));
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const exePath = path.join(__dirname, '..', '..', 'backend', 'authenticate.exe');

// IPC Communication to interact with the C++ backend
ipcMain.on('authenticate', (event, username, password) => {
    console.log('exepath is', exePath);
    exec(`${exePath} ${username} ${password}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        event.reply('auth-result', stdout.trim());
    });
});

const calculatorPath = path.join(__dirname, '..', '..', 'backend', 'calculator.exe');

ipcMain.on('calculate', (event, expression) => {
    console.log('calculate is', calculatorPath);
    // const command = ;

    exec(`${calculatorPath} ${expression}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            // event.reply('calculation-result', 'error');
            return;
        }
        event.reply('calculation-result', stdout.trim());
    });
});


// Read package.json and get the imagePath
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));
console.log('package path', path.join(__dirname, '../../package.json'));
const imagePath = packageJson.imagePath;
console.log('imagePath is in main', imagePath);
// Handle request for the image path
ipcMain.handle('get-image-path', () => {
    return imagePath;
});