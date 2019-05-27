import {ProjectDataInterface} from './project-data.interface';

export interface ProjectInterface extends ProjectDataInterface {
    directory: string;
}
