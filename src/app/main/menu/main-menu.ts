import {BrowserWindow, dialog, Menu, shell} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AppMenuInterface} from './app-menu.interface';
import {Assertions} from '../../common/utils/assertion.utils';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../service/event-bus';

// TODO adjust darwin template when menu is done
export default class MainMenu implements AppMenuInterface {

    constructor(private window: BrowserWindow) {
    }

    public buildMenu(): Menu {
        const template = process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    private buildDarwinTemplate(): MenuItemConstructorOptions[] {
        const subMenuAbout = {
            label: 'Electron',
            submenu: [
                {
                    label: 'About ElectronReact',
                    selector: 'orderFrontStandardAboutPanel:'
                }
            ]
        };

        return [subMenuAbout];
    }

    private buildDefaultTemplate(): MenuItemConstructorOptions[] {
        const templateDefault = [
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
                label: '&Window',
                submenu: [
                    {
                        label: '&Preview',
                        click: () => {
                            EventBus.emit(new AppEvents.Preview())
                        },
                    },
                    {
                        label: '&Render',
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

        return templateDefault;
    }
}
