import {JSDOM} from 'jsdom';

export class ProjectService {
    public static getHTML(content: string): string {
        const dom = new JSDOM(content);
        return dom.window.document.body.innerHTML;
    }

    public static getStyles(content: string): string {
        const dom = new JSDOM(content);
        const styles = Array.prototype.slice.call(dom.window.document.head.getElementsByTagName('style'));
        return styles.reduce((acc: string, curr: HTMLStyleElement) => acc + curr.innerHTML, '');
    }

    public static getProject(baseTempalte: string, html: string, styles: string): string {
        const dom = new JSDOM(baseTempalte);
        const document = dom.window.document;
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);
        document.body.innerHTML = html;
        return document.documentElement.outerHTML;
    }

}
