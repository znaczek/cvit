import {RouterState} from "connected-react-router";
import {ProjectsStateInterface} from '../../renderer/interfaces/projects-state.interface';

export interface ApplicationStateInterface {
    router: RouterState,
    project: ProjectsStateInterface,
}