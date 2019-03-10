import {ActionInterface} from '../interfaces/action.interface';

export const CREATE_NEW = 'CREATE_NEW';

export class CreateNew implements ActionInterface {
    public readonly type = CREATE_NEW;
}

export type types = CreateNew;