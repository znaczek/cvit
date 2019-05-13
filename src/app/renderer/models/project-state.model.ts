import {ProjectStateInterface} from '../interfaces/state/projects-state.interface';
import {ProjectModel} from './project.model';

export class ProjectStateModel extends ProjectModel implements Required<ProjectStateInterface> {
    public directory: string;

    constructor(options: Partial<ProjectStateInterface>) {
        options = options || {};
        super(options);
        this.directory = options.directory || '';
    }
}
