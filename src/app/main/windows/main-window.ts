import {AbstractWindow} from './abstract-window';
import {default as MainMenu} from '../menu/main-menu';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {PreviewWindow} from './preview-window';
import {ipcMain} from 'electron';
import {APP_EVENT} from '../../common/constants';
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../service/event-bus';

export class MainWindow extends AbstractWindow {
    protected path = `file://${__dirname}/app.html?title=CVit`;

    private directory: string;

    private preview: PreviewWindow = null;

    protected onInit() {
        EventBus.subscribe((event: AppEvents.types) => {
            switch (event.type) {
                case AppEvents.TYPES.PREVIEW: {
                    if (this.preview) {
                        return null;
                    }
                    this.preview = new PreviewWindow(this.directory);
                    this.preview.open();
                    this.preview.onClose.addListener(PreviewWindow.CLOSE_EVENT, () => {
                        this.preview = null;
                    });
                    break;
                }
                case AppEvents.TYPES.PROJECT_OPEN: {
                    this.directory = event.payload;
                    if (this.preview) {
                        this.preview.close();
                        this.preview = null;
                    }
                    break;
                }
            }
        });

        ipcMain.on(APP_EVENT, (e: any, event: AppEvents.types) => EventBus.emit(event));
    }

    protected getMenu(): AppMenuInterface {
        return new MainMenu(this.window);
    }
}
