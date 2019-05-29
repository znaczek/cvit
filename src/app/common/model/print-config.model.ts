import {PrintConfigStateInterface} from '../../renderer/interfaces/state/print-config-state.interface';

export class PrintConfigModel implements Required<PrintConfigStateInterface> {
    public hasHeader: boolean;
    public hasFooter: boolean;
    public marginTop: number;
    public marginBottom: number;
    public marginLeft: number;
    public marginRight: number;

    constructor(options?: Partial<PrintConfigStateInterface>) {
        options = options || {};
        this.hasHeader = options.hasHeader === true;
        this.hasFooter = options.hasFooter !== false;
        this.marginTop = options.marginTop ? parseFloat(options.marginTop.toString()) : 0;
        this.marginBottom = options.marginBottom ? parseFloat(options.marginBottom.toString()) : 0;
        this.marginLeft = options.marginLeft ? parseFloat(options.marginLeft.toString()) : 0;
        this.marginRight = options.marginRight ? parseFloat(options.marginRight.toString()) : 0;
    }
}
