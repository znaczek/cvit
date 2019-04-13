import {EventEmitter} from "events";
import {BrowserWindow, Menu} from "electron";
import {AppMenuInterface} from '../menu/app-menu.interface';

export abstract class AbstractWindow {
    public window: BrowserWindow;
    public onClose: EventEmitter;

    protected width = 1024;
    protected height = 728;
    protected abstract path: string;

    public static CLOSE_EVENT = 'CLOSE_EVENT';

    constructor() {
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
        if (process.env.NODE_ENV === 'development') {
            // this.window.webContents.openDevTools();
        }

        this.window.on('closed', () => {
            this.window = null;
            this.onClose.emit(AbstractWindow.CLOSE_EVENT);
        });

        const menu = this.getMenu();
        if (menu) {
            menu.buildMenu();
        }

        if (process.env.NODE_ENV === 'development') {
            this.setupDevelopmentEnvironment();
        }

        this.onInit();
    }

    public close() {
        this.window.close();
    }

    private setupDevelopmentEnvironment(): void {
        this.window.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.window.webContents.inspectElement(x, y);
                    }
                }
            ]).popup({
                window: this.window,
            });
        });
    }

    protected abstract getMenu(): AppMenuInterface;
    protected onInit() {};

}
