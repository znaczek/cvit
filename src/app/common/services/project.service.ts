import {CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME, STYLES_FILENAME} from '../constants';
import {StorageService} from './storage.service';
import {HtmlUtils} from '../utils/html.utils';
import {ProjectStateInterface} from '../../renderer/interfaces/state/projects-state.interface';
import {ProjectDataInterface} from '../../renderer/interfaces/state/project-data.interface';
import {ProjectModel} from '../model/project.model';

export class ProjectService {

    public static unpack(directory: string): ProjectDataInterface {
        let html: string;
        let styles: string;
        let header: string;
        let footer: string;
        try {
            const htmlFile = StorageService.getFile(directory + '/' + CV_FILENAME);
            html = HtmlUtils.extractBody(htmlFile);
        } catch (e) {
            console.error('No html file found in ' + directory);
        }

        try {
            styles = StorageService.getFile(directory + '/' + STYLES_FILENAME);
        } catch (e) {
            console.error('No styles file found in ' + directory);
        }

        try {
            const headerFile = StorageService.getFile(directory + '/' + HEADER_FILENAME);
            header = HtmlUtils.extractBody(headerFile);
        } catch (e) {
            console.error('No header file found in ' + directory);
        }

        try {
            const footerFile = StorageService.getFile(directory + '/' + FOOTER_FILENAME);
            footer = HtmlUtils.extractBody(footerFile);
        } catch (e) {
            console.error('No styles file found in ' + directory);
        }

        return new ProjectModel({html, styles, header, footer});
    }

    public static save(directory: string, baseTemplate: string, project: ProjectStateInterface): void {
        try {
            StorageService.save(directory + '/' + CV_FILENAME, HtmlUtils.wrap(baseTemplate, project.html, 'cv'));
            StorageService.save(directory + '/' + STYLES_FILENAME, project.styles);
            StorageService.save(directory + '/' + HEADER_FILENAME, HtmlUtils.wrap(baseTemplate, project.header, 'header'));
            StorageService.save(directory + '/' + FOOTER_FILENAME, HtmlUtils.wrap(baseTemplate, project.footer, 'footer'));
        } catch(e) {
            console.error('Problem with saving');
        }
    }

}
