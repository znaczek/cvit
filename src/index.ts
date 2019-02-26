import {app, BrowserWindow} from 'electron';

let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({
        useContentSize: true,
    });
    win.maximize();
    win.loadFile('index.html');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
    })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
