import {AbstractWindow} from './abstract-window';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {AppEvents} from '../../common/events/app.events';

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
                console.log('NO I WITAMW PREVIEW');
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
