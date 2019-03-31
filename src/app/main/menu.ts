import {BrowserWindow, Menu, shell, dialog} from 'electron';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import * as appEvents from '../common/events/app.events';
import {APP_EVENT} from '../common/constants';

type menuType = ('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio');

// TODO adjust darwin template when menu is done
export default class MenuBuilder {

    constructor(private mainWindow: BrowserWindow) {
    }

    buildMenu() {
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

    setupDevelopmentEnvironment() {
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

    buildDarwinTemplate(): MenuItemConstructorOptions[] {
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

    buildDefaultTemplate(): MenuItemConstructorOptions[] {
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
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click: () => {
                            this.mainWindow.close();
                        }
                    }
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
