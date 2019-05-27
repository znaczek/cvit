import {JSDOM} from 'jsdom';

export class HtmlUtils {
    public static extractBody(content: string): string {
        const dom = new JSDOM(content);
        return dom.window.document.body.innerHTML;
    }

    public static wrap(baseTemplate: string, html: string, bodyClass: string): string {
        const dom = new JSDOM(baseTemplate);
        const document = dom.window.document;
        document.body.innerHTML = html;
        document.body.className = bodyClass;
        return dom.serialize();
    }

}
