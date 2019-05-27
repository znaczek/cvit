import styled from 'styled-components';
import {ThemeInterface, Themes} from '../../themes';
import {STYLES} from '../../../styles/variables';
import {MIXINS} from '../../../styles/mixins';

interface Props {
    theme?: ThemeInterface,
    fontSize?: number,
    stretched?: boolean,
    disabled?: boolean,
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
    padding: ${STYLES.gutter/4}px ${STYLES.gutter}px;
    opacity: ${(props: Props) => props.disabled ? 0.5 : 1}
    width: ${(props: Props) => props.stretched ? '100%' : 'auto'}
    box-shadow: ${STYLES.shadows.primary};
    &:active {
        bottom: -1px;
        right: -1px;
    }
    ${MIXINS.focusable}
    
    & + & {
        margin-left: ${STYLES.gutter/2}px
    }
`;
