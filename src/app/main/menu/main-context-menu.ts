import {MenuItemConstructorOptions} from 'electron';
import {AbstractMainMenu} from './abstract-main-menu';

export class MainContextMenu extends AbstractMainMenu {

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        return process.env.NODE_ENV === 'development' ?
            [
                {
                    label: 'Inspect element',
                    click: () => {
                        this.window.webContents.inspectElement(this.params.x, this.params.y);
                    }
                },
                {type: 'separator'},
                ...this.getEditMenu()] :
            this.getEditMenu()
            ;
    }

}
