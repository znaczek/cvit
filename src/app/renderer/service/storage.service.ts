import * as fs from 'fs';

export class StorageService {
    public static exists(path: string) {
        return fs.existsSync(path);
    }
}
