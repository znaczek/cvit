import {RouterState} from "connected-react-router";
import {ProjectsStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {TemplatesStateInterface} from '../../renderer/interfaces/state/templates-state.interface';
import {UiStateInterface} from '../../renderer/interfaces/state/UiStateInterface';

export interface ApplicationStateInterface {
    router: RouterState,
    ui: UiStateInterface,
    templates: TemplatesStateInterface,
    project: ProjectsStateInterface,
}
