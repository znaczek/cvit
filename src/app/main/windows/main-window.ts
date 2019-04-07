import {WindowBaseModel} from './window-base.model';
import {default as MainMenu} from '../menu/main-menu';
import {AppMenuInterface} from '../menu/app-menu.interface';
import {PreviewWindow} from './preview-window';

export class MainWindow extends WindowBaseModel {
    protected path = `file://${__dirname}/app.html`;

    preview: PreviewWindow = null;

    protected getMenu(): AppMenuInterface {
        const menu = new MainMenu(this.window);
        menu.onPreview = () => {
            if (this.preview) {
                return null;
            }
            this.preview = new PreviewWindow();
            this.preview.window.setMenu(null);
            this.preview.open();
            this.preview.onClose.addListener(PreviewWindow.CLOSE_EVENT, () => {
                this.preview = null;
            });
        };
        return menu
    }
}
