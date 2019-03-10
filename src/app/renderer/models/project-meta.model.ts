import {CvModelInterface} from './cv.model';
import * as moment from 'moment';
import {GeneratorUtils} from '../../common/utils/generator.utils';

export interface ProjectMetaInterface {
    id?: string,
    createdAt?: moment.Moment;
    author?: string,
    description?: string;
}

export class ProjectMetaModel implements Required<ProjectMetaInterface> {
    public id: string;
    public list: CvModelInterface[];
    public createdAt: moment.Moment;
    public author: string;
    public description: string;

    constructor(options: ProjectMetaInterface = {}) {
        this.id = options.id || GeneratorUtils.uuid();
        this.createdAt = options.createdAt || moment();
        this.author = options.author = '';
        this.description = options.description = '';
    }
}