import {remote} from 'electron';
import {CV_FILENAME, ENCODING, FOOTER_FILENAME, OUTPUT_FILE, STYLES_FILENAME} from '../constants';
import * as fs from 'fs';
import {RenderConfigInterface} from '../interfaces/render-config.interface';
import {PrintConfigModel} from '../model/print-config.model';
import {TextDecoder} from 'util';

const wkhtmltopdf = require('wkhtmltopdf');

export class PdfRenderer {
    private static DECODER = new TextDecoder(ENCODING);

    public static render(directory: string,
                         printConfig: PrintConfigModel): Promise<any> {

        const cvFile = directory + '/' + CV_FILENAME;
        const stylesFile = directory + '/' + STYLES_FILENAME;
        const headerFile = directory + '/' + FOOTER_FILENAME;
        const footerFile = directory + '/' + FOOTER_FILENAME;

        const errors: string[] = [];

        if (!fs.existsSync(cvFile)) {
            errors.push(`CV file "${cvFile}" is missing.`);
        }

        if (!fs.existsSync(stylesFile)) {
            errors.push(`Styles file "${cvFile}" is missing.`);
        }

        if (printConfig.hasFooter && !fs.existsSync(footerFile)) {
            errors.push(`Footer file "${cvFile}" is missing.`);
        }

        if (printConfig.hasHeader && !fs.existsSync(headerFile)) {
            errors.push(`Header file "${cvFile}" is missing.`);
        }

        if (errors.length) {
            remote.dialog.showErrorBox('Compilation errors', errors.join('\n\r'));
            return;
        }

        let messageLog: string = '';
        const config: RenderConfigInterface = {
            output: directory + '/' + OUTPUT_FILE,
            dpi: 96,
            'disable-smart-shrinking': true,
            'margin-top': printConfig.marginTop,
            'margin-bottom': printConfig.marginBottom,
            'margin-left': printConfig.marginLeft,
            'margin-right': printConfig.marginRight,
            debug: (data: Uint8Array) => {
                messageLog += PdfRenderer.DECODER.decode(data).replace(/[\n\r]/, '').trim();
            },
        };

        if (printConfig.hasFooter) {
            config['footer-html'] = PdfRenderer.getFileWithProtocol(footerFile);
        }
        if (printConfig.hasHeader) {
            config['header-html'] = PdfRenderer.getFileWithProtocol(headerFile);
        }

        return new Promise((resolve, reject) => {
            wkhtmltopdf(PdfRenderer.getFileWithProtocol(cvFile), config, (error: any) => {
                if (error) {
                    reject((messageLog.match(/error.*/gi) || [])[0]);
                } else {
                    resolve();
                }
            });
        });
    }

    private static getFileWithProtocol(file: string) {
        return 'file:///' + file;
    }

}
