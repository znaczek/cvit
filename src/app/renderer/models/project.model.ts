import {ProjectMetaInterface, ProjectMetaModel} from './project-meta.model';
import {CvModel, CvModelInterface} from './cv.model';

export interface ProjectInterface extends ProjectMetaInterface {
    list?: CvModelInterface[];
}

export class ProjectModel extends ProjectMetaModel implements Required<ProjectInterface> {
    public list: CvModelInterface[];

    constructor(options?: ProjectInterface) {
        options = options || {};
        super(options);
        this.list = (options.list || []).map((item) => new CvModel(item));

    }
}