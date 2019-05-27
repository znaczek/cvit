import {ProjectStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {TemplatesStateInterface} from '../../renderer/interfaces/state/templates-state.interface';
import {UiStateInterface} from '../../renderer/interfaces/state/ui-state.interface';
import {PreviewStateInterface} from '../../renderer/interfaces/state/preview-state.interface';
import {PrintConfigStateInterface} from '../../renderer/interfaces/state/print-config-state.interface';
import {RenderStateInterface} from '../../renderer/interfaces/state/render-state.interface';

export interface ApplicationStateInterface {
    ui: UiStateInterface,
    templates: TemplatesStateInterface,
    project: ProjectStateInterface,
    printConfig: PrintConfigStateInterface,
    preview: PreviewStateInterface,
    render: RenderStateInterface,
}
