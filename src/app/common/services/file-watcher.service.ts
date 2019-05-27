import * as fs from 'fs';
import {FSWatcher} from 'fs';
import * as md5 from 'md5';

type CallbackType = (eventType: EventType, filename: string) => void;
export type EventType = 'rename' | 'change';

export class FileWatcherService {
    private filename: string;
    private callback: CallbackType;

    private fsWatcher: FSWatcher;
    private md5Previous: string = null;
    private debounce: number = null;

    constructor(inputFilename: string, callback: CallbackType, logChanges: boolean = false) {
        this.filename = inputFilename;
        this.callback = callback;
        try {
            this.fsWatcher = fs.watch(this.filename, (eventType: EventType, filename: string) => {
                if (filename) {
                    clearTimeout(this.debounce);
                    this.debounce = setTimeout(() => {
                        fs.readFile(this.filename, (e, buf) => {
                            if (e) {
                                throw e;
                            }
                            const md5Current = md5(buf);
                            if (md5Current === this.md5Previous) {
                                return;
                            }
                            this.md5Previous = md5Current;
                            if (logChanges) {
                                console.log(`${filename} file Changed`);
                            }
                            if (typeof callback === 'function') {
                                callback(eventType, filename);
                            }
                        });
                    }, 100);
                }
            });
        } catch (e) {
            console.error(`Couldnt't set watched on file "${inputFilename}"`, e);
        }

    }

    public close(): void {
        if (this.fsWatcher) {
            this.fsWatcher.close();
            this.fsWatcher = null;
        }
    }
}
