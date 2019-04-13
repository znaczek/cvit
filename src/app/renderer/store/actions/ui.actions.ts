const prefix = '[UI] ';

export class UiActions {
    public static readonly CLOSE_CREATE_PROJECT_POPUP = prefix + 'CLOSE_CREATE_PROJECT_POPUP';
    public static readonly UNDO = prefix + 'UNDO';
    public static readonly REDO = prefix + 'REDO';

    public static closeCreateProjectPopup() {
        return {
            type: UiActions.CLOSE_CREATE_PROJECT_POPUP,
        }
    }

    public static undo() {
        return {
            type: UiActions.UNDO,
        }
    }

    public static redo() {
        return {
            type: UiActions.REDO,
        }
    }

}
