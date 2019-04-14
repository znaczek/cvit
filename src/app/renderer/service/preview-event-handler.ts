import {store} from '../index';
import {AppEvents} from '../../common/events/app.events';
import {PreviewActions} from '../store/actions/preview.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';

export class PreviewEventHandler {
    public static handle(event: AppEvents.types) {
        const dispatch = store.dispatch as AppThunkDispatchType;
        switch (event.type) {
            case AppEvents.TYPES.PREVIEW_SET_DIRECTORY: {
                dispatch(PreviewActions.refresh(event.payload));
                return;
            }
            case AppEvents.TYPES.PREVIEW_REFRESH: {
                dispatch(PreviewActions.refresh());
                return;
            }
        }
    }
}
