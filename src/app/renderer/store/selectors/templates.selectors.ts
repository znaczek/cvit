import {ApplicationStateInterface} from '../../../common/interfaces/application-state.interface';
import {Template} from '../../models/template.model';
import {createSelector} from 'reselect';
import {TemplatesStateInterface} from '../../interfaces/state/templates-state.interface';

export class TemplatesSelectors {
    private static getTemplatesState = (state: ApplicationStateInterface): TemplatesStateInterface => state.templates;

    public static getList = createSelector(
        TemplatesSelectors.getTemplatesState,
        (state: TemplatesStateInterface): Template[] => (state.list || []).map((item) => new Template(item)),
    );

}