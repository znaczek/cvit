import {Template} from '../models/template.model';
import {PATHS} from '../paths';
import {CV_FILE_NAME} from '../../common/constants';

const fs = require('sb-fs');

export class TemplateService {
    public static async getTemplates(): Promise<Template[]> {
        const templates: Template[] = [];
        const templateNames = await fs.readdir(PATHS.TEMPLATES);
        for (let i = 0; i < templateNames.length; i += 1) {
            const content = await fs.readFile(`${PATHS.TEMPLATES}/${templateNames[i]}/${CV_FILE_NAME}`);
            templates.push(new Template({
                name: templateNames[i],
                content: (content || []).reduce((curr: Buffer, acc: string) => acc + Buffer.from(curr).toString(), ''),
            }));
        }
        return templates;
    }
}