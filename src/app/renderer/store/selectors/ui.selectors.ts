import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {UiStateInterface} from '../../interfaces/state/ui-state.interface';

export class UiSelectors {
    private static getUiState = (state: ApplicationStateInterface): UiStateInterface => state.ui;

    public static getNewProjectPopupVisible = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): boolean => state.newProjectPopupVisible
    );

    public static getPrintConfigPopupVisible = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): boolean => state.printConfigVisible
    );

    public static getRenderPopupVisible = createSelector(
        UiSelectors.getUiState,
        (state: UiStateInterface): boolean => state.renderPopupVisible
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
