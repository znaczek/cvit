import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {ProjectsStateInterface} from '../../interfaces/projects-state.interface';
import {Template} from '../../models/template.model';
import {createSelector} from 'reselect';

export class ProjectSelectors {
    private static getProjectsState = (state: ApplicationStateInterface): ProjectsStateInterface => state.project;

    public static getTemplates = createSelector(
        ProjectSelectors.getProjectsState,
        (state: ProjectsStateInterface): Template[] => (state.templates || []).map((item) => new Template(item)),
    );

}