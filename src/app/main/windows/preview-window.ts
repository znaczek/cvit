import {WindowBaseModel} from './window-base.model';
import {AppMenuInterface} from '../menu/app-menu.interface';

export class PreviewWindow extends WindowBaseModel {
    protected path = `file://${__dirname}/app.html`;

    protected getMenu(): AppMenuInterface {
        return null;
    }
}
