import {PrintConfigModel} from '../models/print-config.model';
import {PrintConfigStateInterface} from '../interfaces/state/print-config-state.interface';
import {SETTINGS_FILENAME} from '../../common/constants';
import {StorageService} from './storage.service';

export class PrintConfigService {

    public static getPrintConfig(directory: string): PrintConfigStateInterface {
        try {
            return JSON.parse(StorageService.getFile(directory + '/' + SETTINGS_FILENAME));
        } catch (e) {
            console.error('No settings file found in ' + directory);
            return new PrintConfigModel();
        }
    }

    public static savePrintConfig(directory: string, config: PrintConfigModel): void {
        StorageService.save(directory + '/' + SETTINGS_FILENAME, JSON.stringify(config));
    }
}
