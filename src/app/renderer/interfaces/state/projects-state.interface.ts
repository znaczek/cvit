import {ProjectInterface} from './project.interface';

export interface ProjectStateInterface extends ProjectInterface {
    dirty: boolean,
}
