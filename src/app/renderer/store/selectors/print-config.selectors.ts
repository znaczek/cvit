import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {PrintConfigModel} from '../../../common/model/print-config.model';
import {PrintConfigStateInterface} from '../../interfaces/state/print-config-state.interface';

export class PrintConfigSelectors {
    private static getPrintConfigState = (state: ApplicationStateInterface): PrintConfigStateInterface => state.printConfig;

    public static getConfig = createSelector(
        PrintConfigSelectors.getPrintConfigState,
        (state: PrintConfigStateInterface): PrintConfigModel => new PrintConfigModel(state),
    );

}
