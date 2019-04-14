import {AbstractWindow} from './abstract-window';
import {AbstractMenu} from '../menu/abstract-menu.';
import {AppEvents} from '../../common/events/app.events';
import {APP_EVENT} from '../../common/constants';
import {PreviewMenu} from '../menu/preview-menu';

export class PreviewWindow extends AbstractWindow {
    public directory: string;

    constructor(directory: string) {
        super();
        this.directory = directory;
    }

    protected handleEventBusEmit(event: AppEvents.types): void {
        switch (event.type) {
            case AppEvents.TYPES.PROJECT_OPEN: {
                this.window.webContents.send(APP_EVENT, new AppEvents.PreviewSetDirectory(event.payload));
                break;
            }
        }
    }

    protected onInit() {
        this.setupDevelopmentEnvironment();
    }

    protected getMenu(): AbstractMenu {
        return new PreviewMenu(this.window);
    }

    protected isApplicationMenu() {
        return false;
    }

    public get path() {
        return `file://${__dirname}/app.html?title=${encodeURIComponent('CV preview')}&preview=${this.directory}`;
    }
}
