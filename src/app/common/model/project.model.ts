import {ProjectStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {ProjectDataInterface} from '../../renderer/interfaces/state/project-data.interface';

export class ProjectModel implements Required<ProjectDataInterface> {
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

