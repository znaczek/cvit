import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {UiStateInterface} from '../../interfaces/state/UiStateInterface';

export class UiSelectors {
    private static getUiState = (state: ApplicationStateInterface): UiStateInterface => state.ui;

    public static getNewProjectPopupVisible = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): boolean => state.newProjectPopupVisible
    );

    public static getUndo = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): number => state.undo,
    );

    public static getRedo = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): number => state.redo,
    );

}
