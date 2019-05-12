export interface OptionInterface<T = any> {
    label?: string;
    value?: T,
}

export class OptionModel<T> implements Required<OptionInterface> {
    public label: string;
    public value: T;

    constructor(options?: OptionInterface) {
        options = options || {};
        this.label = options.label || '';
        this.value = options.value || null;

    }
}
