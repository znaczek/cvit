import {store} from '../index';
import {AppEvents} from '../../common/events/app.events';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {PrintConfigActions} from '../store/actions/print-config.actions';
import {PrintConfigService} from '../../common/services/print-config.service';

export class PreviewEventHandler {
    public static handle(event: AppEvents.types): void {
        const dispatch = store.dispatch as AppThunkDispatchType;
        switch (event.type) {
            case AppEvents.TYPES.PREVIEW_SET_DIRECTORY: {
                const printConfig = PrintConfigService.getPrintConfig(event.payload);
                dispatch(PrintConfigActions.saveConfigSuccess(printConfig));
                dispatch(PreviewActions.refreshDebounced(event.payload));
                break;
            }
            case AppEvents.TYPES.PREVIEW_REFRESH: {
                dispatch(PreviewActions.refreshDebounced());
                break;
            }
        }
    }
}
