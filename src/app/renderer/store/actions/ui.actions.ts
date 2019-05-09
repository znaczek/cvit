const prefix = '[UI] ';

export class UiActions {
    public static readonly CLOSE_CREATE_PROJECT_POPUP = prefix + 'CLOSE_CREATE_PROJECT_POPUP';

    public static readonly OPEN_PRINT_CONFIG_POPUP = prefix + 'OPEN_PRINT_CONFIG_POPUPP';
    public static readonly CLOSE_PRINT_CONFIG_POPUP = prefix + 'CLOSE_PRINT_CONFIG_POPUPP';

    public static readonly UNDO = prefix + 'UNDO';
    public static readonly REDO = prefix + 'REDO';

    public static closeCreateProjectPopup() {
        return {
            type: UiActions.CLOSE_CREATE_PROJECT_POPUP,
        }
    }

    public static openPrintConfigPopup() {
        return {
            type: UiActions.OPEN_PRINT_CONFIG_POPUP,
        }
    }

    public static closePrintConfigPopup() {
        return {
            type: UiActions.CLOSE_PRINT_CONFIG_POPUP,
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
