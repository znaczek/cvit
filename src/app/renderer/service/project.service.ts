import {
    CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME, SETTINGS_FILENAME,
    STYLES_FILENAME
} from '../../common/constants';
import {StorageService} from './storage.service';
import {HtmlService} from './html.service';
import {ProjectStateInterface} from '../interfaces/state/projects-state.interface';
import {LocalStorage} from './local-storage.service';
import {ProjectInterface} from '../interfaces/state/project.interface';
import {PrintConfigStateInterface} from '../interfaces/state/print-config-state.interface';
import {ProjectModel} from '../models/project.model';
import {PrintConfigModel} from '../models/print-config.model';

export class ProjectService {

    public static getProject(directory: string): ProjectInterface {
        let html: string;
        let styles: string;
        let header: string;
        let footer: string;
        try {
            const htmlFile = StorageService.getFile(directory + '/' + CV_FILENAME);
            html = HtmlService.getBody(htmlFile);
        } catch (e) {
            console.warn('No html file found in' + directory);
        }

        try {
            styles = StorageService.getFile(directory + '/' + STYLES_FILENAME);
        } catch (e) {
            console.warn('No styles file found in' + directory);
        }

        try {
            const headerFile = StorageService.getFile(directory + '/' + HEADER_FILENAME);
            header = HtmlService.getBody(headerFile);
        } catch (e) {
            console.warn('No styles file found in' + directory);
        }

        try {
            const footerFile = StorageService.getFile(directory + '/' + FOOTER_FILENAME);
            footer = HtmlService.getBody(footerFile);
        } catch (e) {
            console.warn('No styles file found in' + directory);
        }

        return new ProjectModel({html, styles, header, footer});
    }

    public static getPrintConfig(directory: string): PrintConfigStateInterface {
        return JSON.parse(StorageService.getFile(directory + '/' + SETTINGS_FILENAME));
    }

    public static savePrintConfig(directory: string, config: PrintConfigModel): void {
        StorageService.save(directory + '/' + SETTINGS_FILENAME, JSON.stringify(config));
    }

    public static save(directory: string, project: ProjectStateInterface): void {
        try {
            StorageService.save(directory + '/' + CV_FILENAME, project.html);
            StorageService.save(directory + '/' + STYLES_FILENAME, project.styles);
            StorageService.save(directory + '/' + HEADER_FILENAME, project.header);
            StorageService.save(directory + '/' + FOOTER_FILENAME, project.footer);
        } catch(e) {
            // TODO add some popup with information about failure saving
            console.warn('Problem with saving');
        }
    }

}
