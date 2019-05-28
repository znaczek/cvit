import {MenuItemConstructorOptions} from 'electron';
import {AbstractMainMenu} from './abstract-main-menu';

export class MainContextMenu extends AbstractMainMenu {

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        const inspectMenu = {
            label: 'Inspect element',
            click: () => {
                this.window.webContents.inspectElement(this.params.x, this.params.y);
            }
        };

        return process.env.NODE_ENV === 'development' ?
            [inspectMenu, ...this.getEditMenu()] :
            this.getEditMenu()
            ;
    }

}
