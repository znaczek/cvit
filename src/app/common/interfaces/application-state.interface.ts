import {RouterState} from "connected-react-router";
import {ProjectsStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {TemplatesStateInterface} from '../../renderer/interfaces/state/templates-state.interface';

export interface ApplicationStateInterface {
    router: RouterState,
    templates: TemplatesStateInterface,
    project: ProjectsStateInterface,
}