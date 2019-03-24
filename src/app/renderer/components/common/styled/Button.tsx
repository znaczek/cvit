import styled from 'styled-components';
import {ThemeInterface, Themes} from './themes';
import {STYLES} from '../../../styles/variables';
import {MIXINS} from '../../../styles/mixins';

interface Props {
    theme?: ThemeInterface,
    fontSize?: number,
}

export const Button = styled.button`
    outline: none;
    cursor: pointer;
    position: relative;
    text-transform: uppercase;
    color: ${(props: Props) => props.theme.fg || Themes.default.fg};
    background: ${(props: Props) => props.theme.bg || Themes.default.bg};
    border: none;
    font-size: ${(props: Props) => props.fontSize ? props.fontSize + 'px' : 'inherit'};
    line-height: 1;
    padding: 5px;
    box-shadow: ${STYLES.shadows.primary};
    &:active {
        bottom: -1px;
        right: -1px;
    }
    ${MIXINS.focusable}
`;
