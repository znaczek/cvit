import {ActionInterface} from '../interfaces/action.interface';

export const CREATE_NEW = 'CREATE_NEW';
export const OPEN = 'OPEN';
export const SAVE = 'SAVE';

export class CreateNew implements ActionInterface {
    public readonly type = CREATE_NEW;
    public readonly payload: any;
}

export class Open implements ActionInterface<string> {
    public readonly type = OPEN;
    public readonly payload: string;

    constructor(paths: string[]) {
        this.payload = paths ? paths[0] : null;
    }
}

export class Save implements ActionInterface {
    public readonly type = SAVE;
}

export type types = CreateNew | Open | Save;
