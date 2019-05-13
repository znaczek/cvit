import {ProjectsStateInterface} from '../interfaces/state/projects-state.interface';

export class ProjectModel implements Required<ProjectsStateInterface> {
    public directory: string;
    public html: string;
    public styles: string;
    public header: string;
    public footer: string;

    constructor(options: Partial<ProjectsStateInterface>) {
        options = options || {};
        this.directory = options.directory || '';
        this.html = options.html || '';
        this.styles = options.styles || '';
        this.header = options.header || '';
        this.footer = options.footer || '';
    }
}
