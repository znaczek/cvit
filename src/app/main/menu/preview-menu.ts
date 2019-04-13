import {dialog} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AbstractMenu} from './abstract-menu.';
import {AppEvents} from '../../common/events/app.events';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

// TODO adjust darwin template when menu is done
export class PreviewMenu extends AbstractMenu {

    protected buildDarwinTemplate(): MenuItemConstructorOptions[] {
        return [];
    }

    protected buildDefaultTemplate(): MenuItemConstructorOptions[] {
        return [
            {
                label: '&Menu',
                submenu: [
                    {
                        label: '&Refresh',
                        accelerator: 'Ctrl+R',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.PreviewRefresh()),
                    },
                    {
                        label: '&Console',
                        accelerator: 'Alt+Ctrl+F12',
                        click: () => this.window.webContents.send(APP_EVENT, new AppEvents.PreviewRefresh()),
                    },
                    {label: '&Close', role: 'close'}
                ]
            },
        ];
    }
}
