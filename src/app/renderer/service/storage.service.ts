import * as fs from 'fs';
import {Template} from '../models/template.model';
import {PATHS} from '../paths';
import {CreateProjectInterface} from '../interfaces/create-project.interface';
import {ncp} from 'ncp';
import {APP_EVENT, CV_FILE_NAME, ENCODING} from '../../common/constants';
import {ProjectService} from './project-service';
import {LocalStorage} from './local-storage.service';
import {ProjectsStateInterface} from '../interfaces/state/projects-state.interface';
import {ipcRenderer} from "electron";
import {AppEvents} from '../../common/events/app.events';

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

    public static async getInitialProjectState(): Promise<ProjectsStateInterface> {
        const lastDirectory = LocalStorage.get('lastDirectory');
        if (lastDirectory) {
            const content = await StorageService.getContent(lastDirectory + '/' + CV_FILE_NAME);
            const html = ProjectService.getHTML(content);
            const styles = ProjectService.getStyles(content);
            return {
                directory: lastDirectory,
                html,
                styles,
                header: '',
                footer: '',
            }
        } else {
            return null
        }
    }

    public static async getContent(path: string): Promise<string> {
        return pFs.readFile(path, ENCODING);
    }

    public static async save(path: string, content: string) {
        return pFs.writeFile(path, content);
    }

}
