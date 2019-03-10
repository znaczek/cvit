import {Action} from 'redux';

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly CREATE_PROJECT = prefix + 'CREATE_PROJECT';

    public static createProject(): Action {
        return {
            type: ProjectActions.CREATE_PROJECT,
        }
    }

}