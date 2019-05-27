import {ProjectStateInterface} from '../interfaces/state/projects-state.interface';
import {ProjectModel} from './project.model';

export class ProjectStateModel extends ProjectModel implements Required<ProjectStateInterface> {
    public directory: string;
    public dirty: boolean;

    constructor(options: Partial<ProjectStateInterface>) {
        options = options || {};
        super(options);
        this.directory = options.directory || '';
        this.dirty = options.dirty === true;
    }
}
