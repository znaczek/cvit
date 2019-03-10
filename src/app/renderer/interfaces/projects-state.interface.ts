import {CvModelInterface} from '../models/cv.model';
import {ProjectMetaInterface} from '../models/project-meta.model';

export interface ProjectsStateInterface{
    meta: ProjectMetaInterface;
    list: CvModelInterface[];
}
