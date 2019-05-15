import {store} from '../index';
import {AppEvents} from '../../common/events/app.events';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {ProjectService} from './project.service';
import {PrintConfigActions} from '../store/actions/print-config.actions';

// TODO return types
export class PreviewEventHandler {
    public static handle(event: AppEvents.types) {
        const dispatch = store.dispatch as AppThunkDispatchType;
        switch (event.type) {
            case AppEvents.TYPES.PREVIEW_SET_DIRECTORY: {
                const printConfig = ProjectService.getPrintConfig(event.payload);
                dispatch(PrintConfigActions.saveConfigSuccess(printConfig));
                dispatch(PreviewActions.refreshDebounced(event.payload));
                return;
            }
            case AppEvents.TYPES.PREVIEW_REFRESH: {
                dispatch(PreviewActions.refreshDebounced());
                return;
            }
        }
    }
}
