import {AbstractWindow} from './abstract-window';
import {AppMenuInterface} from '../menu/app-menu.interface';

export class PreviewWindow extends AbstractWindow {
    public directory: string;

    protected getMenu(): AppMenuInterface {
        return null;
    }

    public get path() {
        return `file://${__dirname}/app.html?title=${encodeURIComponent('CV preview')}&preview=${this.directory}`;
    }
}
