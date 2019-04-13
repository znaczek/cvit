import {ProjectsStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {TemplatesStateInterface} from '../../renderer/interfaces/state/templates-state.interface';
import {UiStateInterface} from '../../renderer/interfaces/state/ui-state.interface';
import {PreviewStateInterface} from '../../renderer/interfaces/state/preview-state.interface';
import {RouterState} from 'connected-react-router';

export interface ApplicationStateInterface {
    router: RouterState,
    ui: UiStateInterface,
    templates: TemplatesStateInterface,
    project: ProjectsStateInterface,
    preview: PreviewStateInterface,
}
