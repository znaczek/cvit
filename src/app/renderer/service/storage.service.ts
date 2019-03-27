import * as fs from 'fs';
import {Template} from '../models/template.model';
import {PATHS} from '../paths';
import {CreateProjectInterface} from '../interfaces/create-project.interface';
import {ncp} from 'ncp';

const pFs = require('sb-fs');

export class StorageService {
    public static exists(path: string) {
        return fs.existsSync(path);
    }

    public static async getTemplates(): Promise<Template[]> {
        const templates: Template[] = [];
        const templateNames = await pFs.readdir(PATHS.TEMPLATES);
        for (let i = 0; i < templateNames.length; i += 1) {
            templates.push(new Template({
                name: templateNames[i],
                path: PATHS.TEMPLATES + '/' + templateNames[i],
            }));
        }
        return templates;
    }

    public static createProject(options: CreateProjectInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            ncp(options.templatePath, options.destination, function (e: Error) {
                if (e) {
                    reject(e);
                }
                resolve();
            });
        });

    }
}
