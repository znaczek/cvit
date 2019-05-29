import {APP_EVENT} from '../../common/constants';
import {AbstractMenu} from './abstract-menu.';
import {AppEvents} from '../../common/events/app.events';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export class PreviewMenu extends AbstractMenu {

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
                    {role: 'toggledevtools', accelerator: 'F12',},
                    {label: '&Close', role: 'close'}
                ]
            },
        ];
    }
}
