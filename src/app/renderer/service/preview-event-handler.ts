import {store} from '../index';
import {AppEvents} from '../../common/events/app.events';
import {PreviewActions} from '../store/actions/preview.actions';

export class PreviewEventHandler {
    public static handle(event: AppEvents.types) {
        const {dispatch} = store;
        switch (event.type) {
            case AppEvents.TYPES.PREVIEW_REFRESH: {
                dispatch(PreviewActions.setFile(event.payload));
                return;
            }
        }
    }
}
