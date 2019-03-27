export interface TemplateInterface {
    name: string;
    path: string;
}

export class Template implements TemplateInterface {
    public path: string;
    public name: string;

    constructor(options: TemplateInterface) {
        this.name = options.name || '';
        this.path = options.path || '';
    }
}
