import {dialog, MenuItemConstructorOptions, shell} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AbstractMenu} from './abstract-menu.';
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../event-bus';
import {MainWindow} from '../windows/main-window';

// TODO adjust darwin template when menu is done
export class MainMenu extends AbstractMenu {

    protected buildDarwinTemplate(): MenuItemConstructorOptions[] {
        return [];
    }

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
                    {label: '&Close', role: 'close'}
                ]
            },
            {
                label: '&Edit',
                submenu: [
                    {
                        label: 'Undo',
                        accelerator: 'Ctrl+Z',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.Undo())
                    },
                    {
                        label: 'Redo',
                        accelerator: 'Ctrl+Shift+Z',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.Redo())
                    },
                    {role: 'cut', label: 'Cut'},
                    {role: 'copy', label: 'Copy'},
                    {role: 'paste', label: 'Paste'},
                    {role: 'delete', label: 'Delete'},
                    {role: 'selectall', label: 'Select all'},
                ]
            },
            {
                label: '&Project',
                submenu: [
                    {
                        label: '&Preview',
                        click: () => EventBus.emit(new AppEvents.Preview()),
                    },
                    {
                        label: '&Print config',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.ShowPrintConfig())
                    },
                    {
                        label: '&Render',
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
                            shell.openExternal('https://electronjs.org');
                        }
                    },
                ]
            }
        ];
    }

}
