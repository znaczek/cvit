import {EventEmitter} from "events";
import {BrowserWindow, Menu} from "electron";
import {AbstractMenu} from '../menu/abstract-menu.';
import {Subscription} from '../../common/model/subscription.model';
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../event-bus';
import {PATHS} from '../../renderer/paths';
import {ICON_FILE} from '../../common/constants';
import ContextMenuParams = Electron.ContextMenuParams;

export abstract class AbstractWindow {
    public static CLOSE_EVENT = 'CLOSE_EVENT';

    public window: BrowserWindow;
    public onClose: EventEmitter;

    protected width = 1024;
    protected height = 728;
    protected abstract path: string;

    protected eventBusSubscription: Subscription;

    constructor() {
        this.window = new BrowserWindow({
            show: false,
            width: this.width,
            height: this.height,
            icon: PATHS.ROOT +  '/' + ICON_FILE,
        });
        this.onClose = new EventEmitter();
    }

    public open() {

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
            this.eventBusSubscription.unsubscribe();
            this.onClose.emit(AbstractWindow.CLOSE_EVENT);
        });

        this.window.loadURL(this.path);

        const mainMenu = this.getMenu();
        if (mainMenu) {
            const menu = mainMenu.buildMenu();
            if (this.isApplicationMenu()) {
                Menu.setApplicationMenu(menu);
            } else {
                this.window.setMenu(menu);
            }
        }

        if (this.hasContextMenu()) {
            this.window.webContents.on('context-menu', (e, params) => {
                const menu = this.getContextMenu(params);
                menu.buildMenu().popup({
                    window: this.window,
                });
            });
        }

        this.onInit();
        this.subscribeToEventBus();
    }

    public close() {
        this.window.close();
    }

    protected getMenu(): AbstractMenu {
        return null;
    };
    protected getContextMenu(props: ContextMenuParams): AbstractMenu {
        return null;
    }
    protected hasContextMenu(): boolean {
        return false;
    }
    protected isApplicationMenu(): boolean {
        return false;
    }
    protected onInit(): void {};
    protected handleEventBusEmit(event: AppEvents.types): void {};

    private subscribeToEventBus() {
        this.eventBusSubscription = EventBus.subscribe((event: AppEvents.types) => {
            this.handleEventBusEmit(event);
        });
    }
}
