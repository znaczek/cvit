import * as fs from 'fs-extra';
import {Template} from '../models/template.model';
import {PATHS} from '../paths';
import {CreateProjectInterface} from '../interfaces/create-project.interface';
import {ENCODING} from '../../common/constants';

export class StorageService {
    public static exists(path: string) {
        return fs.existsSync(path);
    }

    public static getTemplates(): Template[] {
        const templates: Template[] = [];
        const templateNames = fs.readdirSync(PATHS.TEMPLATES);
        for (let i = 0; i < templateNames.length; i += 1) {
            const path = PATHS.TEMPLATES + '/' + templateNames[i];
            if(fs.lstatSync(path).isDirectory()) {
                templates.push(new Template({
                    name: templateNames[i],
                    path,
                }));
            }
        }
        return templates;
    }

    public static getBaseTemplate(): string {
        return fs.readFileSync(PATHS.BASIC_TEMPLATE, ENCODING);
    }

    public static createProject(options: CreateProjectInterface): void {
        return fs.copySync(options.templatePath, options.directory);
    }

    public static getFile(path: string): string {
        return fs.readFileSync(path, ENCODING);
    }

    public static save(path: string, content: string): void {
        fs.writeFileSync(path, content);
    }

}
