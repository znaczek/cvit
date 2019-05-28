import {BrowserWindow, Menu} from "electron";
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import ContextMenuParams = Electron.ContextMenuParams;

export abstract class AbstractMenu {
    protected window: BrowserWindow;
    protected params: ContextMenuParams;

    constructor(window: BrowserWindow, params?: ContextMenuParams) {
        this.window = window;
        this.params = params;
    }

    public buildMenu(): Menu {
        const template = process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate();

        return Menu.buildFromTemplate(template);
    }

    protected buildDarwinTemplate(): MenuItemConstructorOptions[] {
        return [];
    }

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        return [];
    }

}

