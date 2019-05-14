import {
    CV_FILENAME,
    FOOTER_FILENAME,
    HEADER_FILENAME,
    SETTINGS_FILENAME,
    STYLES_FILENAME
} from '../../common/constants';
import {StorageService} from './storage.service';
import {HtmlService} from './html.service';
import {ProjectStateInterface} from '../interfaces/state/projects-state.interface';
import {ProjectInterface} from '../interfaces/state/project.interface';
import {PrintConfigStateInterface} from '../interfaces/state/print-config-state.interface';
import {ProjectModel} from '../models/project.model';
import {PrintConfigModel} from '../models/print-config.model';

export class ProjectService {

    public static unpack(directory: string): ProjectInterface {
        let html: string;
        let styles: string;
        let header: string;
        let footer: string;
        try {
            const htmlFile = StorageService.getFile(directory + '/' + CV_FILENAME);
            html = HtmlService.extractBody(htmlFile);
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
            header = HtmlService.extractBody(headerFile);
        } catch (e) {
            console.warn('No styles file found in' + directory);
        }

        try {
            const footerFile = StorageService.getFile(directory + '/' + FOOTER_FILENAME);
            footer = HtmlService.extractBody(footerFile);
        } catch (e) {
            console.warn('No styles file found in' + directory);
        }

        return new ProjectModel({html, styles, header, footer});
    }

    public static getPrintConfig(directory: string): PrintConfigStateInterface {
        try {
            return JSON.parse(StorageService.getFile(directory + '/' + SETTINGS_FILENAME));
        } catch (e) {
            console.warn('No settings file found in' + directory);
        }
    }

    public static savePrintConfig(directory: string, config: PrintConfigModel): void {
        StorageService.save(directory + '/' + SETTINGS_FILENAME, JSON.stringify(config));
    }

    public static save(directory: string, baseTemplate: string, project: ProjectStateInterface): void {
        try {
            StorageService.save(directory + '/' + CV_FILENAME, HtmlService.wrap(baseTemplate, project.html, 'cv'));
            StorageService.save(directory + '/' + STYLES_FILENAME, project.styles);
            StorageService.save(directory + '/' + HEADER_FILENAME, HtmlService.wrap(baseTemplate, project.header, 'header'));
            StorageService.save(directory + '/' + FOOTER_FILENAME, HtmlService.wrap(baseTemplate, project.footer, 'footer'));
        } catch(e) {
            console.warn('Problem with saving');
        }
    }

}
