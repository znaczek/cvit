export interface RenderConfigInterface {
    output: string;
    dpi: number;
    'margin-top': number;
    'margin-bottom': number;
    'margin-left': number;
    'margin-right': number;
    'disable-smart-shrinking'?: boolean;
    'footer-html'?: string;
    'header-html'?: string;
    debug?: any;
}
