import {app, ipcMain} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import installer, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';
import {MainWindow} from './windows/main-window';
import {AppEvents} from '../common/events/app.events';
import {EventBus} from './event-bus';
import {APP_EVENT} from '../common/constants';

class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

const installExtensions = async () => {
    console.info('installing extensions');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS];

    return installer(extensions, forceDownload)
        .catch((e) => console.error('Error during installing extensions:' + JSON.stringify(e, null, 2)));
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    const mainWindow = new MainWindow();
    mainWindow.open();
    mainWindow.onClose.addListener(MainWindow.CLOSE_EVENT, app.quit);

    ipcMain.on(APP_EVENT, (e: any, event: AppEvents.types) => EventBus.emit(event));

    new AppUpdater();
});
