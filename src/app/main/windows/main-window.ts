import {AbstractWindow} from './abstract-window';
import {default as MainMenu} from '../menu/main-menu';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {PreviewWindow} from './preview-window';
import {AppEvents} from '../../common/events/app.events';

export class MainWindow extends AbstractWindow {
    protected path = `file://${__dirname}/app.html?title=CVit`;

    private directory: string;

    private preview: PreviewWindow = null;

    protected handleEventBusEmit(event: AppEvents.types): void {
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
                break;
            }
        }
    }

    protected getMenu(): AppMenuInterface {
        return new MainMenu(this.window);
    }
}
