import {Dispatch} from 'redux';
import {PATHS} from '../../paths';
import {ActionInterface} from '../../../common/interfaces/action.interface';
import {CV_FILE_NAME} from '../../../common/constants';
import {Template} from '../../models/template.model';

const fs = require('sb-fs');

const prefix = '[PROJECT] ';

export class ProjectActions {
    public static readonly CREATE_PROJECT_SUCCESS = prefix + 'CREATE_PROJECT_SUCCESS';
    public static readonly CREATE_PROJECT_FAILURE = prefix + 'CREATE_PROJECT_FAILURE';

    public static createProject() {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            const templates: Template[] = [];
            try {
                const templateNames = await fs.readdir(PATHS.TEMPLATES);
                for (let i = 0; i < templateNames.length; i += 1) {
                    const content = await fs.readFile(`${PATHS.TEMPLATES}/${templateNames[i]}/${CV_FILE_NAME}`);
                    templates.push(new Template({
                        name: templateNames[i],
                        content: (content || []).reduce((curr: Buffer, acc: string) => acc + Buffer.from(curr).toString(), ''),
                    }));
                }
            } catch(e) {
                dispatch(ProjectActions.createProjectFailure(e));
                return;
            }
            dispatch(ProjectActions.createProjectSuccess(templates));
        }
    }

    public static createProjectSuccess(payload: Template[]): ActionInterface<Template[]> {
        return {
            type: ProjectActions.CREATE_PROJECT_SUCCESS,
            payload
        }
    }

    public static createProjectFailure(e: any): ActionInterface<any> {
        return {
            type: ProjectActions.CREATE_PROJECT_FAILURE,
            payload: e,
        }
    }

}