import {AbstractMenu} from './abstract-menu.';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export class PreviewContextMenu extends AbstractMenu {

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        return [
            {
                label: 'Inspect element',
                click: () => {
                    this.window.webContents.inspectElement(this.params.x, this.params.y);
                }
            }
        ];
    }
}
