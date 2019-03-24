import styled from 'styled-components';
import {ThemeInterface, Themes} from './themes';
import {STYLES} from '../../../styles/variables';

interface Props {
    readOnly: boolean,
}

export const Input = styled.input`
    border: none;
    outline: none;
    padding: 3px;
    box-shadow: ${STYLES.shadows.basic};
    background: ${(props: Props) => props.readOnly ? STYLES.colors.gray1 : STYLES.colors.white}
`;
