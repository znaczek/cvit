import * as React from 'react';
import {Group, Label} from '../styled/Form';
import {OptionInterface} from '../../../../common/model/options-model';


interface Props<T> {
    label: string;
    name: string;
    options: OptionInterface<T>[];
    value: T,
    onChange: (arg: any) => any
}
export const RadioGroup = <T extends any>(props: Props<T>) => {
    const {label, name, options, value, onChange} = props;

    return (
        <Group>
            <Label>{label}</Label>
            {(options || []).map((option, index) => (
                <React.Fragment key={index}>
                    <input
                        type='radio'
                        name={name}
                        value={option.value.toString()}
                        checked={option.value === value}
                        onChange={onChange}
                    />
                    <span>{option.label}</span>
                </React.Fragment>
            ))}
        </Group>
    );
};
