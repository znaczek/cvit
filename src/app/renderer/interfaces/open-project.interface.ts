import {ProjectInterface} from './state/project.interface';

export interface OpenProjectInterface extends ProjectInterface {
    directory: string;
}
