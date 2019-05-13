import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {ProjectStateInterface} from '../../interfaces/state/projects-state.interface';

export class ProjectSelectors {
    public static getProjectState = (state: ApplicationStateInterface): ProjectStateInterface => state.project;

    public static getDirectory = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectStateInterface): string => state.directory,
    );

    public static getHtml = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectStateInterface): string => state.html,
    );

    public static getStyles = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectStateInterface): string => state.styles,
    );

    public static getHeader = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectStateInterface): string => state.header,
    );

    public static getFooter = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectStateInterface): string => state.footer,
    );

    // TODO to remove if not used
    // public static getProject = createSelector(
    //     TemplatesSelectors.getTemplatesState,
    //     ProjectSelectors.getProjectState,
    //     (templateState: TemplatesStateInterface, projectState: ProjectStateInterface): string =>
    //         HtmlService.getFile(templateState.base, projectState.html)
    // )

}
