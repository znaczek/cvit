import {exec} from 'child_process';

export class OsUtils {
    public static openFile(file: string): void {
        exec(OsUtils.getOpenCommandLine() + ' ' + file);
    }

    private static getOpenCommandLine(): string {
        switch (process.platform) {
            case 'darwin' : return 'open';
            case 'win32' : return 'start';
            default : return 'xdg-open';
        }
    }
}
