import {AbstractWindow} from './abstract-window';
import {MainMenu} from '../menu/main-menu';
import {AbstractMenu} from '../menu/abstract-menu.';
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
            case AppEvents.TYPES.RENDER: {
                break;
            }
            case AppEvents.TYPES.HEADER: {
                break;
            }
            case AppEvents.TYPES.FOOTER: {
                break;
            }
        }
    }

    protected onInit() {
        if (process.env.NODE_ENV === 'development') {
            this.setupDevelopmentEnvironment();
        }
    }

    protected getMenu(): AbstractMenu {
        return new MainMenu(this.window);
    }

    protected isApplicationMenu() {
        return true;
    }
}
