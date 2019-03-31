import {OpenProjectInterface} from './open-project.interface';

export interface CreateProjectInterface extends OpenProjectInterface {
    templatePath: string;
}
