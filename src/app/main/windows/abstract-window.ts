import {EventEmitter} from "events";
import {BrowserWindow, Menu} from "electron";
import {AbstractMenu} from '../menu/abstract-menu.';
import {Subscription} from '../../common/model/subscription.model';
import {AppEvents} from '../../common/events/app.events';
import {EventBus} from '../event-bus';
import {PATHS} from '../../renderer/paths';
import {ICON_FILE} from '../../common/constants';

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

        const menu = this.getMenu();
        if (menu) {
            menu.buildMenu(this.isApplicationMenu());
        }

        this.onInit();
        this.subscribeToEventBus();
    }

    public close() {
        this.window.close();
    }

    // TODO add context menu to main menu
    protected setupDevelopmentEnvironment(): void {
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

    protected abstract getMenu(): AbstractMenu;
    protected abstract isApplicationMenu(): boolean;
    protected onInit(): void {};
    protected handleEventBusEmit(event: AppEvents.types): void {};

    private subscribeToEventBus() {
        this.eventBusSubscription = EventBus.subscribe((event: AppEvents.types) => {
            this.handleEventBusEmit(event);
        });
    }
}
