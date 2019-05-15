import {ActionInterface} from '../interfaces/action.interface';

export namespace AppEvents {
    export enum TYPES {
        CREATE_NEW = 'CREATE_NEW',
        OPEN = 'OPEN',
        SAVE = 'SAVE',
        UNDO = 'UNDO',
        REDO = 'REDO',

        REFRESH_PREVIEW = 'REFRESH_PREVIEW',

        PREVIEW = 'PREVIEW',
        PREVIEW_REFRESH = 'PREVIEW_REFRESH',
        PREVIEW_SET_DIRECTORY = 'PREVIEW_SET_DIRECTORY',

        SHOW_PRINT_CONFIG = 'SHOW_PRINT_CONFIG',

        RENDER = 'RENDER',
    }

    export class CreateNew implements ActionInterface {
        public readonly type = TYPES.CREATE_NEW;
        public readonly payload: any;
    }

    export class Open implements ActionInterface<string> {
        public readonly type = TYPES.OPEN;
        public readonly payload: string;

        constructor(paths: string[]) {
            this.payload = paths ? paths[0] : null;
        }
    }

    export class Save implements ActionInterface {
        public readonly type = TYPES.SAVE;
    }

    export class Undo implements ActionInterface {
        public readonly type = TYPES.UNDO;
    }

    export class Redo implements ActionInterface {
        public readonly type = TYPES.REDO;
    }

    export class RefreshPreview implements ActionInterface<string> {
        public readonly type = TYPES.REFRESH_PREVIEW;
        public readonly payload: string;

        constructor(directory: string) {
            this.payload = directory
        }
    }

    export class Preview implements ActionInterface {
        public readonly type = TYPES.PREVIEW;
    }

    export class ShowPrintConfig implements ActionInterface {
        public readonly type = TYPES.SHOW_PRINT_CONFIG;
    }

    export class PreviewSetDirectory implements ActionInterface<string> {
        public readonly type = TYPES.PREVIEW_SET_DIRECTORY;
        public readonly payload: string;

        constructor(directory?: string) {
            this.payload = directory;
        }
    }

    export class PreviewRefresh implements ActionInterface {
        public readonly type = TYPES.PREVIEW_REFRESH;
    }

    export class Render implements ActionInterface {
        public readonly type = TYPES.RENDER;
    }

    export type types = CreateNew | Open | Save | Undo | Redo
        | RefreshPreview
        | Preview | PreviewRefresh | PreviewSetDirectory
        | Render
        | ShowPrintConfig
        ;
}
