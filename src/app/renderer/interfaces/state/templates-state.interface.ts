import {Template} from '../../models/template.model';

export interface TemplatesStateInterface {
    list: Template[];
    base: string;
}
