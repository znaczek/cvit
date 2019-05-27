import {ProjectDataInterface} from './state/project-data.interface';

export interface OpenProjectInterface extends ProjectDataInterface {
    directory: string;
}
