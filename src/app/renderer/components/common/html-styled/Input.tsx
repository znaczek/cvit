import styled from 'styled-components';
import {STYLES} from '../../../styles/variables';

interface Props {
    readOnly?: boolean,
}

export const Input = styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 3px 5px;
    font-size: 16px;
    line-height: 1;
    box-shadow: ${STYLES.shadows.basic};
    background: ${(props: Props) => props.readOnly ? STYLES.colors.gray1 : STYLES.colors.white}
`;
