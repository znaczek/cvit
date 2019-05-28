import {MenuItemConstructorOptions} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AbstractMenu} from './abstract-menu.';
import {AppEvents} from '../../common/events/app.events';

export abstract class AbstractMainMenu extends AbstractMenu {

    protected getEditMenu(): MenuItemConstructorOptions[] {
        return [
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
        ];
    }

}
