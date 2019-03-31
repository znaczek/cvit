import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {Template} from '../../models/template.model';
import {createSelector} from 'reselect';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';
import {OptionModel} from '../../../common/model/options-model';
import {ProjectsStateInterface} from '../../interfaces/state/projects-state.interface';

export class ProjectSelectors {
    private static getProjectState = (state: ApplicationStateInterface): ProjectsStateInterface => state.project;

    public static getDirectory = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectsStateInterface): string => state.directory,
    );

    public static getContent = createSelector(
        ProjectSelectors.getProjectState,
        (state: ProjectsStateInterface): string => state.content,
    );

}
