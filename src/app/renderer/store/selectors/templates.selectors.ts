import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {Template} from '../../models/template.model';
import {createSelector} from 'reselect';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';
import {OptionModel} from '../../../common/model/options-model';

export class TemplatesSelectors {
    public static getTemplatesState = (state: ApplicationStateInterface): TemplatesStateInterface => state.templates;

    public static getList = createSelector(
        TemplatesSelectors.getTemplatesState,
        (state: TemplatesStateInterface): OptionModel<Template>[] => (state.list || []).map((item) => new OptionModel({
            label: item.name,
            value: item,
        })),
    );

}
