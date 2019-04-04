import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';
import {ProjectsStateInterface} from '../../interfaces/state/projects-state.interface';
import {ProjectService} from '../../service/project-service';
import {TemplatesSelectors} from './templates.selectors';

export class ProjectSelectors {
    private static getProjectState = (state: ApplicationStateInterface): ProjectsStateInterface => state.project;

    public static getDirectory = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectsStateInterface): string => state.directory,
    );

    public static getHtml = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectsStateInterface): string => state.html,
    );

    public static getStyles = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectsStateInterface): string => state.styles,
    );

    public static getProject = createSelector(
        TemplatesSelectors.getTemplatesState,
        ProjectSelectors.getProjectState,
        (templateState: TemplatesStateInterface, projectState: ProjectsStateInterface): string =>
            ProjectService.getProject(templateState.base, projectState.html, projectState.styles)
    )

}
