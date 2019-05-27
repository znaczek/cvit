import {AbstractWindow} from './abstract-window';
import {MainMenu} from '../menu/main-menu';
import {AbstractMenu} from '../menu/abstract-menu.';
import {PreviewWindow} from './preview-window';
import {AppEvents} from '../../common/events/app.events';
import * as commandExists from 'command-exists';
import {RENDER_COMMAND} from '../../common/constants';
import {dialog} from "electron";

export class MainWindow extends AbstractWindow {

    public static checkRenderCommand(): boolean {
        if (!commandExists.sync(RENDER_COMMAND)) {
            dialog.showErrorBox(
                'Runtime error',
                'Renderer program "wkthmltopdf" not found.\n\r' +
                'You can continue working on document, but you won\'t be able to render it.\n\r' +
                'Please check PATH variable or install wkhtmltopdf under:\n\r\n\r' +
                'https://wkhtmltopdf.org/downloads.html'
            );
            return false;
        }
        return true;
    }
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
            case AppEvents.TYPES.REFRESH_PREVIEW: {
                this.directory = event.payload;
                break;
            }
        }
    }

    protected onInit() {
        if (process.env.NODE_ENV === 'development') {
            this.setupDevelopmentEnvironment();
        }

        setTimeout(MainWindow.checkRenderCommand, 3000);
    }

    protected getMenu(): AbstractMenu {
        return new MainMenu(this.window);
    }

    protected isApplicationMenu() {
        return true;
    }
}
