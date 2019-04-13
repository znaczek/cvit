import {BrowserWindow, Menu} from "electron";
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export abstract class AbstractMenu {
    protected window: BrowserWindow;

    constructor(window: BrowserWindow) {
        this.window = window;
    }

    public buildMenu(applicationMenu: boolean = false): Menu {
        const template = process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        if (applicationMenu) {
            Menu.setApplicationMenu(menu);
        } else {
            this.window.setMenu(menu);
        }

        return menu;
    }

    protected abstract buildDarwinTemplate(): MenuItemConstructorOptions[];

    protected abstract buildDefaultTemplate(): MenuItemConstructorOptions[];

}

