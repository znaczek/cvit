import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {createSelector} from 'reselect';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';
import {OptionModel} from '../../../common/model/options-model';
import {TemplateInterface} from '../../../common/interfaces/template.interface';

export class TemplatesSelectors {
    public static getTemplatesState = (state: ApplicationStateInterface): TemplatesStateInterface => state.templates;

    public static getList = createSelector(
        TemplatesSelectors.getTemplatesState,
        (state: TemplatesStateInterface): OptionModel<TemplateInterface>[] => (state.list || []).map((item) => new OptionModel({
            label: item.name,
            value: item,
        })),
    );

    public static getBaseTemplate = createSelector(
        TemplatesSelectors.getTemplatesState,
        (state: TemplatesStateInterface): string => state.base,
    );

}
