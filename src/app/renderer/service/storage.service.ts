import * as fs from 'fs';
import {Template} from '../models/template.model';
import {PATHS} from '../paths';
import {CreateProjectInterface} from '../interfaces/create-project.interface';
import {ncp} from 'ncp';
import {OpenProjectInterface} from '../interfaces/open-project.interface';
import {CV_FILE_NAME, ENCODING} from '../../common/constants';

const pFs = require('sb-fs');

export class StorageService {
    public static exists(path: string) {
        return fs.existsSync(path);
    }

    public static async getTemplates(): Promise<Template[]> {
        const templates: Template[] = [];
        const templateNames = await pFs.readdir(PATHS.TEMPLATES);
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

    public static async getBaseTemplate(): Promise<string> {
        return pFs.readFile(PATHS.BASIC_TEMPLATE, ENCODING);
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

    public static async getContent(file: string): Promise<string> {
        return pFs.readFile(file + '/' + CV_FILE_NAME, ENCODING);
    }

}
