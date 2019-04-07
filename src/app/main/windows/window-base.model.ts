import {EventEmitter} from "events";
import {BrowserWindow} from "electron";
import {AppMenuInterface} from '../menu/app-menu.interface';

export abstract class WindowBaseModel {
    public window: BrowserWindow;
    public onClose: EventEmitter;

    protected width = 1024;
    protected height = 728;
    protected abstract path: string;

    public static CLOSE_EVENT = 'CLOSE_EVENT';

    constructor() {
        console.log(this.constructor.name);
        this.window = new BrowserWindow({
            show: false,
            width: this.width,
            height: this.height,
        });

        this.onClose = new EventEmitter();
    }
    public open() {

        this.window.loadURL(this.path);

        this.window.webContents.on('did-finish-load', () => {
            if (!this.window) {
                throw new Error(`"window: ${this.constructor.name}" is not defined'`);
            }

            this.window.show();
            this.window.focus();

        });

        this.window.on('closed', () => {
            this.window = null;
            this.onClose.emit(WindowBaseModel.CLOSE_EVENT);
        });

        const menu = this.getMenu();
        if (menu) {
            menu.buildMenu();
        }
    }

    protected abstract getMenu(): AppMenuInterface;

}
