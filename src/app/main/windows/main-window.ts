import {AbstractWindow} from './abstract-window';
import {default as MainMenu} from '../menu/main-menu';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {PreviewWindow} from './preview-window';
import {ipcMain} from 'electron';
import {APP_EVENT} from '../../common/constants';
import * as appEvents from '../../common/events/app.events';
import {MainEventHandler} from '../service/main-event-handler';
import {MainStateInterface} from '../interfaces/main-state.interface';

export class MainWindow extends AbstractWindow {
    protected path = `file://${__dirname}/app.html?title=CVit`;

    private state: MainStateInterface = {
        directory: '',
    };

    private preview: PreviewWindow = null;

    protected onInit() {
        ipcMain.on(APP_EVENT, (e: any, action: appEvents.types) => this.state = MainEventHandler.handle(this.state, action));
    }

    protected getMenu(): AppMenuInterface {
        const menu = new MainMenu(this.window);
        menu.onPreview = () => {
            if (this.preview) {
                return null;
            }
            this.preview = new PreviewWindow();
            this.preview.window.setMenu(null);
            this.preview.directory = this.state.directory;
            this.preview.open();
            this.preview.onClose.addListener(PreviewWindow.CLOSE_EVENT, () => {
                this.preview = null;
            });
        };
        return menu
    }
}
