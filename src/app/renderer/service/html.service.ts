import {JSDOM} from 'jsdom';

export class HtmlService {
    public static extractBody(content: string): string {
        const dom = new JSDOM(content);
        return dom.window.document.body.innerHTML;
    }

    public static wrap(baseTempalte: string, html: string): string {
        const dom = new JSDOM(baseTempalte);
        const document = dom.window.document;
        document.body.innerHTML = html;
        return document.documentElement.outerHTML;
    }

}
