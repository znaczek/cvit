import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {PreviewStateInterface} from '../../interfaces/state/preview-state.interface';

export class PreviewSelectors {
    private static getPreviewState = (state: ApplicationStateInterface): PreviewStateInterface => state.preview;

    public static getDirectory = createSelector(
        PreviewSelectors.getPreviewState,
        (state: PreviewStateInterface): string => state.directory,
    );

    public static getLoader = createSelector(
        PreviewSelectors.getPreviewState,
        (state: PreviewStateInterface): boolean => state.loader,
    );

    public static getTs = createSelector(
        PreviewSelectors.getPreviewState,
        (state: PreviewStateInterface): number => state.ts,
    );

}
