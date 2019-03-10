import * as moment from 'moment';
import {GeneratorUtils} from '../../common/utils/generator.utils';

export interface CvModelInterface {
    id?: string;
    content?: string;
    createdAt?: moment.Moment;
    editedAt?: moment.Moment;
    description?: string;
}

export class CvModel implements Required<CvModelInterface> {
    public id: string;
    public content: string;
    public createdAt: moment.Moment;
    public editedAt: moment.Moment;
    public description: string;

    constructor(options?: CvModelInterface) {
        options = options || {};
        this.id = options.id || GeneratorUtils.uuid();
        this.description = options.description = '';
        this.createdAt = options.createdAt || moment();
        this.editedAt = options.editedAt || moment();
        this.content = options.content = '';
    }
}