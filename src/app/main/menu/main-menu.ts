import {dialog, MenuItemConstructorOptions, shell} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../event-bus';
import {MainWindow} from '../windows/main-window';
import {AbstractMainMenu} from './abstract-main-menu';

export class MainMenu extends AbstractMainMenu {

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        return [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&New',
                        accelerator: 'Ctrl+N',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.CreateNew()),
                    },
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                        click: () => dialog.showOpenDialog({
                            title: 'No i witam',
                            properties: ['openDirectory'],
                        }, (paths) => this.window.webContents.send(APP_EVENT, new AppEvents.Open(paths)))
                    },
                    {
                        label: '&Save',
                        accelerator: 'Ctrl+S',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.Save())
                    },
                    {type: 'separator'},
                    {label: '&Close', role: 'close'}
                ]
            },
            {
                label: '&Edit',
                submenu: this.getEditMenu(),
            },
            {
                label: '&Project',
                submenu: [
                    {
                        label: '&Print config',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.ShowPrintConfig())
                    },
                    {type: 'separator'},
                    {
                        label: '&Preview',
                        accelerator: 'Alt+Ctrl+P',
                        click: () => EventBus.emit(new AppEvents.Preview()),
                    },
                    {
                        label: '&Render',
                        accelerator: 'Alt+Ctrl+R',
                        click: () => {
                            if (MainWindow.checkRenderCommand()) {
                                this.window.webContents.send(APP_EVENT, new AppEvents.Render());
                            }
                        },
                    },
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'About CVIt',
                        click() {
                            shell.openExternal('https://github.com/znaczek/cvit');
                        }
                    },
                ]
            },
        ];
    }

}
