export interface TemplateInterface {
    name?: string;
    content?: string;
}

export class Template implements TemplateInterface {
    public name: string;
    public content: string;

    constructor(options: TemplateInterface = {}) {
        this.name = options.name || '';
        this.content = options.content || null;
    }
}
