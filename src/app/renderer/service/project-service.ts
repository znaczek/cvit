import {JSDOM} from 'jsdom';

export class ProjectService {
    public static getHTML(content: string) {
        const dom = new JSDOM(content);
        return dom.window.document.body.innerHTML;
    }

    public static getStyles(content: string) {
        const dom = new JSDOM(content);
        const styles = dom.window.document.head.getElementsByTagName('style');
        return styles[0].innerHTML;
    }

}
