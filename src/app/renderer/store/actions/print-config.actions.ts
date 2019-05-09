import {ActionInterface} from '../../../common/interfaces/action.interface';

const prefix = '[PRINT_CONFIG] ';

export class PrintConfigActions {
    public static readonly SET_HAS_HEADER = prefix + 'SET_HAS_HEADER';
    public static readonly SET_HAS_FOOTER = prefix + 'SET_HAS_FOOTER';
    public static readonly SET_MARGIN_TOP = prefix + 'SET_MARGIN_TOP';
    public static readonly SET_MARGIN_BOTTOM = prefix + 'SET_MARGIN_BOTTOM';
    public static readonly SET_MARGIN_LEFT = prefix + 'SET_MARGIN_LEFT';
    public static readonly SET_MARGIN_RIGHT = prefix + 'SET_MARGIN_RIGHT';


    public static setHasHeader(hasHeader: boolean): ActionInterface<boolean> {
        return {
            type: PrintConfigActions.SET_HAS_HEADER,
            payload: hasHeader,
        }
    }

    public static setHasFooter(hasFooter: boolean): ActionInterface<boolean> {
        return {
            type: PrintConfigActions.SET_HAS_FOOTER,
            payload: hasFooter,
        }
    }

    public static setMarginTop(marginTop: number): ActionInterface<number> {
        return {
            type: PrintConfigActions.SET_MARGIN_TOP,
            payload: marginTop,
        }
    }

    public static setMarginBottom(marginBottom: number): ActionInterface<number> {
        return {
            type: PrintConfigActions.SET_MARGIN_BOTTOM,
            payload: marginBottom,
        }
    }

    public static setMarginLeft(marginLeft: number): ActionInterface<number> {
        return {
            type: PrintConfigActions.SET_MARGIN_LEFT,
            payload: marginLeft,
        }
    }

    public static setMarginRight(marginRight: number): ActionInterface<number> {
        return {
            type: PrintConfigActions.SET_MARGIN_RIGHT,
            payload: marginRight,
        }
    }

}
