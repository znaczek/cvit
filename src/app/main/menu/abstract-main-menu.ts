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
            {type: 'separator'},
            {role: 'cut', label: 'Cut', accelerator: 'Ctrl+X'},
            {role: 'copy', label: 'Copy', accelerator: 'Ctrl+C'},
            {role: 'paste', label: 'Paste', accelerator: 'Ctrl+V'},
            {role: 'delete', label: 'Delete', accelerator: 'Delete'},
            {type: 'separator'},
            {role: 'selectall', label: 'Select all'},
        ];
    }

}
