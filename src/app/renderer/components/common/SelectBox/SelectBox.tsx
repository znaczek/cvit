import * as React from 'react';
import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';
import {SelectBoxItem} from './SelectBoxItem';
import {OptionModel} from '../../../../common/model/options-model';
import {MIXINS} from '../../../styles/mixins';

const Col = styled.ul`
    background: #fff;
    box-shadow: ${STYLES.shadows.basic};
    padding: ${STYLES.gutter / 4}px
    ${MIXINS.focusable}
`;

interface Props<T> {
    options: OptionModel<T>[];
    handleOnSelect: (value: T) => void;
    selected: T;
    dataKey?: string;
}

export class SelectBox<T extends {[index: string]: any}> extends React.Component {
    public props: Props<T>;

    public render() {
        const {options, dataKey, selected, handleOnSelect} = this.props;

        const comparator = dataKey ?
            (item: T, selected: T) => item[dataKey] === selected[dataKey] :
            (item: T, selected: T) => item === selected;

        return (
            <Col tabIndex={0}>
                {options.map((option, index) =>
                    <SelectBoxItem
                        key={index}
                        name={option.label}
                        selected={comparator(option.value, selected)}
                        handleClick={() => handleOnSelect(option.value)}
                    />)
                }
            </Col>
        );
    }
}
