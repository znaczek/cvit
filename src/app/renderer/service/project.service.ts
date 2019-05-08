import {CV_FILENAME, FOOTER_FILENAME, HEADER_FILENAME, STYLES_FILENAME} from '../../common/constants';
import {StorageService} from './storage.service';
import {HtmlService} from './html.service';
import {ProjectsStateInterface} from '../interfaces/state/projects-state.interface';

export class ProjectService {
    public static async getCv(directory: string): Promise<string> {
        const cvFile = await StorageService.getFile(directory + '/' + CV_FILENAME);
        return HtmlService.getBody(cvFile);
    }

    public static async getStyles(directory: string): Promise<string> {
        return await StorageService.getFile(directory + '/' + STYLES_FILENAME);
    }

    public static async getHeader(directory: string): Promise<string> {
        try {
            const headerFile = await StorageService.getFile(directory + '/' + HEADER_FILENAME);
            return HtmlService.getBody(headerFile);
        } catch(e) {
            console.error('Header not found');
            return '';
        }
    }

    public static async getFooter(directory: string): Promise<string> {
        try {
            const footerFile = await StorageService.getFile(directory + '/' + FOOTER_FILENAME);
            return HtmlService.getBody(footerFile);
        } catch(e) {
            console.error('Footer not found');
            return '';
        }
    }

    public static async save(directory: string, project: ProjectsStateInterface): Promise<void> {
        try {
            await StorageService.save(directory + '/' + CV_FILENAME, project.html);
            await StorageService.save(directory + '/' + STYLES_FILENAME, project.styles);
            await StorageService.save(directory + '/' + HEADER_FILENAME, project.header);
            await StorageService.save(directory + '/' + FOOTER_FILENAME, project.footer);
        } catch(e) {
            // TODO add some popup with information about failure saving
            console.error('Problem with saving');
        }
    }

}
