import {ActionInterface} from '../interfaces/action.interface';

export namespace AppEvents {
    export enum TYPES {
        CREATE_NEW = 'CREATE_NEW',
        OPEN = 'OPEN',
        SAVE = 'SAVE',
        UNDO = 'UNDO',
        REDO = 'REDO',

        PROJECT_OPEN = 'PROJECT_OPEN',

        PREVIEW = 'PREVIEW',
        PREVIEW_REFRESH = 'PREVIEW_REFRESH',
        PREVIEW_SET_DIRECTORY = 'PREVIEW_SET_DIRECTORY',
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

    export class ProjectOpen implements ActionInterface<string> {
        public readonly type = TYPES.PROJECT_OPEN;
        public readonly payload: string;

        constructor(directory: string) {
            this.payload = directory
        }
    }

    export class Preview implements ActionInterface {
        public readonly type = TYPES.PREVIEW;
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

    export type types = CreateNew | Open | Save | Undo | Redo
        | ProjectOpen
        | Preview | PreviewRefresh | PreviewSetDirectory
        ;
}
