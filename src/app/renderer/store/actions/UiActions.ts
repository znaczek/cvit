const prefix = '[UI] ';

export class UiActions {
    public static readonly CLOSE_CREATE_PROJECT_POPUP = prefix + 'CLOSE_CREATE_PROJECT_POPUP';

    public static closeCreateProjectPopup() {
        return {
            type: UiActions.CLOSE_CREATE_PROJECT_POPUP,
        }
    }

}
