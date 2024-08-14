const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
// const { Console } = require('console');

// const { remote } = require('electron');

// creating the Electron window
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
    // console.log('window electron api', window.electronAPI);
    // remote.getCurrentWindow().webContents.openDevTools();
}
// when window is ready
app.whenReady().then(() => {
    createWindow();
    // saving the log messages
    ipcMain.on('log-message', (event, message) => {
        const logFile = path.join(__dirname, 'renderer-logs.txt');
        fs.appendFileSync(logFile, `${new Date().toISOString()}: ${message}\n`);
    });
});

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
// for authentication
const exePath = path.join(__dirname, '..', '..', 'backend', 'authenticate.exe');

// IPC Communication to interact with the C++ backend
ipcMain.on('authenticate', (event, username, password) => {
    console.log('authenticate is', exePath);
    exec(`${exePath} ${username} ${password}`, (error, stdout, stderr) => {
        console.log('authenticate execution complete');
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        // console.log(event);
        event.reply('auth-result', stdout.trim());
    });
    console.log('exit ipcMain auth');
});

// for calculator

const calculatorPath = path.join(__dirname, '..', '..', 'backend', 'calculator.exe');

ipcMain.on('calculate', (event, expression) => {
    console.log('calculate is', calculatorPath);
    // const command = ;
    const executeCalculator = async (event, expression) => {
        await exec(`${calculatorPath} ${expression}`, (error, stdout, stderr) => {
            console.log('calculator execution complete');
            console.log(`${calculatorPath} ${expression}`)
            if (error) {
                console.error(`exec error: ${error}`);
                console.log(`exec error: ${error}`);
                // event.reply('calculation-result', 'error');
                return;

            }
            console.log(stdout);
            console.log(stderr);
            // event.reply('auth-result', stdout.trim());
            // console.log(window.electronAPI);
            var res = event.reply('calculation-result', stdout.trim());

            console.log(res);
        });
    }
    executeCalculator(event, expression);

    console.log('exit ipcMain calculate');
});


// Read package.json and get the imagePath
// giving absolute path to images
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')));
console.log('package path', path.join(__dirname, '../../package.json'));
const imagePath = packageJson.imagePath;
console.log('imagePath is in main', imagePath);
// Handle request for the image path
ipcMain.handle('get-image-path', () => {
    return imagePath;
});

// const { ipcRenderer } = require('electron');

// ipcRenderer.send('log-message', 'This is a log message from renderer.js');

// In the main process (main.js)
// const { ipcMain } = require('electron');
// const fs = require('fs');
