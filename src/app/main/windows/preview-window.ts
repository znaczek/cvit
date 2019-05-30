import {AbstractWindow} from './abstract-window';
import {AbstractMenu} from '../menu/abstract-menu.';
import {AppEvents} from '../../common/events/app.events';
import {APP_EVENT} from '../../common/constants';
import {PreviewMenu} from '../menu/preview-menu';
import {MainContextMenu} from '../menu/main-context-menu';
import ContextMenuParams = Electron.ContextMenuParams;
import {PreviewContextMenu} from '../menu/preview-context-menu';

export class PreviewWindow extends AbstractWindow {
    public directory: string;

    constructor(directory: string) {
        super();
        this.directory = directory;
    }

    protected handleEventBusEmit(event: AppEvents.types): void {
        switch (event.type) {
            case AppEvents.TYPES.REFRESH_PREVIEW: {
                this.window.webContents.send(APP_EVENT, new AppEvents.PreviewSetDirectory(event.payload));
                break;
            }
            case AppEvents.TYPES.PREVIEW: {
                this.window.focus();
                break;
            }
        }
    }

    protected getMenu(): AbstractMenu {
        return new PreviewMenu(this.window);
    }

    protected hasContextMenu() {
        return true;
    }

    protected getContextMenu(params: ContextMenuParams): AbstractMenu {
        return new PreviewContextMenu(this.window, params);
    }

    public get path() {
        return `file://${__dirname}/app.html?title=${encodeURIComponent('CV preview')}&preview=${this.directory}`;
    }
}
