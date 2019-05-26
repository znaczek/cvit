import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {RenderStateInterface} from '../../interfaces/state/render-state.interface';
import {StatusEnum} from '../../../common/enums/status.enum';

export class RenderSelectors {
    private static getRenderState = (state: ApplicationStateInterface): RenderStateInterface => state.render;

    public static getMessage = createSelector(
        RenderSelectors.getRenderState,
        (state: RenderStateInterface): string => state.message,
    );

    public static getStatus = createSelector(
        RenderSelectors.getRenderState,
        (state: RenderStateInterface): StatusEnum => state.status,
    );

}
