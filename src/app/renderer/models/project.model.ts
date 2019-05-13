import {ProjectStateInterface} from '../interfaces/state/projects-state.interface';
import {ProjectInterface} from '../interfaces/state/project.interface';

export class ProjectModel implements Required<ProjectInterface> {
    public html: string;
    public styles: string;
    public header: string;
    public footer: string;

    constructor(options: Partial<ProjectStateInterface>) {
        options = options || {};
        this.html = options.html || '';
        this.styles = options.styles || '';
        this.header = options.header || '';
        this.footer = options.footer || '';
    }
}
