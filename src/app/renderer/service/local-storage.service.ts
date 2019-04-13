import * as electron from "electron";
import * as path from 'path';
import * as fs from 'fs';
import {ENCODING} from '../../common/constants';
import {LocalStorageStateInterface} from '../interfaces/local-storage-state.interface';

const USER_DATA_PATH = (electron.app || electron.remote.app).getPath('userData');
const CONFIG_FILE = 'user-config.json';

export class LocalStorage {
    public path: string;

    private static data: LocalStorageStateInterface = null;
    private static path = path.join(USER_DATA_PATH, CONFIG_FILE);

    public static get(key: keyof LocalStorageStateInterface): LocalStorageStateInterface[keyof LocalStorageStateInterface] {
        if (!LocalStorage.data) {
            LocalStorage.data = LocalStorage.fetchData();
        }

        return LocalStorage.data[key];
    }

    public static set(key: keyof LocalStorageStateInterface, val: LocalStorageStateInterface[keyof LocalStorageStateInterface]) {
        if (!LocalStorage.data) {
            LocalStorage.data = {};
        }
        LocalStorage.data[key] = val;
        try {
            fs.writeFileSync(LocalStorage.path, JSON.stringify(LocalStorage.data));
        } catch (e) {
            console.error(`Can't save tmp file: ${LocalStorage.path}. Reason: ${e}` );
        }
    }

    private static fetchData(): LocalStorageStateInterface {
        try {
            return JSON.parse(fs.readFileSync(LocalStorage.path, ENCODING));
        } catch(e) {
            console.warn(`Couldn't featch user data: ${LocalStorage.path}. Reason: ${e}`);
            return {};
        }
    }
}

