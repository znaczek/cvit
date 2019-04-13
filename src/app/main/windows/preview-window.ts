import {AbstractWindow} from './abstract-window';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {AppEvents} from '../../common/events/app.events';
import {APP_EVENT} from '../../common/constants';

export class PreviewWindow extends AbstractWindow {
    public directory: string;

    constructor(directory: string) {
        super();
        this.window.setMenu(null);
        this.directory = directory;
    }

    protected handleEventBusEmit(event: AppEvents.types): void {
        switch (event.type) {
            case AppEvents.TYPES.PROJECT_OPEN: {
                this.window.webContents.send(APP_EVENT, new AppEvents.PreviewRefresh(event.payload));
                break;
            }
        }
    }

    protected getMenu(): AppMenuInterface {
        return null;
    }

    public get path() {
        return `file://${__dirname}/app.html?title=${encodeURIComponent('CV preview')}&preview=${this.directory}`;
    }
}
