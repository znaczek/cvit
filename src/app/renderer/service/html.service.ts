import {JSDOM} from 'jsdom';

export class HtmlService {
    public static getBody(content: string): string {
        const dom = new JSDOM(content);
        return dom.window.document.body.innerHTML;
    }

    public static getFile(baseTempalte: string, html: string): string {
        const dom = new JSDOM(baseTempalte);
        const document = dom.window.document;
        document.body.innerHTML = html;
        return document.documentElement.outerHTML;
    }

}
