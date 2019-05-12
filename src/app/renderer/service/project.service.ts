import {
    CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME, SETTINGS_FILENAME,
    STYLES_FILENAME
} from '../../common/constants';
import {StorageService} from './storage.service';
import {HtmlService} from './html.service';
import {ProjectsStateInterface} from '../interfaces/state/projects-state.interface';
import {LocalStorage} from './local-storage.service';
import {ProjectInterface} from '../interfaces/state/project.interface';
import {PrintConfigStateInterface} from '../interfaces/state/print-config-state.interface';

export class ProjectService {

    public static getInitialProjectState(): ProjectsStateInterface {
        const lastDirectory = LocalStorage.get('lastDirectory');
        if (lastDirectory) {
            const project = ProjectService.getProject(lastDirectory);
            if (project) {
                const {html, styles, header, footer} = project;
                return {
                    directory: lastDirectory,
                    html,
                    styles,
                    header,
                    footer,
                }
            }
            return null;
        } else {
            return null
        }
    }

    public static getProject(directory: string): ProjectInterface {
        const htmlFile = StorageService.getFile(directory + '/' + CV_FILENAME);
        const html = HtmlService.getBody(htmlFile);
        const styles = StorageService.getFile(directory + '/' + STYLES_FILENAME);
        const headerFile = StorageService.getFile(directory + '/' + HEADER_FILENAME);
        const header = HtmlService.getBody(headerFile);
        const footerFile = StorageService.getFile(directory + '/' + FOOTER_FILENAME);
        const footer = HtmlService.getBody(footerFile);

        return {html, styles, header, footer}
    }

    public static getSettings(directory: string): PrintConfigStateInterface {
        return JSON.parse(StorageService.getFile(directory + '/' + SETTINGS_FILENAME));
    }

    public static save(directory: string, project: ProjectsStateInterface): void {
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
