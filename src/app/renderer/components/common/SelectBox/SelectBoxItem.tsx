import * as React from 'react';
import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';

interface Props {
    name: string,
    selected?: boolean,
    handleClick?: () => void,
}

interface ItemProps {
    selected: boolean;
}
const Item = styled.li`
    background: ${(props: ItemProps) => props.selected ? STYLES.colors.gray1: 'none'};
    padding: 3px;
    cursor: pointer;
    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

export const SelectBoxItem: React.StatelessComponent<Props> = (props: Props) => {
    const {handleClick, selected, name} = props;
    const handleOnClick = () => handleClick();

    return <Item selected={selected} onClick={handleOnClick}>{name}</Item>;
};
