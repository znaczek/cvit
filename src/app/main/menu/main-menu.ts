import {BrowserWindow, Menu, shell, dialog} from 'electron';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import * as appEvents from '../../common/events/app.events';
import {APP_EVENT} from '../../common/constants';
import {AppMenuInterface} from './app-menu.interface';
import {PreviewWindow} from '../windows/preview-window';
import {Assertions} from '../../common/utils/assertion.utils';

// TODO adjust darwin template when menu is done
export default class MainMenu implements AppMenuInterface {

    public onPreview: () => void;

    constructor(private mainWindow: BrowserWindow) {
    }

    public buildMenu(): Menu {
        if (process.env.NODE_ENV === 'development') {
            this.setupDevelopmentEnvironment();
        }

        const template = process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    private setupDevelopmentEnvironment(): void {
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.webContents.inspectElement(x, y);
                    }
                }
            ]).popup({
                window: this.mainWindow,
            });
        });
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
                        click: () => this.mainWindow.webContents.send(APP_EVENT, new appEvents.CreateNew()),
                    },
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                        click: () => dialog.showOpenDialog({
                            title: 'No i witam',
                            properties: ['openDirectory'],
                        }, (paths) => this.mainWindow.webContents.send(APP_EVENT, new appEvents.Open(paths)))
                    },
                    {
                        label: '&Save',
                        accelerator: 'Ctrl+S',
                        click: () => this.mainWindow.webContents.send(APP_EVENT, new appEvents.Save())
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
                        click: () => this.mainWindow.webContents.send(APP_EVENT, new appEvents.Undo())
                    },
                    {
                        label: 'Redo',
                        accelerator: 'Ctrl+Shift+Z',
                        click: () => this.mainWindow.webContents.send(APP_EVENT, new appEvents.Redo())
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
                            if (this.onPreview && Assertions.isFunction(this.onPreview)) {
                                this.onPreview();
                            }
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
